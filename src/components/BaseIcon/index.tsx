import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "@Hooks/useTheme";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import defaultSizes from "./defaultSizes";

interface BaseIconProps {
  name: BaseIconNameProps;
  size?: BaseIconSizeProps | number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export default function BaseIcon({
  name,
  size = "medium",
  color,
  style,
}: BaseIconProps) {
  const theme = useTheme();

  const finalSize = typeof size === "string" ? defaultSizes[size] : size;
  const finalColor = color ?? theme.palette.background.textPrimary;

  return (
    <MaterialCommunityIcons
      name={name}
      size={finalSize}
      color={finalColor}
      style={style}
    />
  );
}
