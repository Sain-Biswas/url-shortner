import "server-only";

import { createTRPCRouter, publicProcedure } from "../index.trpc";

export const indexRouter = createTRPCRouter({
  isWorking: publicProcedure.query(() => {
    return {
      success: true,
      message: "The server is up and running"
    };
  }),

  isAuthenticated: publicProcedure.query(({ ctx }) => ({
    isAuthenticated: !!ctx.session?.user,
    success: true
  }))
});
