import { foreignKey, integer, text } from "drizzle-orm/sqlite-core";
import noteSchema from "./notes";
import { addDateColumn, createTable } from "./tableFactory";

const reminderSchema = createTable(
  "reminders",
  {
    notification_id: text("notification_id").notNull(),
    note_id: integer("note_id")
      .notNull()
      .references(() => noteSchema.id),
    parent_id: integer("parent_id"),
    title: text("title").notNull(),
    message: text("message").notNull(),
    notificate_at: addDateColumn("notificate_at"),
    deleted_at: addDateColumn("deleted_at", { nullable: true }),
  },
  (table) => [
    foreignKey({
      columns: [table.parent_id],
      foreignColumns: [table.id],
    }).onDelete("cascade"),
  ],
);

export default reminderSchema;
