import { TRPCError } from "@trpc/server";
import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";
import { trpcServer } from "~/integrations/trpc/server.trpc";
import { getCountryName } from "~/lib/get-country-name";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/r/[shortID]">
) {
  const { shortID } = await ctx.params;

  try {
    const url = await trpcServer.clicks.registerClick({
      country: getCountryName(geolocation(request).country),
      ipAddress: ipAddress(request) ?? "Unavailable",
      linkId: shortID
    });

    return NextResponse.redirect(url);
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === "NOT_FOUND")
        return NextResponse.json(
          {
            message: "The requested link does't exist.",
            requestedLink: shortID
          },
          { status: 404 }
        );
    }

    return NextResponse.json(
      {
        message: "Something went wrong."
      },
      { status: 500 }
    );
  }
}
