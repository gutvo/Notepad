import { ScrollView, ScrollViewProps, View } from "react-native";

export default function BaseModalContainer({
  children,
  style,
  scrollable = false,
  ...rest
}: ScrollViewProps & { scrollable?: boolean }) {
  if (scrollable) {
    return (
      <ScrollView
        {...rest}
        style={{ flexGrow: 0, flexShrink: 1 }}
        contentContainerStyle={style}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}
