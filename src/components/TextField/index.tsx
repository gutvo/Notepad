import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

export default function TextField({ style, ...rest }: TextInputProps) {
  const customStyle: StyleProp<TextStyle> = [
    {
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    style,
  ];

  return <TextInput style={customStyle} {...rest} />;
}
