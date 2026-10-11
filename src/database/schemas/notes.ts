import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createIdColumn, createTimestampColumn } from "./tableFactory";

const noteSchema = sqliteTable("notes", {
  id: createIdColumn(),
  description: text("description").notNull(),
  created_at: createTimestampColumn(),
});

export default noteSchema;
