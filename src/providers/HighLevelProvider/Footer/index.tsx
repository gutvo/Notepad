import useTheme from "@Hooks/useTheme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={{
        height: insets.bottom,
        backgroundColor: theme.palette.common.black,
      }}
    />
  );
}
