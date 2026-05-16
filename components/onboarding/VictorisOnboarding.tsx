"use client";

import { useState, useEffect, useCallback } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const DIALOGUES = [
  {
    id: 1,
    line: "Welcome to Victoris.",
    sub: "The arena where code meets combat.",
  },
  {
    id: 2,
    line: "Every solution earns Victo Points.",
    sub: "Points define your rank. Rank defines your legend.",
  },
  {
    id: 3,
    line: "The Arena holds thousands of challenges.",
    sub: "Arrays. Graphs. Dynamic Programming. Every domain. Every difficulty.",
  },
  {
    id: 4,
    line: "Battle Rooms are where champions are made.",
    sub: "Real-time. Same problem. First correct solution wins.",
  },
  {
    id: 5,
    line: "Bronze. Silver. Gold. Platinum. Diamond. Master. Legend.",
    sub: "Seven ranks. One path. Yours to climb.",
  },
  {
    id: 6,
    line: "The arena is ready.",
    sub: "Enter. Compete. Conquer.",
  },
];

const RANK_SEQUENCE = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Legend",
];

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────────────────

function useTypewriter(
  text: string,
  speed: number = 38,
  active: boolean = true
): { displayed: string; done: boolean; skip: () => void } {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (displayed.length === text.length) {
      setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed((d) => d + text[d.length]);
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, active, speed]);

  return {
    displayed,
    done,
    skip: () => {
      setDisplayed(text);
      setDone(true);
    },
  };
}

// ─── GLITCH LOGO ──────────────────────────────────────────────────────────────

function GlitchLogo({ visible }: { visible: boolean }): JSX.Element {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        @keyframes glitch-1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-3px,0); opacity:0.8; }
          20%      { clip-path: inset(30% 0 50% 0); transform: translate(3px,0); }
          40%      { clip-path: inset(60% 0 20% 0); transform: translate(-2px,0); }
          60%      { clip-path: inset(80% 0 5% 0);  transform: translate(2px,0); }
          80%      { clip-path: inset(10% 0 75% 0); transform: translate(-1px,0); }
        }
        @keyframes glitch-2 {
          0%,100% { clip-path: inset(80% 0 0 0); transform: translate(3px,0); opacity:0.6; }
          25%      { clip-path: inset(20% 0 60% 0); transform: translate(-3px,0); }
          50%      { clip-path: inset(50% 0 30% 0); transform: translate(2px,0); }
          75%      { clip-path: inset(5% 0 85% 0);  transform: translate(-2px,0); }
        }
        @keyframes logo-reveal {
          0%   { letter-spacing: 0.8em; opacity: 0; filter: blur(8px); }
          60%  { letter-spacing: 0.12em; opacity: 0.9; filter: blur(1px); }
          100% { letter-spacing: 0.15em; opacity: 1; filter: blur(0); }
        }
        @keyframes tagline-in {
          0%   { opacity: 0; transform: translateY(14px); letter-spacing: 0.5em; }
          100% { opacity: 1; transform: translateY(0);    letter-spacing: 0.35em; }
        }
        @keyframes scanline-move {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes red-pulse {
          0%,100% { text-shadow: 0 0 20px rgba(220,38,38,0.3); }
          50%      { text-shadow: 0 0 40px rgba(220,38,38,0.8), 0 0 80px rgba(220,38,38,0.3); }
        }
        .logo-main {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(42px, 8vw, 96px);
          color: #fff;
          letter-spacing: 0.15em;
          animation: logo-reveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards, red-pulse 3s ease-in-out 1.6s infinite;
          position: relative;
          z-index: 2;
        }
        .logo-glitch-1 {
          position: absolute; top:0; left:0; width:100%; height:100%;
          font-family: 'Orbitron', monospace; font-weight:900;
          font-size: clamp(42px,8vw,96px); letter-spacing:0.15em;
          color: #dc2626;
          animation: glitch-1 0.6s steps(1) 1.2s 4;
          z-index: 3; pointer-events:none;
        }
        .logo-glitch-2 {
          position: absolute; top:0; left:0; width:100%; height:100%;
          font-family: 'Orbitron', monospace; font-weight:900;
          font-size: clamp(42px,8vw,96px); letter-spacing:0.15em;
          color: #7f1d1d;
          animation: glitch-2 0.6s steps(1) 1.2s 4;
          z-index: 3; pointer-events:none;
        }
        .tagline {
          font-family: 'Orbitron', monospace;
          font-size: clamp(10px, 1.8vw, 15px);
          color: #a1a1aa;
          letter-spacing: 0.35em;
          animation: tagline-in 1s ease-out 2.2s both;
        }
        .scanline-sweep {
          position: absolute; top:0; left:0; right:0;
          height: 3px;
          background: linear-gradient(transparent, rgba(220,38,38,0.4), transparent);
          animation: scanline-move 3s linear 0.8s 3;
          pointer-events: none;
          z-index:10;
        }
      `}</style>
      <div className="scanline-sweep" />
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div className="logo-main">VICTORIS</div>
          <div className="logo-glitch-1">VICTORIS</div>
          <div className="logo-glitch-2">VICTORIS</div>
        </div>
        <div className="tagline" style={{ marginTop: 16 }}>
          CODE · COMPETE · CONQUER
        </div>
      </div>
    </div>
  );
}

// ─── STEP 1: CINEMATIC INTRO ──────────────────────────────────────────────────

function CinematicIntro({
  onComplete,
}: {
  onComplete: () => void;
}): JSX.Element {
  const [logoVisible, setLogoVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 600);
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 105);
    const t2 = setTimeout(onComplete, 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes noise {
          0%,100% { transform: translate(0,0); }
          10% { transform: translate(-1%,-1%); }
          30% { transform: translate(1%,1%); }
          50% { transform: translate(-1%,1%); }
          70% { transform: translate(1%,-1%); }
          90% { transform: translate(-0.5%,0.5%); }
        }
        .noise-overlay {
          position: absolute; inset:-10px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          animation: noise 0.15s steps(1) infinite;
          pointer-events: none; opacity:0.3;
        }
        .grid-bg {
          position:absolute; inset:0;
          background-image: linear-gradient(rgba(127,29,29,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(127,29,29,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events:none;
        }
        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position:absolute; width:40px; height:40px;
          border-color: rgba(220,38,38,0.4); border-style:solid;
        }
        .corner-tl { top:24px; left:24px; border-width:1px 0 0 1px; }
        .corner-tr { top:24px; right:24px; border-width:1px 1px 0 0; }
        .corner-bl { bottom:24px; left:24px; border-width:0 0 1px 1px; }
        .corner-br { bottom:24px; right:24px; border-width:0 1px 1px 0; }
      `}</style>

      <div className="noise-overlay" />
      <div className="grid-bg" />
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      <GlitchLogo visible={logoVisible} />

      <button
        onClick={onComplete}
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Orbitron', monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          padding: "8px 20px",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.borderColor =
            "rgba(220,38,38,0.6)";
          (e.target as HTMLButtonElement).style.color =
            "rgba(220,38,38,0.8)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.borderColor =
            "rgba(255,255,255,0.15)";
          (e.target as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.4)";
        }}
      >
        SKIP
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: `${Math.min(progress, 100)}%`,
          background: "#dc2626",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(220,38,38,0.6)",
        }}
      />
    </div>
  );
}

// ─── ORIS AVATAR ──────────────────────────────────────────────────────────────

function OrisAvatar(): JSX.Element {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 340, margin: "0 auto" }}>
      <style>{`
        @keyframes float-oris {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes glow-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0), 0 0 40px rgba(220,38,38,0.15); }
          50%      { box-shadow: 0 0 0 6px rgba(220,38,38,0.1), 0 0 60px rgba(220,38,38,0.3); }
        }
        @keyframes scan-horiz {
          0%   { top: 0%; opacity:0.6; }
          100% { top: 100%; opacity:0; }
        }
        .oris-float { animation: float-oris 4s ease-in-out infinite; }
        .oris-glow  { animation: glow-ring 2.5s ease-in-out infinite; }
        .oris-scan  { animation: scan-horiz 2s linear infinite; }
      `}</style>

      <div className="oris-float" style={{ position: "relative" }}>
        <div
          className="oris-glow"
          style={{
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(180deg, #1a0a0a 0%, #0a0a0a 100%)",
            border: "1px solid rgba(220,38,38,0.25)",
            height: "480px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="oris-scan"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(transparent, rgba(220,38,38,0.5), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Oris Avatar Image */}
          <img
            src="/assets/oris.png"
            alt="Oris - AI Arena Guide"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "top center",
              display: "block",
              background: "transparent",
              boxShadow: "0 0 35px rgba(255,0,0,0.18)",
            }}
          />
        </div>

        {/* Corner brackets */}
        {[
          ["0", "0", "tl"],
          ["0", "auto", "tr"],
          ["auto", "0", "bl"],
          ["auto", "auto", "br"],
        ].map(([t, b, k]) => (
          <div
            key={k}
            style={{
              position: "absolute",
              top: (k as string).startsWith("t") ? -6 : "auto",
              bottom: (k as string).startsWith("b") ? -6 : "auto",
              left: (k as string).endsWith("l") ? -6 : "auto",
              right: (k as string).endsWith("r") ? -6 : "auto",
              width: 20,
              height: 20,
              borderColor: "rgba(220,38,38,0.8)",
              borderStyle: "solid",
              borderWidth:
                k === "tl"
                  ? "2px 0 0 2px"
                  : k === "tr"
                    ? "2px 2px 0 0"
                    : k === "bl"
                      ? "0 0 2px 2px"
                      : "0 2px 2px 0",
            }}
          />
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          fontFamily: "'Orbitron',monospace",
          fontSize: 13,
          color: "rgba(220,38,38,0.8)",
          letterSpacing: "0.3em",
        }}
      >
        A.I. ARENA GUIDE
      </div>
    </div>
  );
}

// ─── STEP 2: ORIS ONBOARDING ──────────────────────────────────────────────────

function OrisOnboarding({
  onComplete,
}: {
  onComplete: () => void;
}): JSX.Element {
  const [step, setStep] = useState(0);
  const [entering, setEntering] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const dialogue = DIALOGUES[step];
  const { displayed, done, skip: skipType } = useTypewriter(
    dialogue.line,
    40,
    !transitioning
  );

  useEffect(() => {
    setEntering(false);
  }, []);

  const handleNext = useCallback(() => {
    if (!done) {
      skipType();
      return;
    }
    if (step >= DIALOGUES.length - 1) {
      onComplete();
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 300);
  }, [done, skipType, step, onComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext]);

  const progress = ((step + 1) / DIALOGUES.length) * 100;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "stretch",
        zIndex: 9998,
        overflow: "hidden",
        fontFamily: "'Orbitron',monospace",
        opacity: entering ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @keyframes dialogue-in {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes sub-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes rank-reveal {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .dialogue-text {
          animation: dialogue-in 0.3s ease-out;
        }
        .cursor {
          display:inline-block; width:2px; height:1em;
          background:#dc2626; margin-left:3px; vertical-align:-0.1em;
          animation: blink 0.8s step-end infinite;
        }
        .rank-item { animation: rank-reveal 0.4s ease-out both; }
        .next-btn {
          background:transparent;
          border: 1px solid rgba(255,0,0,0.55);
          color:#dc2626;
          font-family:'Orbitron',monospace;
          font-size:14px; letter-spacing:0.15em;
          padding:0 34px; height:56px; cursor:pointer;
          transition:all 0.3s ease;
          position:relative; overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .next-btn::before {
          content:'';
          position:absolute; inset:0;
          background:rgba(220,38,38,0);
          transition:background 0.3s ease;
        }
        .next-btn:hover { 
          border-color:#ff0000; 
          background:#dc2626;
          color:#000;
          box-shadow: 0 0 20px rgba(220,38,38,0.5);
        }
        .next-btn:hover::before { background:rgba(220,38,38,0.2); }
        .next-btn:active { transform:scale(0.96); }
        .skip-btn {
          background:transparent; border:none;
          color:rgba(255,255,255,0.72);
          font-family:'Orbitron',monospace; font-size:16px;
          letter-spacing:0.15em; cursor:pointer;
          transition:all 0.3s ease; padding:8px 16px;
        }
        .skip-btn:hover { color:rgba(255,40,40,0.9); }
        .step-dot {
          width:14px; height:14px; border-radius:50%;
          transition:all 0.3s ease;
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0); opacity:0.3; }
          50% { opacity:0.6; }
          100% { transform: translate(-2px, 3px); opacity:0.2; }
        }
        @keyframes scanline-horizontal {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .dialogue-panel-bg {
          position: absolute; inset:0;
          background-image: linear-gradient(0deg, rgba(220,38,38,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .dialogue-scanline {
          position: absolute; inset:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent);
          animation: scanline-horizontal 6s linear infinite;
          pointer-events: none;
        }
        @media (max-width:768px) {
          .oris-panel { display:none !important; }
          .dialogue-panel { max-width:100% !important; padding:32px 24px !important; }
        }
      `}</style>

      {/* Oris Panel */}
      <div
        className="oris-panel"
        style={{
          width: "42%",
          minWidth: 320,
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 40px 40px",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(127,29,29,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(127,29,29,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <OrisAvatar />
      </div>

      {/* Dialogue Panel */}
      <div
        className="dialogue-panel"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 64px",
          maxWidth: 640,
          margin: "0 auto",
          position: "relative",
          borderLeft: "1px solid rgba(220,38,38,0.08)",
          overflow: "hidden",
        }}
      >
        <div className="dialogue-scanline" />
        <div className="dialogue-panel-bg" />
        {/* Progress Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
          {DIALOGUES.map((_, i) => (
            <div
              key={i}
              className="step-dot"
              style={{
                background:
                  i < step
                    ? "#7f1d1d"
                    : i === step
                      ? "#ff0000"
                      : "rgba(255,255,255,0.15)",
                boxShadow: i === step ? "0 0 12px rgba(255,0,0,0.7), 0 0 24px rgba(255,0,0,0.3)" : "none",
                width: 14,
                height: 14,
                borderRadius: "50%",
              }}
            />
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              letterSpacing: "0.15em",
              fontFamily: "'Orbitron', monospace",
            }}
          >
            {String(step + 1).padStart(2, "0")} / {DIALOGUES.length}
          </span>
        </div>

        {/* Dialogue */}
        <div
          style={{
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.25s",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginBottom: 20,
              fontSize: 18,
              color: "rgba(255,40,40,0.9)",
              letterSpacing: "0.3em",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
            }}
          >
            ORIS // {String(step + 1).padStart(2, "0")}
          </div>

          <div
            className="dialogue-text"
            key={step}
            style={{
              fontSize: "clamp(58px, 6vw, 96px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#ffffff",
              marginBottom: 24,
              minHeight: 100,
              fontFamily: "'Orbitron', monospace",
            }}
          >
            {displayed}
            {!done && <span className="cursor" />}
          </div>

          {done && (
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                maxWidth: 520,
                marginTop: 20,
                animation: "sub-in 0.5s ease-out",
              }}
            >
              {dialogue.sub}
            </div>
          )}

          {/* Rank Badges */}
          {step === 4 && done && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
              {RANK_SEQUENCE.map((r, i) => (
                <div
                  key={i}
                  className="rank-item"
                  style={{
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 2,
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.3)",
                    color: "rgba(220,38,38,0.8)",
                    letterSpacing: "0.1em",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48 }}>
          <button
            className="next-btn"
            onClick={handleNext}
            style={{
              minWidth: "180px",
            }}
          >
            {!done
              ? "REVEAL"
              : step >= DIALOGUES.length - 1
                ? "ENTER ARENA →"
                : "NEXT →"}
          </button>
          <button className="skip-btn" onClick={onComplete}>
            SKIP ALL
          </button>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              letterSpacing: "0.15em",
              fontFamily: "'Orbitron', monospace",
            }}
          >
            SPACE / → to advance
          </span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#dc2626",
              width: `${progress}%`,
              transition: "width 0.4s ease",
              boxShadow: "0 0 6px rgba(220,38,38,0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function VictorisOnboarding(): JSX.Element {
  const [state, setStep] = useState<"cinematic" | "oris" | "done">("cinematic");

  return (
    <>
      {state === "cinematic" && (
        <CinematicIntro onComplete={() => setStep("oris")} />
      )}
      {state === "oris" && (
        <OrisOnboarding
          onComplete={() => {
            setStep("done");
            window.location.href = "/dashboard";
          }}
        />
      )}
    </>
  );
}
