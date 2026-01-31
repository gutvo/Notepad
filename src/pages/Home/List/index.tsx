import List from "@Components/List";
import { Dimensions, ScrollView } from "react-native";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeList() {
  const { search } = useHeader();

  const date = new Date();

  const notes: ListItemDataProps[] = [
    { name: "teste1", created_at: date },
    { name: "teste", created_at: date },
    { name: "teste", created_at: date },
    {
      name: "frase bem grande asadwadasdawad sa asdawewdawa dawas da asdasd asd",
      created_at: date,
    },
    { name: "teste", created_at: date },
  ].filter(
    (note) =>
      !search.length || note.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView style={{ height: windowHeight }}>
      <List
        data={notes}
        onClick={(item) => {
          console.log(item);
        }}
      />
    </ScrollView>
  );
}
