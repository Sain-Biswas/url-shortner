import { eq } from "drizzle-orm";
import "server-only";

import { createTRPCRouter, protectedProcedure } from "~/server/api/index.trpc";
import { clicksSchema, linksSchema } from "~/server/database/index.schema";

export const statisticsRouter = createTRPCRouter({
  dashboardCardData: protectedProcedure.query(async ({ ctx }) => {
    const [clicks, links] = await Promise.all([
      ctx.database.query.clicksSchema.findMany({
        where: eq(clicksSchema.userId, ctx.user.id)
      }),
      ctx.database.query.linksSchema.findMany({
        where: eq(linksSchema.userId, ctx.user.id)
      })
    ]);

    const countries = new Set(clicks.map(click => click.country));

    return {
      totalClicks: clicks.length,
      totalCountry: countries.size,
      totalLinksRegistered: links.length,
      totalActiveLinks: links.filter(link => link.isActive).length
    };
  })
});
