import database from "@Database";
import { reminderSchema } from "@Schemas";
import { eq } from "drizzle-orm";

export default async function findReminder(id: number) {
  const [reminder] = await database
    .select()
    .from(reminderSchema)
    .where(eq(reminderSchema.id, id));

  return reminder ?? null;
}
