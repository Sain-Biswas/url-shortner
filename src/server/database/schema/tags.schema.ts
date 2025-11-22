import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { linksOnTagsSchema } from "./links.schema";
import { usersSchema } from "./users.schema";

export const tagsSchema = sqliteTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" })
});

export const tagsRelation = relations(tagsSchema, ({ one, many }) => ({
  user: one(usersSchema, {
    fields: [tagsSchema.userId],
    references: [usersSchema.id]
  }),

  links: many(linksOnTagsSchema)
}));
