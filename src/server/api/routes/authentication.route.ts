import "server-only";

import { createTRPCRouter, protectedProcedure } from "~/server/api/index.trpc";

export const authenticationRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => ctx.user),

  getCurrentSession: protectedProcedure.query(({ ctx }) => ctx.session)
});
