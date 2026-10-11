import configSchema from "./configs";
import noteSchema from "./notes";
import reminderSchema from "./reminders";
import { createIdColumn, createTimestampColumn } from "./tableFactory";

export {
  configSchema,
  createIdColumn,
  createTimestampColumn,
  noteSchema,
  reminderSchema,
};
