import { ThemeProps } from "@Providers/ThemeProvider/types";
import { TextStyle } from "react-native";

export default function getVariantStyles(
  variant: BaseTypographyVariantProps,
  theme: ThemeProps,
) {
  const typographyVariants: Record<BaseTypographyVariantProps, TextStyle> = {
    H1: {
      fontSize: theme.fontSize(8),
      lineHeight: 40,
      fontWeight: "700",
    },

    H2: {
      fontSize: theme.fontSize(7),
      lineHeight: 36,
      fontWeight: "700",
    },

    H3: {
      fontSize: theme.fontSize(6),
      lineHeight: 32,
      fontWeight: "600",
    },

    H4: {
      fontSize: theme.fontSize(5),
      lineHeight: 28,
      fontWeight: "600",
    },

    H5: {
      fontSize: theme.fontSize(5),
      lineHeight: 24,
      fontWeight: "600",
    },

    H6: {
      fontSize: theme.fontSize(4),
      lineHeight: 22,
      fontWeight: "600",
    },

    SUBTITLE1: {
      fontSize: theme.fontSize(4),
      lineHeight: 22,
      fontWeight: "500",
    },

    SUBTITLE2: {
      fontSize: theme.fontSize(3),
      lineHeight: 20,
      fontWeight: "500",
    },

    BODY1: {
      fontSize: theme.fontSize(4),
      lineHeight: 24,
      fontWeight: "400",
    },

    BODY2: {
      fontSize: theme.fontSize(3),
      lineHeight: 20,
      fontWeight: "400",
    },

    BUTTON: {
      fontSize: theme.fontSize(3),
      lineHeight: theme.fontSize(4),
      fontWeight: "600",
      textTransform: "uppercase",
    },
  };

  return typographyVariants[variant];
}
