import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import { View } from "react-native";

interface NumberProps {
  number: number;
  index: number;
  total: number;
  radius: number;
  center: number;
  onPress: (number: number) => void;
  selected: number;
  getIsDisabledPastByNumber: (number: number) => boolean;
}

const TOUCH_SIZE = 60;
const VISUAL_SIZE = 44;

export default function Number({
  index,
  number,
  onPress,
  radius,
  total,
  center,
  selected,
  getIsDisabledPastByNumber,
}: NumberProps) {
  const theme = useTheme();

  const angle = (2 * Math.PI * index) / total - Math.PI / 2;

  const x = center + radius * Math.cos(angle);
  const y = center + radius * Math.sin(angle);

  const isSelected = selected === number;

  const isDisabled = getIsDisabledPastByNumber(number);

  return (
    <BaseButton
      onPress={() => onPress(number)}
      disabled={isDisabled}
      style={{
        position: "absolute",
        left: x - TOUCH_SIZE / 2,
        top: y - TOUCH_SIZE / 2,
        width: TOUCH_SIZE,
        height: TOUCH_SIZE,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: VISUAL_SIZE,
          height: VISUAL_SIZE,
          borderRadius: VISUAL_SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isSelected
            ? theme.palette.primary.main
            : "transparent",
        }}
      >
        <BaseTypography
          style={{
            color: isSelected
              ? theme.palette.primary.contrast
              : theme.palette.text.primary,
          }}
        >
          {number === 0 ? "00" : number}
        </BaseTypography>
      </View>
    </BaseButton>
  );
}
