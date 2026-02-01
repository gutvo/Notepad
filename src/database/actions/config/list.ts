import database from "@Database";
import { configSchema } from "@Schemas";
import { and, inArray } from "drizzle-orm";
import _formatConfigData from "./_formatData";

interface ListConfigsProps {
  findBy?: {
    keys?: ConfigKeyProps[];
  };
}

export default async function listConfigs({ findBy }: ListConfigsProps = {}) {
  const conditions = [];

  if (findBy?.keys?.length) {
    conditions.push(inArray(configSchema.key, findBy.keys));
  }

  const query = database.select().from(configSchema);

  if (conditions.length) {
    query.where(and(...conditions));
  }

  const data = await query;

  const formattedData = data.map((item) => _formatConfigData(item));

  return formattedData;
}
