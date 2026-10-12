import NotesDetail from "@Pages/Notes/Detail";
import { useLocalSearchParams } from "expo-router";

export default function NotesDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <NotesDetail noteId={id ? Number(id) : undefined} />;
}
