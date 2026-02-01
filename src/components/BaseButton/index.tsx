import colors from "@Colors";
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
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        { backgroundColor: colors.primary.main, borderRadius: 4, padding: 8 },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          { textAlign: "center", color: colors.primary.contrast },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
