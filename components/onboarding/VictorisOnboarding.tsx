'use client'

import { useState, useEffect, useCallback, useRef, memo, type ReactNode } from 'react'
import styles from './VictorisOnboarding.module.css'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const DIALOGUES = [
  {
    id: 1,
    line: 'Welcome to Victoris.',
    sub: 'The arena where code meets combat.',
  },
  {
    id: 2,
    line: 'Every solution earns Victo Points.',
    sub: 'Points define your rank. Rank defines your legend.',
  },
  {
    id: 3,
    line: 'The Arena holds thousands of challenges.',
    sub: 'Arrays. Graphs. Dynamic Programming. Every domain. Every difficulty.',
  },
  {
    id: 4,
    line: 'Battle Rooms are where champions are made.',
    sub: 'Real-time. Same problem. First correct solution wins.',
  },
  {
    id: 5,
    line: 'Bronze. Silver. Gold. Platinum. Diamond. Master. Legend.',
    sub: 'Seven ranks. One path. Yours to climb.',
  },
  {
    id: 6,
    line: 'The arena is ready.',
    sub: 'Enter. Compete. Conquer.',
  },
]

const RANK_SEQUENCE = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Legend']
const RANK_COLORS = ['#cd7f32', '#c0c0c0', '#ffd700', '#e5e4e2', '#7dd3fc', '#f87171', '#dc2626']
const LS_KEY = 'victoris_onboarding_v1'

const ANIMATION_TIMINGS = {
  introStart: 600,
  introComplete: 4200,
  orisStart: 100,
  transitionDuration: 280,
} as const

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────────────────

function useTypewriter(
  text: string,
  speed: number = 38,
  active: boolean = true
): { displayed: string; done: boolean; skip: () => void } {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!active || done) return

    setDisplayed('')
    setDone(false)

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current!)
        setDone(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, active, done])

  const skip = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayed(text)
    setDone(true)
  }, [text])

  return { displayed, done, skip }
}

// ─── GLITCH LOGO ──────────────────────────────────────────────────────────────

const GlitchLogo = memo(function GlitchLogo({ visible }: { visible: boolean }): ReactNode {
  return (
    <div className={styles['glitch-container']} style={{ opacity: visible ? 1 : 0 }}>
      <div className={styles['scanline-sweep']} />
      <div className={styles['logo-wrapper']}>
        <div className={styles['logo-main']}>VICTORIS</div>
        <div className={styles['logo-glitch-1']}>VICTORIS</div>
        <div className={styles['logo-glitch-2']}>VICTORIS</div>
      </div>
      <div className={styles['tagline']}>CODE · COMPETE · CONQUER</div>
    </div>
  )
})

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
      // Redirect to the actual Arena
      setTransitioning(true);
      setTimeout(() => {
        window.location.href = "/arena/two-sum";
      }, 1000);
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 300);
  }, [done, skipType, step]);

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          display:inline-block; width:3px; height:1em;
          background:#ff0000; margin-left:4px; vertical-align:-0.1em;
          animation: blink 0.8s step-end infinite;
        }
        .rank-item { animation: rank-reveal 0.4s ease-out both; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.7); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0.2); }
        }
        .next-btn {
          background:transparent;
          border: 2px solid rgba(255,0,0,0.6);
          color:#ff0000;
          font-family:'Orbitron',monospace;
          font-size:15px; letter-spacing:0.18em; font-weight:700;
          padding:0; width:210px; height:62px; cursor:pointer;
          transition:all 0.3s ease;
          position:relative; overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .next-btn::before {
          content:'';
          position:absolute; inset:0;
          background:rgba(255,0,0,0);
          transition:background 0.3s ease;
          z-index:-1;
        }
        .next-btn:hover { 
          border-color:#ff0000; 
          background:#ff0000;
          color:#000;
          box-shadow: 0 0 30px rgba(255,0,0,0.6), inset 0 0 20px rgba(255,0,0,0.3);
          animation: pulse-glow 1.2s ease-out;
        }
        .next-btn:hover::before { background:rgba(255,0,0,0.15); }
        .next-btn:active { transform:scale(0.95); }
        .skip-btn {
          background:transparent; border:none;
          color:rgba(255,255,255,0.72);
          font-family:'Orbitron',monospace; font-size:16px;
          letter-spacing:0.15em; cursor:pointer;
          transition:all 0.3s ease; padding:8px 16px;
        }
        .skip-btn:hover { color:rgba(255,40,40,0.9); }
        .step-dot {
          width:18px; height:18px; border-radius:50%;
          transition:all 0.3s ease;
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,0,0,0.7); }
          50% { transform: scale(1.1); box-shadow: 0 0 0 4px rgba(255,0,0,0.3); }
        }
        .step-dot-active {
          animation: dot-pulse 1.5s ease-in-out infinite;
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0) rotateZ(0deg); opacity:0.4; }
          50% { opacity:0.7; }
          100% { transform: translate(-4px, 8px) rotateZ(45deg); opacity:0.1; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px); opacity:0.3; }
          50% { transform: translateY(-20px); opacity:0.6; }
        }
        @keyframes scanline-horizontal {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes scanline-fast {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .particle {
          position: fixed;
          width: 2px;
          height: 2px;
          background: rgba(255,0,0,0.5);
          border-radius: 50%;
          pointer-events: none;
        }
        .dialogue-panel-bg {
          position: fixed; inset:0;
          background-image: linear-gradient(0deg, rgba(220,38,38,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: -1;
        }
        .dialogue-scanline {
          position: fixed; inset:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent);
          animation: scanline-horizontal 6s linear infinite;
          pointer-events: none;
          z-index: -1;
        }
        @keyframes oris-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255,0,0,0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(255,0,0,0.5)) drop-shadow(0 0 80px rgba(255,0,0,0.2)); }
        }
        .dialogue-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          max-width: 1200px;
          padding: 60px 400px 60px 80px;
          position: relative;
          z-index: 100;
        }
        .oris-avatar-container {
          position: fixed;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          width: 280px;
          height: 380px;
          opacity: 0.6;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 0 40px rgba(255,0,0,0.25));
          animation: oris-glow-pulse 3s ease-in-out infinite;
        }
        @media (max-width:1024px) {
          .oris-avatar-container { display:none !important; }
          .dialogue-container { padding: 40px 32px !important; }
        }
      `}</style>

      {/* Animated Particles Background */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="dialogue-scanline" />
      <div className="dialogue-panel-bg" />

      {/* Animated Particles Background */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Main Content - Constrained to avoid overlap with Oris */}
      <div className="dialogue-container">
        {/* Progress Dots - Top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 80,
            alignSelf: "flex-start",
            paddingLeft: 0,
          }}
        >
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

        {/* Main Dialogue */}
        <div
          style={{
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.25s",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginBottom: 16,
              fontSize: 20,
              color: "rgba(255,40,40,0.9)",
              letterSpacing: "0.3em",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
            }}
          >
            ORIS // {String(step + 1).padStart(2, "0")}
          </div>

          {/* Main Heading - HUGE, FULL WIDTH */}
          <div
            className="dialogue-text"
            key={step}
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: 32,
              fontFamily: "'Orbitron', monospace",
              wordSpacing: "0.05em",
            }}
          >
            {displayed}
            {!done && <span className="cursor" />}
          </div>

          {/* Sub Description */}
          {done && (
            <div
              style={{
                fontSize: 23,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.9,
                letterSpacing: "0.03em",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                maxWidth: 800,
                marginBottom: 56,
                animation: "sub-in 0.5s ease-out",
              }}
            >
              {dialogue.sub}
            </div>
          )}

          {/* Rank Badges */}
          {step === 4 && done && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
              {RANK_SEQUENCE.map((r, i) => {
                const color = RANK_COLORS[i];
                return (
                  <div
                    key={i}
                    className="rank-item"
                    style={{
                      fontSize: 12,
                      padding: "6px 14px",
                      borderRadius: 4,
                      background: `${color}15`,
                      border: `1px solid ${color}50`,
                      color: color,
                      letterSpacing: "0.1em",
                      animationDelay: `${i * 40}ms`,
                      boxShadow: `0 0 10px ${color}20`,
                      fontWeight: 600,
                    }}
                  >
                    {r}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA Buttons - Bottom */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
            marginTop: 72,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              className="next-btn"
              onClick={handleNext}
            >
              {!done
                ? "REVEAL"
                : step >= DIALOGUES.length - 1
                  ? "ENTER ARENA"
                  : "NEXT"}
            </button>
            <button className="skip-btn" onClick={onComplete}>
              SKIP ALL
            </button>
          </div>
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.12em",
              fontFamily: "'Orbitron', monospace",
              fontWeight: 400,
            }}
          >
            Press SPACE to continue
          </span>
        </div>
      </div>

      {/* Oris Avatar - Bottom Right with Holographic Glow (Desktop Only) */}
      <div className="oris-avatar-container">
        <OrisAvatar />
      </div>

      {/* Progress Bar - Bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.04)",
          zIndex: 100,
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
