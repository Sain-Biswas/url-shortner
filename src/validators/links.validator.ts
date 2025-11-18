import { z } from "zod";

export const newTagsSchema = z.object({
  name: z.string().min(1, { error: "A name is needed to create a tag." })
});

export const newQuickLinkSchema = z.object({
  originalURL: z.url({
    error: "A valid URL must be provided for redirecting."
  }),
  description: z.string().min(1, { error: "A short description is needed." }),
  id: z
    .string()
    .min(1, { error: "A short link is needed to map original URL." }),
  tags: z.array(z.string()),
  expiresOn: z.date(),
  doesExpire: z.boolean()
});
