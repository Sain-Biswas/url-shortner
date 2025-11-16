import { geolocation } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(request: NextRequest, ctx: RouteContext<"/r/[shortID]">){
  const { shortID } = await ctx.params;

  const location = geolocation(request);

  return NextResponse.json({
    shortID,
    ...location
  }, {status: 200})
}
