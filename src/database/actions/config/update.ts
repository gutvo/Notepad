import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { configSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import findConfig from "./find";

export default async function updateConfig(
  key: string,
  data: UpdateConfigDataProps,
) {
  await database
    .update(configSchema)
    .set(data)
    .where(eq(configSchema.key, key));

  dataEvents.emit();

  const updatedConfig = await findConfig(key);

  return updatedConfig;
}
