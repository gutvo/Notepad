import { text } from "drizzle-orm/sqlite-core";
import { addDateColumn, createTable } from "./tableFactory";

const noteSchema = createTable("notes", {
  description: text("description").notNull(),
  created_at: addDateColumn("created_at"),
  deleted_at: addDateColumn("deleted_at", { nullable: true }),
});

export default noteSchema;
