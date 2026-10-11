export type UpdateNoteProps = (
  id: number,
  data: { deleted_at: Date | null },
) => Promise<unknown>;
