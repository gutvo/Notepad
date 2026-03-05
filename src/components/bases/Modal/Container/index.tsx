import { ScrollViewProps, View } from "react-native";

export default function BaseModalContainer({
  children,
  style,
  ...rest
}: ScrollViewProps) {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}
