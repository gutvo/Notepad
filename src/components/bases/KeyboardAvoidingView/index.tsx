import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";

type BaseKeyboardAvoidingViewProps = KeyboardAvoidingViewProps;

export default function BaseKeyboardAvoidingView({
  children,
  ...rest
}: BaseKeyboardAvoidingViewProps) {
  const behavior =
    rest.behavior ?? (Platform.OS === "ios" ? "padding" : "height");

  return (
    <KeyboardAvoidingView {...rest} behavior={behavior}>
      {children}
    </KeyboardAvoidingView>
  );
}
