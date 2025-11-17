import { z } from "zod";

export const userSignupSchema = z.object({
  email: z.email({ error: "Please enter a valid email for registration." }),
  name: z
    .string()
    .min(1, { error: "Name is required to register a new user." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(128, { error: "Password can be at most 128 characters long." }),
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." })
    .max(120, { error: "Username can be at most 128 characters long." })
});

export const userSigninSchema = z.object({
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(128, { error: "Password can be at most 128 characters long." }),
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." })
    .max(120, { error: "Username can be at most 120 characters long." })
});
