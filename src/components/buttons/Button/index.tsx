import BaseButton, { BaseButtonProps } from "@Components/bases/BaseButton";
import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import { StyleProp, TextStyle } from "react-native";

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
      <BaseTypography
        style={[
          { textAlign: "center", color: theme.palette.primary.contrast },
          textStyle,
        ]}
      >
        {children}
      </BaseTypography>
    </BaseButton>
  );
}
