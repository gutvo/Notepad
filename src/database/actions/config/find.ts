import database from "@Database";
import { configSchema } from "@Schemas";

import { eq } from "drizzle-orm";
import _formatConfigData from "./_formatData";

export default async function findConfig<TKey extends ConfigKeyProps>(
  key: TKey,
): Promise<Extract<ConfigDataProps, { key: TKey }> | null> {
  const [config] = await database
    .select()
    .from(configSchema)
    .where(eq(configSchema.key, key));

  if (!config) return null;

  return _formatConfigData(config) as Extract<ConfigDataProps, { key: TKey }>;
}
