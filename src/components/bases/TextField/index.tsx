import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

export default function BaseTextField({ style, ...rest }: TextInputProps) {
  const customStyle: StyleProp<TextStyle> = [{ borderRadius: 4 }, style];

  return <TextInput style={customStyle} {...rest} />;
}
