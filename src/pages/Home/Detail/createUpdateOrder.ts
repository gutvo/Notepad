import actions from "src/database/actions";

interface CreateUpdateOrderProps {
  id?: number;
  description: string;
}

export default async function createUpdateOrder({
  id,
  description,
}: CreateUpdateOrderProps) {
  const data = { description };

  if (id) {
    const updated = await actions.note.update(id, data);
    return updated;
  }

  const createdNote = await actions.note.create(data);
  return createdNote;
}
