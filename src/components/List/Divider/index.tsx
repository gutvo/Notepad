import { StyleProp, View, ViewStyle } from "react-native";

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ style }: DividerProps) {
  return (
    <View
      style={[{ height: 1, backgroundColor: "black", opacity: 0.2 }, style]}
    />
  );
}
