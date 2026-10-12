import configSchema from "./configs";
import noteSchema from "./notes";
import reminderSchema from "./reminders";
import { addDateColumn, createIdColumn, createTable } from "./tableFactory";

export {
  addDateColumn,
  configSchema,
  createIdColumn,
  createTable,
  noteSchema,
  reminderSchema,
};
