import colors from "@Colors";
import HomeList from "@Pages/Home/List";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: colors.primary.main } }}
    >
      <Stack.Screen name="HomeList" component={HomeList} />
    </Stack.Navigator>
  );
}
