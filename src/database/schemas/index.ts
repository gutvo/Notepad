import configSchema from "./configs";
import noteSchema from "./notes";
import reminderSchema from "./reminders";
import {
  addCreatedAt,
  addUpdatedAt,
  createIdColumn,
  createTable,
  createTimestampColumn,
  createUpdatedAtColumn,
} from "./tableFactory";

export {
  addCreatedAt,
  addUpdatedAt,
  configSchema,
  createIdColumn,
  createTable,
  createTimestampColumn,
  createUpdatedAtColumn,
  noteSchema,
  reminderSchema,
};
