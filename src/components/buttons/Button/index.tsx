import BaseButton, { BaseButtonProps } from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import {
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

interface ButtonProps extends BaseButtonProps {
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  textStyle,
  style,
  children,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <BaseButton
      style={(state: PressableStateCallbackType): StyleProp<ViewStyle> => [
        {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 4,
          padding: theme.spacing(2),
        },
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
