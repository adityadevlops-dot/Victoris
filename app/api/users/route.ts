import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    data: [],
  });
}

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    data: body,
  });
}
