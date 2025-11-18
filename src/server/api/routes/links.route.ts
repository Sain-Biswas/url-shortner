import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/index.trpc";
import { tagsSchema } from "~/server/database/index.schema";
import { newTagsSchema } from "~/validators/links.validator";

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
  })
});
