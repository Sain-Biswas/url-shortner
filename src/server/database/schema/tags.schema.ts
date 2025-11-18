import { sqliteTable, text } from "drizzle-orm/sqlite-core";
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
