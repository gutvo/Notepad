import useTheme from "@Hooks/useTheme";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import getVariantStyles from "./getVariantStyles";

type BaseTypographyVariantProps =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "H6"
  | "SUBTITLE1"
  | "SUBTITLE2"
  | "BODY1"
  | "BODY2"
  | "BUTTON";

interface BaseTypographyProps extends TextProps {
  variant?: BaseTypographyVariantProps;
}

export default function BaseTypography({
  children,
  style,
  variant = "BODY1",
  ...rest
}: BaseTypographyProps) {
  const theme = useTheme();

  const variantStyle = getVariantStyles(variant, theme);

  const customStyle: StyleProp<TextStyle> = [
    variantStyle,
    { color: theme.palette.background.textPrimary },
    style,
  ];

  return (
    <Text style={customStyle} {...rest}>
      {children}
    </Text>
  );
}
