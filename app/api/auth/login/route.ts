import { NextRequest, NextResponse } from 'next/server'
import { AppError, handleApiError, validateEmail, validatePassword } from '@/lib/utils'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface LoginRequest {
  email: string
  password: string
}

// ─── VALIDATION ────────────────────────────────────────────────────────────────

function validateLoginInput(data: unknown): LoginRequest {
  if (!data || typeof data !== 'object') {
    throw new AppError('VALIDATION_ERROR', 'Invalid request body', 400)
  }

  const { email, password } = data as Record<string, unknown>

  if (!email || typeof email !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'Email is required and must be a string', 400)
  }

  if (!validateEmail(email)) {
    throw new AppError('VALIDATION_ERROR', 'Invalid email format', 400)
  }

  if (!password || typeof password !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'Password is required and must be a string', 400)
  }

  return { email: email.toLowerCase(), password }
}

// ─── HANDLER ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json()
    const { email, password } = validateLoginInput(body)

    // TODO: Replace with actual authentication logic
    // 1. Query user from database
    // 2. Verify password hash
    // 3. Generate JWT token
    // 4. Set secure HTTP-only cookie

    // Placeholder: Simulate database lookup
    if (email === 'demo@victoris.com' && password === 'Password123') {
      const token = 'mock-jwt-token-' + Date.now()

      const response = NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          token,
          user: {
            id: 'user-1',
            email,
            username: 'gladiator',
          },
        },
        { status: 200 }
      )

      // Set secure cookie
      response.cookies.set({
        name: 'auth-token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    }

    // Invalid credentials
    throw new AppError(
      'INVALID_CREDENTIALS',
      'Invalid email or password',
      401
    )
  } catch (error) {
    const { message, code, statusCode } = handleApiError(error)

    return NextResponse.json(
      {
        success: false,
        error: {
          message,
          code,
        },
      },
      { status: statusCode }
    )
  }
}

// ─── OPTIONS (CORS) ────────────────────────────────────────────────────────────

export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
