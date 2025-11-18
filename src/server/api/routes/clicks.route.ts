import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import "server-only";

import { createTRPCRouter, publicProcedure } from "~/server/api/index.trpc";
import { clicksSchema, linksSchema } from "~/server/database/index.schema";
import { registerClickSchema } from "~/validators/links.validator";

export const clicksRouter = createTRPCRouter({
  registerClick: publicProcedure
    .input(registerClickSchema)
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.database.query.linksSchema.findFirst({
        where: eq(linksSchema.id, input.linkId)
      });

      if (!link)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested URL is invalid."
        });

      await ctx.database.insert(clicksSchema).values({
        ...input,
        userId: link.userId
      });

      return link.originalUrl;
    })
});
