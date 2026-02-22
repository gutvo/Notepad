import BaseTypography from "@Components/bases/Typography";
import { View } from "react-native";

export default function CalendarDaysOfWeek() {
  return (
    <View style={{ flexDirection: "row" }}>
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
        <View
          key={day}
          style={{
            width: "14.2857%",
            alignItems: "center",
          }}
        >
          <BaseTypography
            style={{
              fontWeight: "bold",
            }}
          >
            {day}
          </BaseTypography>
        </View>
      ))}
    </View>
  );
}
