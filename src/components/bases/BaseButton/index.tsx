import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export interface BaseButtonProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
}

export default function BaseButton({
  textStyle,
  style,
  children,
  ...rest
}: BaseButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={style} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
