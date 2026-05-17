'use client'
import { useState, useEffect, useRef, useCallback } from "react"

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
]

const RANK_SEQUENCE = ["Bronze","Silver","Gold","Platinum","Diamond","Master","Legend"]

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────────────────

function useTypewriter(text, speed = 38, active = true) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    if (!active) return
    let i = 0
    ref.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(ref.current)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(ref.current)
  }, [text, speed, active])

  const skip = useCallback(() => {
    clearInterval(ref.current)
    setDisplayed(text)
    setDone(true)
  }, [text])

  return { displayed, done, skip }
}

// ─── GLITCH LOGO ──────────────────────────────────────────────────────────────

function GlitchLogo({ visible }) {
  return (
    <div style={{
      position: "relative",
      display: "inline-block",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
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
        <div className="tagline" style={{ marginTop: 16 }}>CODE · COMPETE · CONQUER</div>
      </div>
    </div>
  )
}

// ─── STEP 1: CINEMATIC INTRO ──────────────────────────────────────────────────

function CinematicIntro({ onComplete }) {
  const [logoVisible, setLogoVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 600)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + (100 / 38)
      })
    }, 105)
    const t2 = setTimeout(onComplete, 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(interval) }
  }, [onComplete])

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999,
      overflow: "hidden",
    }}>
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
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      <GlitchLogo visible={logoVisible} />

      <button
        onClick={onComplete}
        style={{
          position: "absolute", bottom: 48, right: 48,
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
        onMouseEnter={e => { e.target.style.borderColor="rgba(220,38,38,0.6)"; e.target.style.color="rgba(220,38,38,0.8)" }}
        onMouseLeave={e => { e.target.style.borderColor="rgba(255,255,255,0.15)"; e.target.style.color="rgba(255,255,255,0.4)" }}
      >
        SKIP
      </button>

      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2,
        width: `${Math.min(progress,100)}%`,
        background: "#dc2626",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px rgba(220,38,38,0.6)",
      }} />
    </div>
  )
}

// ─── ORIS AVATAR PLACEHOLDER ──────────────────────────────────────────────────

function OrisAvatar({ pulse }) {
  return (
    <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
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
        <div className="oris-glow" style={{
          borderRadius: "50% 50% 40% 40%",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(180deg, #1a0a0a 0%, #0a0a0a 100%)",
          border: "1px solid rgba(220,38,38,0.25)",
          aspectRatio: "3/4",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div className="oris-scan" style={{
            position: "absolute", left:0, right:0, height:2,
            background: "linear-gradient(transparent, rgba(220,38,38,0.5), transparent)",
            pointerEvents: "none",
          }} />

          {/* Placeholder — user drops in /assets/oris.png here */}
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 12, padding: 20,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: "2px solid rgba(220,38,38,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="14" r="7" stroke="#dc2626" strokeWidth="1.5"/>
                <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, color:"#dc2626", letterSpacing:"0.2em" }}>ORIS</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:4, letterSpacing:"0.15em" }}>DROP IMAGE → /assets/oris.png</div>
            </div>
          </div>
        </div>

        {/* Corner brackets */}
        {[["0","0","tl"],["0","auto","tr"],["auto","0","bl"],["auto","auto","br"]].map(([t,b,k]) => (
          <div key={k} style={{
            position:"absolute",
            top: k.startsWith("t") ? -6 : "auto",
            bottom: k.startsWith("b") ? -6 : "auto",
            left: k.endsWith("l") ? -6 : "auto",
            right: k.endsWith("r") ? -6 : "auto",
            width:16, height:16,
            borderColor:"rgba(220,38,38,0.6)", borderStyle:"solid",
            borderWidth: k==="tl"?"2px 0 0 2px": k==="tr"?"2px 2px 0 0": k==="bl"?"0 0 2px 2px":"0 2px 2px 0",
          }}/>
        ))}
      </div>

      <div style={{
        textAlign:"center", marginTop:12,
        fontFamily:"'Orbitron',monospace", fontSize:11,
        color:"rgba(220,38,38,0.6)", letterSpacing:"0.3em",
      }}>
        A.I. ARENA GUIDE
      </div>
    </div>
  )
}

// ─── STEP 2: ORIS ONBOARDING ──────────────────────────────────────────────────

function OrisOnboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [entering, setEntering] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const dialogue = DIALOGUES[step]
  const { displayed, done, skip: skipType } = useTypewriter(dialogue.line, 40, !transitioning)

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 100)
    return () => clearTimeout(t)
  }, [])

  const handleNext = useCallback(() => {
    if (!done) { skipType(); return }
    if (step >= DIALOGUES.length - 1) { onComplete(); return }
    setTransitioning(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setTransitioning(false)
    }, 280)
  }, [done, skipType, step, onComplete])

  useEffect(() => {
    const handler = (e) => { if (e.key === "ArrowRight" || e.key === " ") handleNext() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleNext])

  const progress = ((step + 1) / DIALOGUES.length) * 100

  return (
    <div style={{
      position:"fixed", inset:0,
      background:"#0a0a0a",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      zIndex:9998, overflow:"hidden",
      fontFamily:"'Orbitron',monospace",
      opacity: entering ? 0 : 1,
      transition: "opacity 0.5s ease",
    }}>
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
          border: 1px solid rgba(220,38,38,0.4);
          color:#dc2626;
          font-family:'Orbitron',monospace;
          font-size:11px; letter-spacing:0.2em;
          padding:12px 32px; cursor:pointer;
          transition:all 0.2s;
          position:relative; overflow:hidden;
        }
        .next-btn::before {
          content:'';
          position:absolute; inset:0;
          background:rgba(220,38,38,0);
          transition:background 0.2s;
        }
        .next-btn:hover { border-color:#dc2626; color:#fff; }
        .next-btn:hover::before { background:rgba(220,38,38,0.1); }
        .next-btn:active { transform:scale(0.97); }
        .skip-btn {
          background:transparent; border:none;
          color:rgba(255,255,255,0.2);
          font-family:'Orbitron',monospace; font-size:9px;
          letter-spacing:0.2em; cursor:pointer;
          transition:color 0.2s; padding:8px;
        }
        .skip-btn:hover { color:rgba(220,38,38,0.6); }
        .step-dot {
          width:6px; height:6px; border-radius:50%;
          transition:all 0.3s;
        }
      `}</style>

      {/* Centered Dialogue Content */}
      <div className="dialogue-panel" style={{
        display:"flex", flexDirection:"column",
        justifyContent:"center", padding:"60px 48px 60px 48px",
        maxWidth:800, width:"100%",
        position:"absolute",
        left:0, top:"50%",
        transform:"translateY(-50%)",
        zIndex:10,
      }}>
        {/* Top: step indicator */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:48 }}>
          {DIALOGUES.map((_, i) => (
            <div key={i} className="step-dot" style={{
              background: i < step ? "#7f1d1d" : i === step ? "#dc2626" : "rgba(255,255,255,0.1)",
              boxShadow: i === step ? "0 0 8px rgba(220,38,38,0.6)" : "none",
              width: i === step ? 24 : 6,
              borderRadius: i === step ? 3 : "50%",
            }} />
          ))}
          <span style={{ marginLeft:"auto", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:"0.15em" }}>
            {step+1} / {DIALOGUES.length}
          </span>
        </div>

        {/* Dialogue */}
        <div style={{
          opacity: transitioning ? 0 : 1,
          transition:"opacity 0.25s",
          display:"flex", flexDirection:"column", justifyContent:"center",
        }}>
          <div style={{ marginBottom:8, fontSize:9, color:"rgba(220,38,38,0.5)", letterSpacing:"0.3em" }}>
            ORIS //{" "}{String(step+1).padStart(2,"0")}
          </div>

          <div className="dialogue-text" key={step} style={{
            fontSize:clamp(18,3,32),
            fontWeight:700,
            color:"#fff",
            lineHeight:1.3,
            marginBottom:16,
            minHeight:80,
            textAlign:"left",
          }}>
            {displayed}
            {!done && <span className="cursor"/>}
          </div>

          {done && (
            <div style={{
              fontSize:12, color:"rgba(255,255,255,0.4)",
              lineHeight:1.6, letterSpacing:"0.05em",
              fontFamily:"system-ui, sans-serif", fontWeight:400,
              maxWidth:440,
              animation:"sub-in 0.5s ease-out",
              textAlign:"left",
            }}>
              {dialogue.sub}
            </div>
          )}

          {/* Rank ladder — shown on step 4 */}
          {step === 4 && done && (
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:20 }}>
              {RANK_SEQUENCE.map((r,i) => {
                const colors = ["#cd7f32","#c0c0c0","#ffd700","#e5e4e2","#7dd3fc","#f87171","#dc2626"]
                return (
                  <div key={r} className="rank-item" style={{
                    animationDelay: `${i*0.1}s`,
                    border:`1px solid ${colors[i]}40`,
                    color:colors[i],
                    background:`${colors[i]}10`,
                    fontSize:9, padding:"4px 10px",
                    letterSpacing:"0.15em",
                  }}>
                    {r.toUpperCase()}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* CTA row */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:40 }}>
          <button className="next-btn" onClick={handleNext}>
            {!done
              ? "REVEAL"
              : step >= DIALOGUES.length - 1
              ? "ENTER ARENA →"
              : "NEXT →"}
          </button>
          <button className="skip-btn" onClick={onComplete}>SKIP ALL</button>
          <span style={{
            marginLeft:"auto", fontSize:9,
            color:"rgba(255,255,255,0.12)", letterSpacing:"0.12em",
          }}>
            SPACE / → to advance
          </span>
        </div>
      </div>

      {/* Oris Avatar - Middle Right Fixed Position - Larger */}
      <div style={{
        position:"fixed",
        top:"50%",
        right:"5%",
        transform:"translateY(-50%)",
        width:420,
        height:580,
        zIndex:20,
        pointerEvents:"none",
      }}>
        <OrisAvatar pulse />
      </div>

      {/* Bottom progress bar */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        height:1, background:"rgba(255,255,255,0.04)",
      }}>
        <div style={{
          height:"100%", background:"#dc2626",
          width:`${progress}%`,
          transition:"width 0.4s ease",
          boxShadow:"0 0 6px rgba(220,38,38,0.5)",
        }}/>
      </div>
    </div>
  )
}

function clamp(min, v, max) {
  return `clamp(${min}px, ${v}vw, ${max}px)`
}

// ─── DONE SCREEN ─────────────────────────────────────────────────────────────

function ArenaEntry() {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => { setTimeout(() => setOpacity(1), 50) }, [])

  return (
    <div style={{
      position:"fixed", inset:0, background:"#0a0a0a",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      zIndex:9997, fontFamily:"'Orbitron',monospace",
      opacity, transition:"opacity 0.8s ease",
    }}>
      <style>{`
        @keyframes arena-pulse {
          0%,100% { transform:scale(1); opacity:0.4; }
          50%      { transform:scale(1.05); opacity:0.8; }
        }
        .arena-ring {
          position:absolute; border-radius:50%;
          border: 1px solid rgba(220,38,38,0.2);
          animation: arena-pulse 3s ease-in-out infinite;
        }
      `}</style>
      <div className="arena-ring" style={{width:200,height:200,animationDelay:"0s"}}/>
      <div className="arena-ring" style={{width:300,height:300,animationDelay:"0.5s"}}/>
      <div className="arena-ring" style={{width:400,height:400,animationDelay:"1s"}}/>
      <div style={{ position:"relative", textAlign:"center", zIndex:2 }}>
        <div style={{ fontSize:10, color:"rgba(220,38,38,0.7)", letterSpacing:"0.4em", marginBottom:16 }}>
          ARENA UNLOCKED
        </div>
        <div style={{ fontSize:"clamp(28px,5vw,56px)", fontWeight:900, color:"#fff", letterSpacing:"0.1em" }}>
          WELCOME,<br/>
          <span style={{ color:"#dc2626" }}>CHAMPION</span>
        </div>
        <div style={{ marginTop:24, fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.2em" }}>
          Loading your dashboard...
        </div>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const LS_KEY = "victoris_onboarding_v1"

export default function VictorisOnboarding() {
  const [phase, setPhase] = useState(() => {
    try {
      const seen = localStorage.getItem(LS_KEY)
      return seen ? "done" : "intro"
    } catch { return "intro" }
  })

  const goToOris    = useCallback(() => setPhase("oris"), [])
  const goToArena   = useCallback(() => {
    try { localStorage.setItem(LS_KEY, "true") } catch {}
    setPhase("done")
  }, [])
  const resetDemo   = useCallback(() => {
    try { localStorage.removeItem(LS_KEY) } catch {}
    setPhase("intro")
  }, [])

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"#0a0a0a", position:"relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');`}</style>

      {phase === "intro" && <CinematicIntro onComplete={goToOris} />}
      {phase === "oris"  && <OrisOnboarding onComplete={goToArena} />}
      {phase === "done"  && <ArenaEntry />}

      {phase === "done" && (
        <button
          onClick={resetDemo}
          style={{
            position:"fixed", bottom:20, right:20,
            background:"rgba(127,29,29,0.3)",
            border:"1px solid rgba(220,38,38,0.3)",
            color:"rgba(220,38,38,0.7)",
            fontFamily:"'Orbitron',monospace",
            fontSize:9, letterSpacing:"0.15em",
            padding:"6px 14px", cursor:"pointer", zIndex:99999,
          }}
        >
          ↺ REPLAY INTRO
        </button>
      )}
    </div>
  )
}
