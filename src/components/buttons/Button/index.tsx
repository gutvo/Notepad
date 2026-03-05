import BaseButton, { BaseButtonProps } from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import {
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import getVariantStyles from "./getVariantStyles";

interface ButtonProps extends BaseButtonProps {
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariantProps;
}

export default function Button({
  textStyle,
  style,
  variant = "CONTAINED",
  children,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  const buttonStyle = getVariantStyles(variant, theme);

  return (
    <BaseButton
      style={(state: PressableStateCallbackType): StyleProp<ViewStyle> => [
        { borderRadius: 4, padding: theme.spacing(2), flex: 1 },
        buttonStyle,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {(state: PressableStateCallbackType) => (
        <BaseTypography
          style={[
            { textAlign: "center", color: theme.palette.primary.contrast },
            textStyle,
          ]}
        >
          {typeof children === "function" ? children(state) : children}
        </BaseTypography>
      )}
    </BaseButton>
  );
}
