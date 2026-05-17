const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const http = require("http");

// Create HTTP Server for Socket.io
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Next.js is running on 3001
    methods: ["GET", "POST"]
  }
});

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const pubClient = createClient({ url: REDIS_URL });
const subClient = pubClient.duplicate();

const PORT = 3002;

// In-memory state as a fallback or fast cache
// We will store room data here for fast access. 
// For a fully scalable multi-node setup, we'd use Redis JSON or Hashes.
const rooms = new Map();

// Helper to generate room ID
const generateRoomId = () => Math.random().toString(36).substring(2, 8).toUpperCase();

async function startServer() {
  try {
    await pubClient.connect();
    await subClient.connect();
    io.adapter(createAdapter(pubClient, subClient));
    console.log("✅ Redis Adapter Connected");
  } catch (err) {
    console.warn("⚠️ Redis connection failed. Falling back to in-memory adapter.", err.message);
  }

  io.on("connection", (socket) => {
    console.log(`🟢 Player connected: ${socket.id}`);

    // EVENT: create_room
    socket.on("create_room", (data, callback) => {
      try {
        const roomId = generateRoomId();
        const room = {
          id: roomId,
          name: data.name,
          topic: data.topic,
          difficulty: data.difficulty,
          timeLimit: data.timeLimit,
          isPrivate: data.isPrivate,
          maxPlayers: data.maxPlayers,
          problemId: data.problemId,
          status: "WAITING",
          players: []
        };
        rooms.set(roomId, room);
        
        socket.join(roomId);
        // Automatically join the creator as a player
        // Wait, the client will fire join_room immediately after receiving the roomId, 
        // or we can handle it here if they pass username. Let's just return roomId.
        if (typeof callback === "function") callback({ success: true, roomId, room });
      } catch (err) {
        if (typeof callback === "function") callback({ success: false, error: err.message });
      }
    });

    // EVENT: join_room
    socket.on("join_room", (data, callback) => {
      const { roomId, username, rank } = data;
      const room = rooms.get(roomId);

      if (!room) {
        if (typeof callback === "function") callback({ success: false, error: "Room not found" });
        return;
      }

      if (room.status !== "WAITING") {
        if (typeof callback === "function") callback({ success: false, error: "Battle already in progress or finished" });
        return;
      }

      if (room.players.length >= room.maxPlayers) {
        if (typeof callback === "function") callback({ success: false, error: "Room is full" });
        return;
      }

      // Add player
      const player = {
        id: socket.id,
        username,
        rank,
        status: "JOINED",
        score: 0,
        progress: 0
      };

      room.players.push(player);
      socket.join(roomId);

      // Notify others
      socket.to(roomId).emit("player_joined", player);
      io.to(roomId).emit("room_updated", room);

      if (typeof callback === "function") callback({ success: true, room });
    });

    // EVENT: ready
    socket.on("ready", (data) => {
      const { roomId } = data;
      const room = rooms.get(roomId);
      if (!room) return;

      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        player.status = "READY";
        io.to(roomId).emit("room_updated", room);

        // Check if all players are ready
        const allReady = room.players.length > 1 && room.players.every(p => p.status === "READY");
        if (allReady && room.status === "WAITING") {
          startBattle(roomId, room);
        }
      }
    });

    // EVENT: submit_code
    socket.on("submit_code", (data) => {
      const { roomId, code, testResults } = data;
      const room = rooms.get(roomId);
      if (!room) return;

      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        player.status = "SUBMITTED";
        player.progress = 100;
        
        // Calculate score based on time remaining and test passes
        const timeSpent = Date.now() - room.startedAt;
        const timeBonus = Math.max(0, room.timeLimit * 60000 - timeSpent);
        player.score = 1000 + Math.floor(timeBonus / 1000); // Simple scoring

        io.to(roomId).emit("player_submitted", { playerId: socket.id, score: player.score });
        io.to(roomId).emit("room_updated", room);

        // Check if all submitted
        const allSubmitted = room.players.every(p => p.status === "SUBMITTED");
        if (allSubmitted) {
          endBattle(roomId, room);
        }
      }
    });

    // EVENT: disconnect
    socket.on("disconnect", () => {
    console.log(`🔴 Player disconnected: ${socket.id}`);
      // Find which room they were in
      for (const [roomId, room] of rooms.entries()) {
        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== -1) {
          room.players.splice(playerIndex, 1);
          socket.to(roomId).emit("player_left", socket.id);
          io.to(roomId).emit("room_updated", room);

          if (room.players.length === 0) {
            rooms.delete(roomId);
          } else if (room.status === "IN_PROGRESS" && room.players.length === 1) {
            // Only one player left, they win by default or we just end it
            endBattle(roomId, room);
          }
          break;
        }
      }
    });
  });

  function startBattle(roomId, room) {
    room.status = "COUNTDOWN";
    io.to(roomId).emit("room_updated", room);
    io.to(roomId).emit("countdown_started");

    // 5 second countdown
    let count = 5;
    const interval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        room.status = "IN_PROGRESS";
        room.startedAt = Date.now();
        room.players.forEach(p => p.status = "PLAYING");
        io.to(roomId).emit("room_updated", room);
        io.to(roomId).emit("battle_started", room.problemId);

        // Auto-end battle when time limit expires
        setTimeout(() => {
          const currentRoom = rooms.get(roomId);
          if (currentRoom && currentRoom.status === "IN_PROGRESS") {
            endBattle(roomId, currentRoom);
          }
        }, room.timeLimit * 60000);
      }
    }, 1000);
  }

  function endBattle(roomId, room) {
    room.status = "FINISHED";
    // Sort players by score descending
    const rankings = [...room.players].sort((a, b) => b.score - a.score);
    const winnerId = rankings.length > 0 ? rankings[0].id : null;
    room.winnerId = winnerId;

    io.to(roomId).emit("room_updated", room);
    io.to(roomId).emit("battle_ended", { winnerId, rankings });
  }

  httpServer.listen(PORT, () => {
    console.log(`⚡ Battle Socket Server running on port ${PORT}`);
  });
}

startServer();
