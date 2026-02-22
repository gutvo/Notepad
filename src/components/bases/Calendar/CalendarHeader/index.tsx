import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import { View } from "react-native";

interface CalendarHeaderProps {
  setCurrentMonth: (date: Date) => void;
  currentMonth: Date;
  year: number;
  month: number;
}

export default function CalendarHeader({
  setCurrentMonth,
  currentMonth,
  month,
  year,
}: CalendarHeaderProps) {
  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(year, month + increment, 1));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <BaseButton onPress={() => changeMonth(-1)}>
        <BaseIcon name="arrow-left" />
      </BaseButton>

      <BaseTypography
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {currentMonth.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
      </BaseTypography>

      <BaseButton onPress={() => changeMonth(1)}>
        <BaseIcon name="arrow-right" />
      </BaseButton>
    </View>
  );
}
