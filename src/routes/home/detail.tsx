import HomeDetail from "@Pages/Home/Detail";
import { useLocalSearchParams } from "expo-router";

export default function HomeDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <HomeDetail noteId={id ? Number(id) : undefined} />;
}
