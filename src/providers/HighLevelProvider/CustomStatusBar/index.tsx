import useTheme from "@Hooks/useTheme";
import { StatusBar } from "react-native";

export default function CustomStatusBar() {
  const theme = useTheme();

  return <StatusBar barStyle={theme.palette.statusBar} />;
}
