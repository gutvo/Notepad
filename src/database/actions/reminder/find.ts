import database from "@Database";
import { reminderSchema } from "@Schemas";
import { eq } from "drizzle-orm";

export default async function findReminder(id: number) {
  const [reminder] = await database
    .select()
    .from(reminderSchema)
    .where(eq(reminderSchema.id, id));

  if (!reminder) return null;

  async function getChildren() {
    const children = await database
      .select()
      .from(reminderSchema)
      .where(eq(reminderSchema.parent_id, id));

    // Você pode opcionalmente adicionar a mesma função recursivamente para os filhos
    return children.map((child) => ({
      ...child,
      getChildren: async () => {
        const grandChildren = await database
          .select()
          .from(reminderSchema)
          .where(eq(reminderSchema.parent_id, child.id));

        return grandChildren.map((gc) => ({
          ...gc,
          getChildren: async () => [], // você pode recursivamente repetir
        }));
      },
    }));
  }

  return { ...reminder, getChildren };
}
