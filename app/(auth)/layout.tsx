"use client";

import { useEffect, useRef, useState } from "react";

function AuthParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor(window.innerWidth / 8); // Significantly increased density
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Darker, deeper red for the particles
      ctx.fillStyle = "rgba(153, 27, 27, 0.5)"; 

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Darker, deeper red for the connecting lines
      ctx.strokeStyle = "rgba(153, 27, 27, 0.15)";
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 10000) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" 
    />
  );
}

function GlitchLogoAuth() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        marginBottom: "32px",
      }}
    >
      <style>{`
        @keyframes glitch-1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-2px,0); opacity:0.8; }
          20%      { clip-path: inset(30% 0 50% 0); transform: translate(2px,0); }
          40%      { clip-path: inset(60% 0 20% 0); transform: translate(-2px,0); }
          60%      { clip-path: inset(80% 0 5% 0);  transform: translate(2px,0); }
          80%      { clip-path: inset(10% 0 75% 0); transform: translate(-1px,0); }
        }
        @keyframes glitch-2 {
          0%,100% { clip-path: inset(80% 0 0 0); transform: translate(2px,0); opacity:0.6; }
          25%      { clip-path: inset(20% 0 60% 0); transform: translate(-2px,0); }
          50%      { clip-path: inset(50% 0 30% 0); transform: translate(2px,0); }
          75%      { clip-path: inset(5% 0 85% 0);  transform: translate(-1px,0); }
        }
        @keyframes logo-reveal {
          0%   { letter-spacing: 0.5em; opacity: 0; filter: blur(4px); }
          100% { letter-spacing: 0.15em; opacity: 1; filter: blur(0); }
        }
        @keyframes tagline-in {
          0%   { opacity: 0; transform: translateY(10px); letter-spacing: 0.5em; }
          100% { opacity: 1; transform: translateY(0);    letter-spacing: 0.35em; }
        }
        @keyframes red-pulse {
          0%,100% { text-shadow: 0 0 20px rgba(220,38,38,0.3); }
          50%      { text-shadow: 0 0 40px rgba(220,38,38,0.8), 0 0 80px rgba(220,38,38,0.3); }
        }
        .logo-main-auth {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(32px, 6vw, 56px);
          color: #fff;
          letter-spacing: 0.15em;
          animation: logo-reveal 1s cubic-bezier(0.16,1,0.3,1) forwards, red-pulse 3s ease-in-out 1.2s infinite;
          position: relative;
          z-index: 2;
        }
        .logo-glitch-1-auth {
          position: absolute; top:0; left:0; width:100%; height:100%;
          font-family: 'Orbitron', monospace; font-weight:900;
          font-size: clamp(32px, 6vw, 56px); letter-spacing:0.15em;
          color: #dc2626;
          opacity: 0; clip-path: inset(100%);
          animation: glitch-1 0.6s steps(1) 0.8s 4;
          z-index: 3; pointer-events:none;
        }
        .logo-glitch-2-auth {
          position: absolute; top:0; left:0; width:100%; height:100%;
          font-family: 'Orbitron', monospace; font-weight:900;
          font-size: clamp(32px, 6vw, 56px); letter-spacing:0.15em;
          color: #7f1d1d;
          opacity: 0; clip-path: inset(100%);
          animation: glitch-2 0.6s steps(1) 0.8s 4;
          z-index: 3; pointer-events:none;
        }
        .tagline-auth {
          font-family: 'Orbitron', monospace;
          font-size: clamp(10px, 1.2vw, 12px);
          color: #a1a1aa;
          letter-spacing: 0.35em;
          animation: tagline-in 1s ease-out 1s both;
          text-transform: uppercase;
        }
      `}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div className="logo-main-auth">VICT<span style={{ color: "#dc2626" }}>ORIS</span></div>
          <div className="logo-glitch-1-auth">VICT<span style={{ color: "inherit" }}>ORIS</span></div>
          <div className="logo-glitch-2-auth">VICT<span style={{ color: "inherit" }}>ORIS</span></div>
        </div>
        <div className="tagline-auth" style={{ marginTop: 8 }}>
          Code · Compete · Conquer
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center relative p-6 overflow-hidden">
      <style>{`
        .noise-bg {
          position: absolute; inset:-10px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity:0.6;
          z-index: 0;
        }
        .grid-lines {
          position: absolute; inset:0;
          background-image: linear-gradient(rgba(127,29,29,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(127,29,29,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }
        .red-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
      
      <div className="noise-bg" />
      <div className="grid-lines" />
      <div className="red-ambient-glow" />
      
      {/* Background Particle Animation */}
      <AuthParticles />
      
      <div className="z-10 relative flex flex-col items-center">
        {/* Real VICTORIS Glitch Logo */}
        <GlitchLogoAuth />

        {/* The Auth Form */}
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
