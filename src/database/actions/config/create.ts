import database from "@Database";
import { dataEvents } from "@Lib/dataEvents";
import { configSchema } from "@Schemas";
import findConfig from "./find";

export default async function createConfig(data: CreateConfigDataProps) {
  await database.insert(configSchema).values(data);

  dataEvents.emit();

  const createdConfig = await findConfig(data.key);

  return createdConfig;
}
