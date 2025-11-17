import "server-only";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/index.trpc";
import { auth } from "~/server/authentication/server.auth";
import {
  userSigninSchema,
  userSignupSchema
} from "~/validators/authentication.validator";

export const authenticationRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => ctx.user),

  getCurrentSession: protectedProcedure.query(({ ctx }) => ctx.session),

  userSignup: publicProcedure
    .input(userSignupSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await auth.api.signUpEmail({
        body: {
          ...input
        },
        headers: ctx.headers
      });

      return data;
    }),

  userSignin: publicProcedure
    .input(userSigninSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await auth.api.signInUsername({
        headers: ctx.headers,
        body: {
          username: input.username,
          password: input.password
        }
      });

      return data;
    }),

  userSignout: protectedProcedure.mutation(async ({ ctx }) => {
    await auth.api.signOut({
      headers: ctx.headers
    });
  })
});
