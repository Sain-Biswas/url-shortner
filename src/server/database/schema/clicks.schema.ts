import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { linksSchema } from "./links.schema";
import { usersSchema } from "./users.schema";

export const clicksSchema = sqliteTable("clicks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  ipAddress: text("ip_address").notNull(),
  country: text("country").notNull(),
  linkId: text("link_id")
    .notNull()
    .references(() => linksSchema.id, { onDelete: "cascade" })
});

export const clicksRelation = relations(clicksSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [clicksSchema.userId],
    references: [usersSchema.id]
  }),

  link: one(linksSchema, {
    fields: [clicksSchema.linkId],
    references: [linksSchema.id]
  })
}));
