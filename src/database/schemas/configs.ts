import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const configSchema = sqliteTable("configs", {
  key: text("key").$type<ConfigKeyProps>().primaryKey(),
  type: text("type").$type<ConfigTypeProps>().notNull(),
  value: text("value").notNull(),
});

export default configSchema;
