import actions from "@Actions";
import { useCallback, useEffect, useState } from "react";

interface useGetNoteProps {
  noteId?: number;
}

export default function useGetNote({ noteId }: useGetNoteProps) {
  const [note, setNote] = useState<NoteDataProps | null>(null);

  const getNote = useCallback(async () => {
    if (!noteId) return;

    const currentNote = await actions.note.find(noteId);

    setNote(currentNote);
  }, [noteId]);

  useEffect(() => {
    getNote();
  }, [getNote]);

  return [note, setNote] as const;
}
