import { View } from "react-native";
import CalendarCell from "./CalendarCell";
import CalendarEmptyCell from "./CalendarEmptyCell";

interface CalendarGridProps {
  onChange: (timestamp: number) => void;
  days: (BaseCalendarDayDataProps | null)[];
}

export default function CalendarGrid({ days, onChange }: CalendarGridProps) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {days.map((day, index) => {
        if (!day) return <CalendarEmptyCell key={index} />;

        return (
          <CalendarCell
            key={index}
            day={day}
            onPress={() => onChange(day.timestamp)}
          />
        );
      })}
    </View>
  );
}
