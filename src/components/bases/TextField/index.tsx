import useTheme from "@Hooks/useTheme";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

export default function BaseTextField({ style, ...rest }: TextInputProps) {
  const theme = useTheme();

  const customStyle: StyleProp<TextStyle> = [
    {
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 4,
      paddingHorizontal: theme.spacing(2),
    },
    style,
  ];

  return <TextInput style={customStyle} {...rest} />;
}
