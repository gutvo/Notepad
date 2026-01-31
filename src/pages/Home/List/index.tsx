import List from "@Components/List";
import useNavigation from "@Hooks/useNavigation";
import { Dimensions, ScrollView } from "react-native";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeList() {
  const navigation = useNavigation();
  const { search } = useHeader();

  const date = new Date();

  const notes: ListItemDataProps[] = [
    { id: "1", description: "teste1", created_at: date },
    { id: "2", description: "teste", created_at: date },
    { id: "2", description: "teste", created_at: date },
  ].filter(
    (note) =>
      !search.length ||
      note.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView style={{ height: windowHeight }}>
      <List
        data={notes}
        onClick={(item) => {
          navigation.navigate("HomeDetail", { id: item.id });
        }}
      />
    </ScrollView>
  );
}
