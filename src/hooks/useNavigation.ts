import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation as useExpoNavigation } from "expo-router";
import { RootStackParamList } from "../routes";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const useNavigation = () => useExpoNavigation<NavigationProps>();

export default useNavigation;

// export default function useNavigation<
//   PageName extends keyof RootStackParamList,
// >() {
//   type NavigationProps = NativeStackNavigationProp<
//     RootStackParamList,
//     PageName
//   >;

//   return useExpoNavigation<NavigationProps>();
// }
