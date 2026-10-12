import { text } from "drizzle-orm/sqlite-core";
import { createTable } from "./tableFactory";

const configSchema = createTable("configs", {
  key: text("key").$type<ConfigKeyProps>().notNull().unique(),
  type: text("type").$type<ConfigTypeProps>().notNull(),
  value: text("value").notNull(),
});

export default configSchema;
