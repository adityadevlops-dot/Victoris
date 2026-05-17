"use client";

import { useEffect, useState } from "react";
import { Verdict } from "../../types/arena";

const VERDICT_CONFIG: Record<Verdict, { color: string; label: string }> = {
  IDLE: { color: "transparent", label: "" },
  RUNNING: { color: "#f59e0b", label: "EXECUTING..." },
  ACCEPTED: { color: "#22c55e", label: "ACCEPTED // ARENA CONQUERED" },
  WRONG_ANSWER: { color: "#dc2626", label: "WRONG ANSWER // TEST FAILED" },
  TIME_LIMIT_EXCEEDED: { color: "#f59e0b", label: "TIME LIMIT EXCEEDED // TOO SLOW" },
  RUNTIME_ERROR: { color: "#f97316", label: "RUNTIME ERROR // CORE FAULT" },
  COMPILATION_ERROR: { color: "#dc2626", label: "COMPILATION ERROR // SYNTAX INVALID" },
};

export default function VerdictBanner({ verdict }: { verdict: Verdict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (verdict !== 'IDLE' && verdict !== 'RUNNING') {
      setVisible(true);
      t = setTimeout(() => setVisible(false), 3000);
    } else {
      setVisible(false);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [verdict]);

  if (!visible && verdict !== 'RUNNING') return null;

  const config = VERDICT_CONFIG[verdict];
  if (!config) return null;

  // For RUNNING, maybe we don't show the massive banner, just a small loader, 
  // but let's show a subtle overlay for running too.
  if (verdict === 'RUNNING') return null; // We handle running in the console bar

  return (
    <div 
      className="absolute top-[10%] left-1/2 -translate-x-1/2 z-50 overflow-hidden pointer-events-none"
      style={{ animation: 'bannerDrop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      <style>{`
        @keyframes bannerDrop {
          0% { transform: translate(-50%, -20px) scale(0.95); opacity: 0; filter: blur(10px); }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes textGlitch {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 50% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
        }
      `}</style>
      
      <div 
        className="px-12 py-6 bg-[#0a0a0a] border-y-2 border-x border-[#1a1a1a] relative shadow-2xl flex items-center justify-center min-w-[600px]"
        style={{ borderColor: config.color, boxShadow: `0 0 40px ${config.color}30, inset 0 0 20px ${config.color}15` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
        <h2 
          className="font-['Orbitron'] font-black text-3xl tracking-[0.2em] whitespace-nowrap"
          style={{ color: config.color, textShadow: `0 0 20px ${config.color}80` }}
        >
          {config.label}
        </h2>
      </div>
    </div>
  );
}
