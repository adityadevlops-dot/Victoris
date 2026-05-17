'use client'

import { Component, type ReactNode } from 'react'

// ─── ERROR BOUNDARY COMPONENT ──────────────────────────────────────────────────

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset)
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
          <div className="max-w-md w-full bg-[#111111] border border-[#1a1a1a] rounded p-6">
            <h1 className="text-2xl font-bold text-[#dc2626] mb-2">Something went wrong</h1>
            <p className="text-[#a1a1aa] mb-4 text-sm font-mono break-words">
              {this.state.error.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={this.reset}
                className="flex-1 bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
