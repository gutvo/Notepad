import database from "@Database";
import { configSchema } from "@Schemas";
import { and, inArray } from "drizzle-orm";
import _formatConfigData from "./_formatData";

export default async function listConfigs<
  TKeys extends ConfigKeyProps = ConfigKeyProps,
>({
  findBy,
}: {
  findBy?: {
    keys?: readonly TKeys[];
  };
} = {}): Promise<
  {
    [K in TKeys]: Extract<ConfigDataProps, { key: K }>;
  }[TKeys][]
> {
  const conditions = [];

  if (findBy?.keys?.length) {
    conditions.push(inArray(configSchema.key, findBy.keys));
  }

  const query = database.select().from(configSchema);

  if (conditions.length) {
    query.where(and(...conditions));
  }

  const data = await query;

  const formattedData = data.map((item) => _formatConfigData(item)) as any;

  return formattedData;
}
