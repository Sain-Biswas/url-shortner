import "server-only";

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/index.trpc";
import {
  linksOnTagsSchema,
  linksSchema,
  tagsSchema
} from "~/server/database/index.schema";
import {
  newQuickLinkSchema,
  newTagsSchema
} from "~/validators/links.validator";

export const linksRouter = createTRPCRouter({
  createNewTag: protectedProcedure
    .input(newTagsSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.database.insert(tagsSchema).values({
        name: input.name,
        userId: ctx.user.id
      });
    }),

  getUserTags: protectedProcedure.query(async ({ ctx }) => {
    const tags = await ctx.database.query.tagsSchema.findMany({
      where: eq(tagsSchema.userId, ctx.user.id),
      columns: {
        id: true,
        name: true
      }
    });

    return tags;
  }),

  createNewLink: protectedProcedure
    .input(newQuickLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const existingLink = await ctx.database.query.linksSchema.findFirst({
        where: eq(linksSchema.id, input.id)
      });

      if (existingLink) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "The short id is already taken."
        });
      }

      await ctx.database.transaction(async tx => {
        const link = await tx
          .insert(linksSchema)
          .values({
            originalUrl: input.originalURL,
            expiresOn: input.doesExpire ? input.expiresOn : null,
            userId: ctx.user.id,
            id: input.id,
            description: input.description
          })
          .returning();

        await tx.insert(linksOnTagsSchema).values(
          input.tags.map(tagId => ({
            linksId: link.at(0)?.id ?? "",
            tagId
          }))
        );
      });
    }),

  isNanoidAvailable: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const existing = await ctx.database.query.linksSchema.findFirst({
        where: eq(linksSchema.id, input)
      });

      return !existing;
    })
});
