import { ThemeProps } from "@Providers/ThemeProvider/types";
import { ViewStyle } from "react-native";

export default function getVariantStyles(
  variant: ButtonVariantProps,
  theme: ThemeProps,
) {
  const buttonVariants: Record<ButtonVariantProps, ViewStyle> = {
    CONTAINED: {
      backgroundColor: theme.palette.primary.main,
    },
    OUTLINED: {
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
    },
    TEXT: {},
  };

  return buttonVariants[variant];
}
