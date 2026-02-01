interface NoteDataProps {
  id: number;
  description: string;
  created_at: Date;
}

interface CreateNoteDataProps {
  description: string;
}

type UpdateNoteDataProps = Partial<CreateNoteDataProps>;
