import {
  foreignKey,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import noteSchema from "./notes";
import { createIdColumn, createTimestampColumn } from "./tableFactory";

const reminderSchema = sqliteTable(
  "reminders",
  {
    id: createIdColumn(),
    notification_id: text("notification_id").notNull(),
    note_id: integer("note_id")
      .notNull()
      .references(() => noteSchema.id),
    parent_id: integer("parent_id"),
    title: text("title").notNull(),
    message: text("message").notNull(),
    notificate_at: createTimestampColumn("notificate_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.parent_id],
      foreignColumns: [table.id],
    }).onDelete("cascade"),
  ],
);

export default reminderSchema;
