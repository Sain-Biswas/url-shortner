import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tagsSchema } from "./tags.schema";
import { usersSchema } from "./users.schema";

export const linksSchema = sqliteTable("links", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  originalUrl: text("original_url").notNull(),
  description: text("description"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  expiresOn: integer("expires_on", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const linksOnTagsSchema = sqliteTable("links_on_tags", {
  linksId: text("links_id")
    .notNull()
    .references(() => linksSchema.id, { onDelete: "cascade" }),
  tagId: text("tag_id")
    .notNull()
    .references(() => tagsSchema.id, { onDelete: "cascade" })
});
