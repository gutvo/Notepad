import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

export type BaseTextInputProps = TextInputProps;

export default function BaseTextInput({ style, ...rest }: BaseTextInputProps) {
  const customStyle: StyleProp<TextStyle> = [{ borderRadius: 4 }, style];

  return <TextInput style={customStyle} {...rest} />;
}
