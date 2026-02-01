interface NoteDataProps {
  id: number;
  description: string;
  created_at: Date;
}

type CreateNoteDataProps = Omit<NoteDataProps, "id", "created_at">;

type UpdateNoteDataProps = Partial<CreateNoteDataProps>;
