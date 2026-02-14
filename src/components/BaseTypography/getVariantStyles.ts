import { TextStyle } from "react-native";

export default function getVariantStyles(variant: BaseTypographyVariantProps) {
  const typographyVariants: Record<BaseTypographyVariantProps, TextStyle> = {
    H1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "700",
    },

    H2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "700",
    },

    H3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "600",
    },

    H4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "600",
    },

    H5: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "600",
    },

    H6: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "600",
    },

    SUBTITLE1: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "500",
    },

    SUBTITLE2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
    },

    BODY1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400",
    },

    BODY2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "400",
    },

    BUTTON: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: "600",
      textTransform: "uppercase",
    },
  };

  return typographyVariants[variant];
}
