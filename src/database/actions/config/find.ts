import database from "@Database";
import { configSchema } from "@Schemas";

import { eq } from "drizzle-orm";
import _formatConfigData from "./_formatData";

export default async function findConfig(key: string) {
  const [config] = await database
    .select()
    .from(configSchema)
    .where(eq(configSchema.key, key));

  return _formatConfigData(config) ?? null;
}
