import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/r/[shortID]">
) {
  const { shortID } = await ctx.params;

  const location = geolocation(request);
  const ip = ipAddress(request) ?? "Unavailable";

  return NextResponse.json(
    {
      shortID,
      ip,
      ...location
    },
    { status: 200 }
  );
}
