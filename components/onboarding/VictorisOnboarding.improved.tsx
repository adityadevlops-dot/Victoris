'use client'

import { useState, useEffect, useCallback, useRef, memo, type ReactNode } from 'react'
import styles from './VictorisOnboarding.module.css'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type OnboardingPhase = 'intro' | 'oris' | 'done'

interface Dialogue {
  id: number
  line: string
  sub: string
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const DIALOGUES: Dialogue[] = [
  { id: 1, line: 'Welcome to Victoris.', sub: 'The arena where code meets combat.' },
  { id: 2, line: 'Every solution earns Victo Points.', sub: 'Points define your rank. Rank defines your legend.' },
  { id: 3, line: 'The Arena holds thousands of challenges.', sub: 'Arrays. Graphs. Dynamic Programming. Every domain. Every difficulty.' },
  { id: 4, line: 'Battle Rooms are where champions are made.', sub: 'Real-time. Same problem. First correct solution wins.' },
  { id: 5, line: 'Bronze. Silver. Gold. Platinum. Diamond. Master. Legend.', sub: 'Seven ranks. One path. Yours to climb.' },
  { id: 6, line: 'The arena is ready.', sub: 'Enter. Compete. Conquer.' },
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

function useTypewriter(text: string, speed = 38, active = true) {
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

  return {
    displayed,
    done,
    skip: useCallback(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setDisplayed(text)
      setDone(true)
    }, [text]),
  }
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

// ─── CINEMATIC INTRO ──────────────────────────────────────────────────────────

const CinematicIntro = memo(function CinematicIntro({ onComplete }: { onComplete: () => void }): ReactNode {
  const [logoVisible, setLogoVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), ANIMATION_TIMINGS.introStart)
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + (100 / 40), 100))
    }, 105)

    const t2 = setTimeout(onComplete, ANIMATION_TIMINGS.introComplete)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <div className={styles['cinematic-intro']}>
      <div className={styles['noise-overlay']} />
      <div className={styles['grid-bg']} />
      <div className={styles['corner-tl']} />
      <div className={styles['corner-tr']} />
      <div className={styles['corner-bl']} />
      <div className={styles['corner-br']} />

      <GlitchLogo visible={logoVisible} />

      <button
        onClick={onComplete}
        className={styles['skip-button']}
        aria-label="Skip intro"
      >
        SKIP
      </button>

      <div className={styles['progress-bar']} style={{ width: `${Math.min(progress, 100)}%` }} />
    </div>
  )
})

// ─── ORIS AVATAR ──────────────────────────────────────────────────────────────

const OrisAvatar = memo(function OrisAvatar(): ReactNode {
  return (
    <div className={styles['oris-container']}>
      <div className={styles['oris-float']}>
        <div className={styles['oris-glow']}>
          <div className={styles['oris-scan']} />
          <div className={styles['avatar-placeholder']}>
            <div className={styles['avatar-circle']}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="14" r="7" stroke="#dc2626" strokeWidth="1.5" />
                <path
                  d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles['avatar-text']}>
              <div className={styles['avatar-label']}>ORIS</div>
              <div className={styles['avatar-hint']}>DROP IMAGE → /assets/oris.png</div>
            </div>
          </div>
        </div>

        {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
          <div key={pos} className={`${styles['corner-bracket']} ${styles[`corner-${pos}`]}`} />
        ))}
      </div>

      <div className={styles['avatar-guide']}>A.I. ARENA GUIDE</div>
    </div>
  )
})

// ─── ORIS ONBOARDING ──────────────────────────────────────────────────────────

const OrisOnboarding = memo(function OrisOnboarding({ onComplete }: { onComplete: () => void }): ReactNode {
  const [step, setStep] = useState(0)
  const [entering, setEntering] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const dialogue = DIALOGUES[step]
  const { displayed, done, skip: skipType } = useTypewriter(dialogue.line, 40, !transitioning)

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), ANIMATION_TIMINGS.orisStart)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = useCallback(() => {
    if (!done) {
      skipType()
      return
    }
    if (step >= DIALOGUES.length - 1) {
      onComplete()
      return
    }
    setTransitioning(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setTransitioning(false)
    }, ANIMATION_TIMINGS.transitionDuration)
  }, [done, skipType, step, onComplete])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNext])

  const progress = ((step + 1) / DIALOGUES.length) * 100

  return (
    <div className={styles['oris-onboarding']} style={{ opacity: entering ? 0 : 1 }}>
      <div className={styles['dialogue-panel']}>
        {/* Step indicator */}
        <div className={styles['step-indicator']}>
          {DIALOGUES.map((_, i) => (
            <div
              key={i}
              className={styles['step-dot']}
              style={{
                background: i < step ? '#7f1d1d' : i === step ? '#dc2626' : 'rgba(255,255,255,0.1)',
                boxShadow: i === step ? '0 0 8px rgba(220,38,38,0.6)' : 'none',
                width: i === step ? 24 : 6,
                borderRadius: i === step ? 3 : '50%',
              }}
            />
          ))}
          <span className={styles['step-counter']}>
            {step + 1} / {DIALOGUES.length}
          </span>
        </div>

        {/* Dialogue content */}
        <div className={styles['dialogue-content']} style={{ opacity: transitioning ? 0 : 1 }}>
          <div className={styles['oris-label']}>ORIS // {String(step + 1).padStart(2, '0')}</div>

          <div className={styles['dialogue-text']} key={step}>
            {displayed}
            {!done && <span className={styles['cursor']} />}
          </div>

          {done && <div className={styles['dialogue-sub']}>{dialogue.sub}</div>}

          {/* Rank ladder */}
          {step === 4 && done && (
            <div className={styles['rank-ladder']}>
              {RANK_SEQUENCE.map((r, i) => (
                <div
                  key={r}
                  className={styles['rank-item']}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    borderColor: RANK_COLORS[i] + '40',
                    color: RANK_COLORS[i],
                    background: RANK_COLORS[i] + '10',
                  }}
                >
                  {r.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA row */}
        <div className={styles['cta-row']}>
          <button className={styles['next-button']} onClick={handleNext}>
            {!done
              ? 'REVEAL'
              : step >= DIALOGUES.length - 1
              ? 'ENTER ARENA →'
              : 'NEXT →'}
          </button>
          <button className={styles['skip-button-inline']} onClick={onComplete}>
            SKIP ALL
          </button>
          <span className={styles['keyboard-hint']}>SPACE / → to advance</span>
        </div>
      </div>

      {/* Oris Avatar */}
      <div className={styles['avatar-section']}>
        <OrisAvatar />
      </div>

      {/* Bottom progress bar */}
      <div className={styles['bottom-progress']}>
        <div className={styles['progress-fill']} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
})

// ─── ARENA ENTRY ──────────────────────────────────────────────────────────────

const ArenaEntry = memo(function ArenaEntry(): ReactNode {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles['arena-entry']} style={{ opacity }}>
      <div className={styles['arena-ring']} style={{ animationDelay: '0s' }} />
      <div className={styles['arena-ring']} style={{ animationDelay: '0.5s' }} />
      <div className={styles['arena-ring']} style={{ animationDelay: '1s' }} />
      <div className={styles['arena-content']}>
        <div className={styles['arena-label']}>ARENA UNLOCKED</div>
        <div className={styles['arena-heading']}>
          WELCOME,
          <br />
          <span className={styles['arena-highlight']}>CHAMPION</span>
        </div>
        <div className={styles['arena-loading']}>Loading your dashboard...</div>
      </div>
    </div>
  )
})

// ─── ROOT COMPONENT ──────────────────────────────────────────────────────────

export default function VictorisOnboarding(): ReactNode {
  const [phase, setPhase] = useState<OnboardingPhase>(() => {
    if (typeof window === 'undefined') return 'intro'
    try {
      const seen = localStorage.getItem(LS_KEY)
      return seen ? 'done' : 'intro'
    } catch {
      return 'intro'
    }
  })

  const goToOris = useCallback(() => setPhase('oris'), [])
  const goToArena = useCallback(() => {
    try {
      localStorage.setItem(LS_KEY, 'true')
    } catch (e) {
      console.warn('Could not save onboarding state:', e)
    }
    setPhase('done')
  }, [])

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(LS_KEY)
    } catch (e) {
      console.warn('Could not reset onboarding state:', e)
    }
    setPhase('intro')
  }, [])

  return (
    <div className={styles['root']}>
      {phase === 'intro' && <CinematicIntro onComplete={goToOris} />}
      {phase === 'oris' && <OrisOnboarding onComplete={goToArena} />}
      {phase === 'done' && <ArenaEntry />}

      {phase === 'done' && (
        <button className={styles['replay-button']} onClick={resetDemo} aria-label="Replay intro">
          ↺ REPLAY INTRO
        </button>
      )}
    </div>
  )
}
