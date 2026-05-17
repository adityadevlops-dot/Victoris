"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual JWT login logic
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/onboarding";
    }, 1500);
  };

  return (
    <div 
      className="w-full max-w-[420px] bg-[#0a0a0a] border border-[#1a1a1a] p-10 relative shadow-[0_0_40px_rgba(220,38,38,0.05)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(220,38,38,0.1)] hover:border-[#dc2626]/30"
      style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top red accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-80" />
      
      <div className="mb-10 text-center">
        <h2 className="font-['Orbitron'] font-bold text-3xl text-[#fafafa] tracking-widest mb-3 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Enter Arena
        </h2>
        <p className="font-['Rajdhani'] text-[#a1a1aa] text-lg font-medium">
          Authenticate to resume your rank climb.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 relative">
          <label className="font-['Rajdhani'] font-bold text-[#fafafa] text-sm uppercase tracking-[0.15em] ml-1">
            Gladiator Email
          </label>
          <div className="relative group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111111] border border-[#1a1a1a] text-[#fafafa] px-5 py-4 font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-[#dc2626] transition-all rounded-[3px] group-hover:border-[#dc2626]/50"
              placeholder="gladiator@victoris.com"
            />
            <div className="absolute inset-0 border border-[#dc2626] opacity-0 group-focus-within:opacity-100 rounded-[3px] pointer-events-none transition-opacity blur-[2px]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="flex justify-between items-center ml-1">
            <label className="font-['Rajdhani'] font-bold text-[#fafafa] text-sm uppercase tracking-[0.15em]">
              Access Code
            </label>
            <Link 
              href="/forgot-password"
              className="font-['Rajdhani'] text-[#a1a1aa] hover:text-[#dc2626] text-sm transition-colors font-medium tracking-wide"
            >
              Recover Access
            </Link>
          </div>
          <div className="relative group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111111] border border-[#1a1a1a] text-[#fafafa] px-5 py-4 font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-[#dc2626] transition-all rounded-[3px] group-hover:border-[#dc2626]/50 tracking-widest"
              placeholder="••••••••••••"
            />
            <div className="absolute inset-0 border border-[#dc2626] opacity-0 group-focus-within:opacity-100 rounded-[3px] pointer-events-none transition-opacity blur-[2px]" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 relative w-full bg-[#dc2626] hover:bg-[#ef4444] text-[#000000] font-['Orbitron'] font-black py-4 uppercase tracking-[0.25em] text-sm rounded-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10">{isLoading ? "Authenticating..." : "Login"}</span>
        </button>
      </form>

      <div className="mt-10 text-center border-t border-[#1a1a1a] pt-8">
        <p className="font-['Rajdhani'] text-[#a1a1aa] text-lg">
          Not registered yet?{" "}
          <Link href="/register" className="text-[#fafafa] hover:text-[#dc2626] transition-colors font-bold tracking-wide">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
