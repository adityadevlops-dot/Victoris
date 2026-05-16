import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  const body = await request.json();

  if (!body.email || !body.password) {
    return NextResponse.json(
      { success: false, error: "Missing credentials" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      accessToken: "token_here",
    },
  });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    message: "Auth endpoint",
  });
}
