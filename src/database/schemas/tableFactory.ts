import { integer } from "drizzle-orm/sqlite-core";

export function createIdColumn(columnName = "id") {
  return integer(columnName).primaryKey({ autoIncrement: true });
}

export function createTimestampColumn(columnName = "created_at") {
  return integer(columnName, { mode: "timestamp" }).notNull();
}
