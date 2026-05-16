import { NextRequest, NextResponse } from "next/server";

interface ProblemRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: ProblemRouteProps
): Promise<NextResponse> {
  const { slug } = await params;

  return NextResponse.json({
    success: true,
    data: {
      slug,
      title: "Example Problem",
    },
  });
}

export async function PUT(
  request: NextRequest,
  { params }: ProblemRouteProps
): Promise<NextResponse> {
  const { slug } = await params;
  const body = await request.json();

  return NextResponse.json({
    success: true,
    data: {
      slug,
      ...body,
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: ProblemRouteProps
): Promise<NextResponse> {
  const { slug } = await params;

  return NextResponse.json({
    success: true,
    message: `Problem ${slug} deleted`,
  });
}
