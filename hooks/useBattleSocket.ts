import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useBattleStore } from '../store/battleStore';
import { ServerToClientEvents, ClientToServerEvents } from '../types/battle';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3002';

export const useBattleSocket = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const setSocketConnected = useBattleStore(state => state.setSocketConnected);
  const setRoom = useBattleStore(state => state.setRoom);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('✅ Connected to Battle Socket Server');
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('🔴 Disconnected from Battle Socket Server');
    });

    socket.on('room_updated', (updatedRoom) => {
      setRoom(updatedRoom);
    });

    socket.on('player_joined', (player) => {
      // room_updated usually handles this, but we can add toast notifications here
      console.log(`👤 ${player.username} joined the battle!`);
    });

    socket.on('player_left', (playerId) => {
      console.log(`👤 Player ${playerId} left the battle.`);
    });

    socket.on('countdown_started', () => {
      console.log('⏰ Countdown started!');
    });

    socket.on('battle_started', (problemId) => {
      console.log(`⚔️ Battle started! Problem: ${problemId}`);
    });

    socket.on('battle_ended', ({ winnerId }) => {
      console.log(`🏆 Battle Ended! Winner: ${winnerId}`);
    });

    socket.on('error', (message) => {
      console.error(`⚠️ Socket Error: ${message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [setSocketConnected, setRoom]);

  const emit = <Ev extends keyof ClientToServerEvents>(
    event: Ev,
    data: Parameters<ClientToServerEvents[Ev]>[0],
    callback?: Function
  ) => {
    if (socketRef.current?.connected) {
      // @ts-ignore
      socketRef.current.emit(event, data, callback as any);
    } else {
      console.warn('Socket not connected. Cannot emit:', event);
    }
  };

  return { socket: socketRef.current, emit };
};
