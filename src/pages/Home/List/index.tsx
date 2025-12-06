import List from "@Components/List";
import { Dimensions, ScrollView } from "react-native";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function Index() {
  useHeader();

  const notes: ListItemDataProps[] = [
    { name: "teste1" },
    { name: "teste" },
    { name: "teste" },
    {
      name: "frase bem grande asadwadasdawad sa asdawewdawa dawas da asdasd asd",
    },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
  ];

  return (
    <ScrollView style={{ height: windowHeight }}>
      <List data={notes} />
    </ScrollView>
  );
}
