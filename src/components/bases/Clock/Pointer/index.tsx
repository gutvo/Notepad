import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

interface PointerProps {
  selected: number;
  mode: "hour" | "minute";
  outerRadius: number;
  innerRadius: number;
}

export default function Pointer({
  selected,
  mode,
  outerRadius,
  innerRadius,
}: PointerProps) {
  const theme = useTheme();

  const radius =
    mode === "minute"
      ? outerRadius
      : selected >= 1 && selected <= 12
        ? outerRadius
        : innerRadius;

  const pointerLength = radius * 0.85;

  const angle =
    mode === "hour"
      ? (360 / 12) *
        (selected === 0 ? 0 : selected <= 12 ? selected - 1 : selected - 13 + 1)
      : (360 / 60) * selected;

  return (
    <View
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        transform: [{ rotate: `${angle}deg` }],
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: -1,
          width: 2,
          height: pointerLength,
          backgroundColor: theme.palette.primary.main,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.primary.main,
        }}
      />
    </View>
  );
}
