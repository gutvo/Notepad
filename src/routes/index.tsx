import colors from "@Colors";

import HomeDetail from "@Pages/Home/Detail";
import HomeList from "@Pages/Home/List";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Remote debugger"]);

export type RootStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: string } | undefined;
};

export type PageNames = keyof RootStackParamList;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary.main },
      }}
    >
      <Stack.Screen name="HomeList" component={HomeList} />
      <Stack.Screen name="HomeDetail" component={HomeDetail} />
    </Stack.Navigator>
  );
}
