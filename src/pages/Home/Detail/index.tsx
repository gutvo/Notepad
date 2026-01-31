import useGlobalSearchParams from "@Hooks/useGlobalSearchParams";
import { Dimensions, ScrollView, Text } from "react-native";
import useHeader from "./useHeader";

const windowHeight = Dimensions.get("window").height;

export default function HomeDetail() {
  useHeader();

  const params = useGlobalSearchParams("HomeDetail");

  return (
    <ScrollView style={{ height: windowHeight, padding: 10 }}>
      <Text>{params.id}</Text>
    </ScrollView>
  );
}
