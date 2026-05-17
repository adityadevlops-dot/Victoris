<div align="center">

<img src="public/assets/oris.png" alt="Victoris Logo" width="120" />

# VICTORIS

**THE ARENA WHERE CODE MEETS COMBAT**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-black?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-black?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-black?style=for-the-badge&logo=socket.io)](https://socket.io/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-black?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-5.12-black?style=for-the-badge&logo=redis)](https://redis.io/)
[![Zustand](https://img.shields.io/badge/Zustand-4.4-black?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Code. Compete. Conquer.*

</div>

---

## OVERVIEW

Victoris is a high-performance, real-time multiplayer programming battle arena. Built for developers who want to test their algorithms under pressure, Victoris transforms coding into a competitive esports experience. Enter the arena, race against fellow developers on algorithmic challenges, climb the ranks from Bronze to Legend, and cement your legacy.

<div align="center">
  <img src="https://via.placeholder.com/1000x500/0a0a0a/dc2626?text=VICTORIS+BATTLE+ARENA+INTERFACE" alt="Victoris Interface Screenshot" width="100%" />
</div>

## CORE FEATURES

* **REAL-TIME MULTIPLAYER BATTLES**: Synchronized multiplayer rooms using WebSocket architecture with sub-millisecond state updates.
* **MONACO EDITOR INTEGRATION**: Full VSCode-like editing experience natively in the browser with syntax highlighting and auto-completion.
* **DYNAMIC RANKING SYSTEM**: ELO-based progression system. Climb through 7 tiers (Bronze, Silver, Gold, Platinum, Diamond, Master, Legend).
* **CINEMATIC ONBOARDING**: Interactive and immersive UI/UX designed around a dark, cyberpunk-inspired aesthetic.
* **LIVE LEADERBOARDS**: Global, Weekly, and Friends leaderboards to track top competitors.
* **CUSTOM ROOMS**: Create private rooms, adjust time limits, and duel directly with peers.

## TECHNOLOGY STACK

### FRONTEND
* **Framework**: Next.js 15 (App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **State Management**: Zustand
* **Code Editor**: @monaco-editor/react
* **Icons**: Lucide React

### BACKEND & INFRASTRUCTURE
* **API**: Next.js Route Handlers
* **Database ORM**: Prisma
* **Real-time Engine**: Socket.IO
* **In-Memory Store/Adapter**: Redis
* **Authentication**: JWT (JSON Web Tokens) & bcryptjs

## LOCAL DEPLOYMENT PROTOCOL

### PREREQUISITES
* Node.js (v18 or higher)
* PostgreSQL Database
* Redis Server

### INITIALIZATION

1. **CLONE REPOSITORY**
```bash
git clone https://github.com/adityadevlops-dot/Victoris.git
cd Victoris
```

2. **INSTALL DEPENDENCIES**
```bash
npm install
```

3. **ENVIRONMENT CONFIGURATION**
Create a `.env` file in the root directory and configure the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/victoris"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3002"
JWT_SECRET="your_secure_jwt_secret"
REDIS_URL="redis://localhost:6379"
```

4. **DATABASE MIGRATION**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **INITIALIZE DEVELOPMENT SERVER**
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## ARCHITECTURE TOPOLOGY

* **Client Layer**: Manages the cinematic UI, local state via Zustand, and real-time socket connections.
* **Next.js Server**: Handles SSR, API routes, database connections via Prisma, and authentication logic.
* **WebSocket Server**: Dedicated Socket.IO server utilizing Redis adapter for multi-node horizontal scalability. Manages room states, countdowns, and real-time competitor progress tracking.

## CONTRIBUTING

All contributions must follow the standard repository protocols.
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-module`).
3. Commit your changes (`git commit -m 'Add new module'`).
4. Push to the branch (`git push origin feature/new-module`).
5. Open a Pull Request for review.

## LICENSE

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <strong>PREPARE FOR BATTLE.</strong>
</div>
