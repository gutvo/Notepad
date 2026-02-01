import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { configSchema } from "@Schemas";
import { eq } from "drizzle-orm";

export default async function deleteConfig(key: ConfigKeyProps) {
  await database.delete(configSchema).where(eq(configSchema.key, key));

  dataEvents.emit();
}
