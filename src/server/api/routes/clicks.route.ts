import "server-only";

import { createTRPCRouter, publicProcedure } from "~/server/api/index.trpc";

export const clicksRouter = createTRPCRouter({
  registerClick: publicProcedure.input().mutation()
});
