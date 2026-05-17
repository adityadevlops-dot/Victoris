'use client'

import { useState, useCallback, memo, type FormEvent } from 'react'
import Link from 'next/link'

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class LoginErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#dc2626' }}>
          <h2>Authentication Error</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
        </div>
      )
    }

    return this.props.children
  }
}

// ─── LOADING SKELETON ──────────────────────────────────────────────────────────

const LoginSkeleton = memo(function LoginSkeleton() {
  return (
    <div className="w-full max-w-[420px] bg-[#0a0a0a] border border-[#1a1a1a] p-10 space-y-6 animate-pulse">
      <div className="h-12 bg-[#1a1a1a] rounded" />
      <div className="h-4 bg-[#1a1a1a] rounded w-3/4" />
      <div className="space-y-3">
        <div className="h-10 bg-[#1a1a1a] rounded" />
        <div className="h-10 bg-[#1a1a1a] rounded" />
      </div>
      <div className="h-12 bg-[#dc2626] rounded opacity-50" />
    </div>
  )
})

// ─── LOGIN FORM ──────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string
  password: string
  isLoading: boolean
  error: string | null
}

const LoginForm = memo(function LoginForm() {
  const [state, setState] = useState<LoginFormState>({
    email: '',
    password: '',
    isLoading: false,
    error: null,
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        if (!state.email || !state.password) {
          throw new Error('Email and password are required')
        }

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Login failed')
        }

        // Simulate realistic delay
        await new Promise(resolve => setTimeout(resolve, 800))
        window.location.href = '/onboarding'
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An error occurred',
        }))
      } finally {
        setState(prev => ({ ...prev, isLoading: false }))
      }
    },
    [state.email, state.password]
  )

  if (state.isLoading) {
    return <LoginSkeleton />
  }

  return (
    <LoginErrorBoundary>
      <div
        className="w-full max-w-[420px] bg-[#0a0a0a] border border-[#1a1a1a] p-10 relative shadow-[0_0_40px_rgba(220,38,38,0.05)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(220,38,38,0.1)] hover:border-[#dc2626]/30"
        style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .input-focus-ring:focus-within {
            box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
          }
        `}</style>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-80" />

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-['Orbitron'] font-bold text-3xl text-[#fafafa] tracking-widest mb-3 uppercase">
            Enter Arena
          </h2>
          <p className="font-['Rajdhani'] text-[#a1a1aa] text-lg font-medium">
            Authenticate to resume your rank climb.
          </p>
        </div>

        {/* Error message */}
        {state.error && (
          <div className="mb-6 p-3 bg-[#7f1d1d]/20 border border-[#dc2626]/40 rounded text-[#dc2626] text-sm">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="font-['Rajdhani'] font-bold text-[#fafafa] text-sm uppercase tracking-[0.15em]">
              Email
            </label>
            <input
              type="email"
              required
              disabled={state.isLoading}
              value={state.email}
              onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-[#111111] border border-[#1a1a1a] text-[#fafafa] px-5 py-4 font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-[#dc2626] transition-all rounded disabled:opacity-50"
              placeholder="name@victoris.com"
              aria-label="Email address"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-['Rajdhani'] font-bold text-[#fafafa] text-sm uppercase tracking-[0.15em]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="font-['Rajdhani'] text-[#a1a1aa] hover:text-[#dc2626] text-sm transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={state.isLoading}
                value={state.password}
                onChange={e => setState(prev => ({ ...prev, password: e.target.value }))}
                className="w-full bg-[#111111] border border-[#1a1a1a] text-[#fafafa] px-5 py-4 font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-[#dc2626] transition-all rounded disabled:opacity-50 pr-12"
                placeholder="••••••••••••"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#dc2626] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={state.isLoading}
            className="mt-6 w-full bg-[#dc2626] hover:bg-[#ef4444] text-[#000000] font-['Orbitron'] font-black py-4 uppercase tracking-[0.25em] text-sm rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          >
            {state.isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⟳</span>
                Authenticating...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center border-t border-[#1a1a1a] pt-8">
          <p className="font-['Rajdhani'] text-[#a1a1aa] text-sm">
            New to Victoris?{' '}
            <Link
              href="/register"
              className="text-[#dc2626] hover:text-[#ef4444] font-bold transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </LoginErrorBoundary>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
