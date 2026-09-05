import AsyncLoadModal from "@Components/modals/AsyncLoadModal";
import RemindersDetail from "@Pages/Reminders/Detail";
import { useLocalSearchParams } from "expo-router";

export default function RemindersDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return <AsyncLoadModal />;

  const formattedId = Number(id);

  return <RemindersDetail id={formattedId} />;
}
