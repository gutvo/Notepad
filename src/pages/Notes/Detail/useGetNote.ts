import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import { useCallback, useEffect, useState } from "react";

interface useGetNoteProps {
  noteId?: number;
}

export default function useGetNote({ noteId }: useGetNoteProps) {
  const [note, setNote] = useState<NoteDataProps | null>(null);

  const getNote = useCallback(async () => {
    if (!noteId) {
      setNote(null);
      return null;
    }

    const currentNote = await actions.note.find(noteId);
    setNote(currentNote);
    return currentNote;
  }, [noteId]);

  useEffect(() => {
    let isMounted = true;

    const fetchNote = async () => {
      const currentNote = await getNote();

      if (!isMounted) {
        return;
      }

      setNote(currentNote);
    };

    void fetchNote();

    return () => {
      isMounted = false;
    };
  }, [getNote]);

  return [note, setNote] as const;
}
