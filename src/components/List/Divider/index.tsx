import useTheme from "@Hooks/useTheme";
import { StyleProp, View, ViewStyle } from "react-native";

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ style }: DividerProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme.palette.background.divider,
          opacity: 0.2,
        },
        style,
      ]}
    />
  );
}
