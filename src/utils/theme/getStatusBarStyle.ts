import { StatusBarStyle } from "react-native";

export default function getStatusBarStyle(hex: string): StatusBarStyle {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // luminância simplificada (boa o suficiente para UI)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.6 ? "dark-content" : "light-content";
}
