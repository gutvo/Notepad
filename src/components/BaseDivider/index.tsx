import useTheme from "@Hooks/useTheme";
import { StyleProp, View, ViewStyle } from "react-native";

interface BaseDividerProps {
  style?: StyleProp<ViewStyle>;
  orientation?: "horizontal" | "vertical"; // Nova prop
  thickness?: number; // Espessura opcional
}

export default function BaseDivider({
  style,
  orientation = "horizontal",
  thickness = 1,
}: BaseDividerProps) {
  const theme = useTheme();

  const dividerStyle: ViewStyle =
    orientation === "horizontal"
      ? { height: thickness, width: "100%" }
      : { width: thickness, height: "100%" };

  return (
    <View
      style={[
        dividerStyle,
        { backgroundColor: theme.palette.background.divider, opacity: 0.2 },
        style,
      ]}
    />
  );
}
