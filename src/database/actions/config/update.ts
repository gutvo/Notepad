import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { configSchema } from "@Schemas";
import { eq } from "drizzle-orm";
import findConfig from "./find";

export default async function updateConfig(
  key: ConfigKeyProps,
  data: UpdateConfigDataProps,
) {
  const formattedData = {
    ...data,
    value: data.value !== undefined ? String(data.value) : undefined,
  };

  await database
    .update(configSchema)
    .set(formattedData)
    .where(eq(configSchema.key, key));

  dataEvents.emit();

  const updatedConfig = await findConfig(key);

  return updatedConfig;
}
