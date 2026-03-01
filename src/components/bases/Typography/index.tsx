import useTheme from "@Hooks/useTheme";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import getVariantStyles from "./getVariantStyles";

export interface BaseTypographyProps extends TextProps {
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
    { color: theme.palette.text.primary },
    variantStyle,
    style,
  ];

  return (
    <Text style={customStyle} {...rest}>
      {children}
    </Text>
  );
}
