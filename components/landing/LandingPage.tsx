"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── PARTICLE CANVAS ────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    let animationFrameId: number;
    let isActive = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor(window.innerWidth / 15);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const draw = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(220, 38, 38, 0.5)";

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

      ctx.strokeStyle = "rgba(220, 38, 38, 0.1)";
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 12000) {
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
    
    // Performance optimization: pause when not visible
    const observer = new IntersectionObserver((entries) => {
      isActive = entries[0].isIntersecting;
      if (isActive) draw();
    });
    observer.observe(canvas);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── COUNTER COMPONENT ──────────────────────────────────────────────────────
function StatCounter({ target, suffix = "", duration = 2000 }: { target: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const update = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            setCount(Math.floor(ease * target));
            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref} className="stat-num">{count.toLocaleString()}{suffix}</div>;
}

// ─── MAIN LANDING PAGE ──────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // Scroll handlers
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          setShowTopBtn(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="landing-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        :root {
          --red: #dc2626;
          --red-dark: #7f1d1d;
          --red-mid: #991b1b;
          --black: #000000;
          --surface: #0f0f0f;
          --border: #1a1a1a;
          --text: #fafafa;
          --text-dim: #a1a1aa;
          --text-muted: #52525b;
          --font-display: 'Orbitron', monospace;
          --font-ui: 'Rajdhani', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        /* RESETS & GLOBALS */
        *, *::before, *::after { box-sizing: border-box; }
        * { margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--black);
          color: var(--text);
          font-family: var(--font-ui);
          overflow-x: hidden;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: inherit; }
        img { max-width: 100%; }

        /* REVEAL ANIMATIONS */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }
        .revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* 1. NAVBAR */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 24px;
          letter-spacing: 0.15em;
          color: var(--text);
        }
        .nav-logo span { color: var(--red); }
        .nav-links {
          display: flex;
          gap: 32px;
        }
        .nav-links a {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--red); }
        .nav-cta {
          background: transparent;
          border: 1px solid var(--red);
          color: var(--red);
          padding: 10px 24px;
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
          transition: all 0.3s;
        }
        .nav-cta:hover {
          background: var(--red);
          color: var(--black);
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
        }

        /* 2. HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 5% 60px;
          overflow: hidden;
        }
        .particle-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 84px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        .text-red { color: var(--red); text-shadow: 0 0 20px rgba(220,38,38,0.3); }
        .hero-desc {
          font-size: clamp(18px, 2vw, 24px);
          color: var(--text-dim);
          margin-bottom: 48px;
          font-weight: 500;
          max-width: 600px;
          margin-left: auto; margin-right: auto;
        }
        .hero-actions {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: var(--red);
          color: var(--black);
          border: none;
          padding: 18px 40px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.15em;
          transition: all 0.3s;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(220,38,38,0.3);
          background: #ef4444;
        }
        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          padding: 18px 40px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.15em;
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          border-color: var(--red);
          color: var(--red);
          background: rgba(220,38,38,0.05);
        }

        /* 3. STATS BAR */
        .stats-bar {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 40px 5%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          text-align: center;
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .stat-num span { color: var(--red); }
        .stat-label {
          color: var(--text-dim);
          font-size: 16px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* 4. FEATURES */
        .features {
          padding: 120px 5%;
        }
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 900;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .section-subtitle {
          color: var(--text-dim);
          font-size: 18px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 40px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: var(--red);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(220,38,38,0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .feature-card:hover::before { transform: scaleX(1); }
        .feature-icon {
          font-size: 32px;
          color: var(--red);
          margin-bottom: 24px;
        }
        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }
        .feature-card p {
          color: var(--text-dim);
          line-height: 1.6;
          font-size: 16px;
        }

        /* 5. BATTLE PREVIEW */
        .battle-preview {
          padding: 120px 5%;
          background: linear-gradient(180deg, var(--black) 0%, var(--surface) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }
        .battle-text {
          flex: 1;
          min-width: 300px;
          max-width: 500px;
        }
        .battle-text h2 {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .battle-text p {
          color: var(--text-dim);
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .battle-visual {
          flex: 1;
          min-width: 300px;
          max-width: 600px;
          position: relative;
        }
        .code-window {
          background: #0d0d0d;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 14px;
          color: #a1a1aa;
        }
        .code-header {
          background: #1a1a1a;
          padding: 12px 16px;
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
        }
        .code-dot { width: 10px; height: 10px; border-radius: 50%; background: #3f3f46; }
        .code-dot.red { background: var(--red); }
        .code-body {
          padding: 24px;
          white-space: pre;
          overflow-x: auto;
        }
        .code-keyword { color: #f472b6; }
        .code-func { color: #38bdf8; }
        .code-string { color: #a3e635; }

        /* 6. TESTIMONIALS */
        .testimonials {
          padding: 120px 5%;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .test-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 32px;
          position: relative;
        }
        .test-quote {
          font-size: 18px;
          font-style: italic;
          color: var(--text-dim);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .test-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .test-avatar {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--border);
        }
        .test-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
        }
        .test-rank {
          color: var(--red);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* 7. FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 60px 5% 40px;
          background: var(--surface);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 60px;
        }
        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 18px;
          margin-bottom: 24px;
          color: var(--text);
        }
        .footer-col ul {
          list-style: none;
        }
        .footer-col li { margin-bottom: 12px; }
        .footer-col a {
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--red); }
        .footer-bottom {
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        /* SCROLL TOP BTN */
        .scroll-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: var(--red);
          color: var(--black);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.3s;
          z-index: 1000;
        }
        .scroll-top.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .scroll-top:hover {
          background: #ef4444;
          box-shadow: 0 0 20px rgba(220,38,38,0.5);
        }
        
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-actions { flex-direction: column; }
          .hero-actions button { width: 100%; }
        }
      `}</style>

      {/* 1. NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">VICT<span>ORIS</span></div>
        <div className="nav-links">
          <a href="#features">FEATURES</a>
          <a href="#battle">ARENA</a>
          <a href="#stats">STATS</a>
        </div>
        <Link href="/login">
          <button className="nav-cta">ENTER ARENA</button>
        </Link>
      </nav>

      {/* 2. HERO */}
      <header className="hero">
        <div className="hero-bg-grid" />
        <ParticleCanvas />
        <div className="hero-content reveal">
          <h1 className="hero-title">
            THE ARENA WHERE<br />
            <span className="text-red">CODE MEETS COMBAT</span>
          </h1>
          <p className="hero-desc">
            Compete in real-time coding battles. Climb the ranks. Become a Legend.
          </p>
          <div className="hero-actions">
            <Link href="/register">
              <button className="btn-primary">START COMBAT</button>
            </Link>
            <button className="btn-secondary">VIEW LEADERBOARD</button>
          </div>
        </div>
      </header>

      {/* 3. STATS BAR */}
      <section id="stats" className="stats-bar">
        <div className="stat-item reveal">
          <StatCounter target={24000} suffix="+" />
          <div className="stat-label">Active Gladiators</div>
        </div>
        <div className="stat-item reveal" style={{ transitionDelay: "100ms" }}>
          <StatCounter target={150} suffix="K+" />
          <div className="stat-label">Battles Fought</div>
        </div>
        <div className="stat-item reveal" style={{ transitionDelay: "200ms" }}>
          <StatCounter target={3.2} suffix="M" />
          <div className="stat-label">Lines of Code</div>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section id="features" className="features">
        <div className="section-header reveal">
          <h2 className="section-title">ARSENAL OF FEATURES</h2>
          <p className="section-subtitle">Everything you need to prove your skills and climb the ladder.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card reveal">
            <div className="feature-icon">⚔️</div>
            <h3>Real-Time PvP</h3>
            <p>Go head-to-head with developers of similar skill. Both get the same problem, first to pass all test cases wins the battle.</p>
          </div>
          <div className="feature-card reveal" style={{ transitionDelay: "100ms" }}>
            <div className="feature-icon">🏆</div>
            <h3>Ranked Ladder</h3>
            <p>Start at Bronze and fight your way to Legend. Earning Victo Points unlocks exclusive frames, badges, and bragging rights.</p>
          </div>
          <div className="feature-card reveal" style={{ transitionDelay: "200ms" }}>
            <div className="feature-icon">🧠</div>
            <h3>Vast Problem Library</h3>
            <p>Thousands of algorithmic challenges spanning Graphs, Dynamic Programming, Arrays, Math, and Strings.</p>
          </div>
        </div>
      </section>

      {/* 5. BATTLE PREVIEW */}
      <section id="battle" className="battle-preview">
        <div className="battle-text reveal">
          <h2>THE BATTLE ROOM</h2>
          <p>Once you enter the arena, you are matched instantly. The editor supports 10+ languages with autocomplete disabled to test true mastery.</p>
          <ul style={{ listStyle: "none", color: "var(--text-dim)", marginTop: "24px", display: "grid", gap: "12px" }}>
            <li>✓ Built-in terminal for execution</li>
            <li>✓ Custom test cases support</li>
            <li>✓ Live opponent progress tracking</li>
          </ul>
        </div>
        <div className="battle-visual reveal" style={{ transitionDelay: "200ms" }}>
          <div className="code-window">
            <div className="code-header">
              <div className="code-dot red" />
              <div className="code-dot" />
              <div className="code-dot" />
            </div>
            <div className="code-body">
<span className="code-keyword">function</span> <span className="code-func">twoSum</span>(nums, target) {'{'}
  <span className="code-keyword">const</span> map = <span className="code-keyword">new</span> <span className="code-func">Map</span>();
  
  <span className="code-keyword">for</span> (<span className="code-keyword">let</span> i = 0; i &lt; nums.length; i++) {'{'}
    <span className="code-keyword">const</span> complement = target - nums[i];
    
    <span className="code-keyword">if</span> (map.<span className="code-func">has</span>(complement)) {'{'}
      <span className="code-keyword">return</span> [map.<span className="code-func">get</span>(complement), i];
    {'}'}
    
    map.<span className="code-func">set</span>(nums[i], i);
  {'}'}
{'}'}

<span className="code-string">// Waiting for opponent submission...</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-header reveal">
          <h2 className="section-title">CHAMPIONS SPEAK</h2>
        </div>
        <div className="test-grid">
          <div className="test-card reveal">
            <div className="test-quote">"Victoris completely changed how I practice algorithms. The adrenaline rush of a live PvP match makes standard LeetCode feel boring."</div>
            <div className="test-author">
              <div className="test-avatar" style={{ background: "linear-gradient(45deg, #a855f7, #38bdf8)" }} />
              <div>
                <div className="test-name">Alex C.</div>
                <div className="test-rank">Master Tier</div>
              </div>
            </div>
          </div>
          <div className="test-card reveal" style={{ transitionDelay: "150ms" }}>
            <div className="test-quote">"I climbed from Bronze to Platinum in two months. The ranking system is incredibly rewarding and highly competitive."</div>
            <div className="test-author">
              <div className="test-avatar" style={{ background: "linear-gradient(45deg, #e5e4e2, #94a3b8)" }} />
              <div>
                <div className="test-name">Sarah J.</div>
                <div className="test-rank">Platinum Tier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="footer">
        <div className="footer-content reveal">
          <div className="footer-col">
            <div className="nav-logo" style={{ marginBottom: 16 }}>VICT<span>ORIS</span></div>
            <p style={{ color: "var(--text-dim)", maxWidth: 250 }}>The arena where code meets combat. Prove your skills and conquer the leaderboards.</p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">Arena</a></li>
              <li><a href="#">Leaderboard</a></li>
              <li><a href="#">Challenges</a></li>
              <li><a href="#">Discuss</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Victoris. All rights reserved.
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <button 
        className={`scroll-top ${showTopBtn ? "visible" : ""}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
