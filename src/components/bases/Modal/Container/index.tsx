import { View, ViewProps } from "react-native";

export default function BaseModalContainer({
  children,
  style,
  ...rest
}: ViewProps) {
  return (
    <View style={[{ flex: 1 }, style]} {...rest}>
      {children}
    </View>
  );
}
