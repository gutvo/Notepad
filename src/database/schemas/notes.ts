import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const noteSchema = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});

export default noteSchema;
