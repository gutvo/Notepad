import useTheme from "@Hooks/useTheme";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface BaseButtonProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
}

export default function BaseButton({
  textStyle,
  style,
  children,
  ...rest
}: BaseButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 4,
          padding: theme.spacing(2),
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          { textAlign: "center", color: theme.palette.primary.contrast },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
