import React from "react";
import { View } from "react-native";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import { useCalendarMonth } from "./hooks/useCalendarMonth";
import { useCalendarState } from "./hooks/useCalendarState";
import useGetDays from "./hooks/useGetDays";

export interface BaseCalendarProps {
  value?: Date;
  onChange?: (date?: Date) => void;
  disabledPast?: boolean;
  disabledToday?: boolean;
}

export default function BaseCalendar({
  value,
  onChange,
  disabledPast,
  disabledToday,
}: BaseCalendarProps) {
  const { selectedTimestamp, handleChangeDate, todayTimestamp } =
    useCalendarState({ value, onChange, disabledToday });

  const { viewDate, setViewDate, year, month } = useCalendarMonth({ value });

  const days = useGetDays({
    month,
    selectedTimestamp,
    todayTimestamp,
    year,
    disabledPast,
    disabledToday,
  });

  return (
    <View style={{ padding: 16 }}>
      <CalendarHeader
        currentMonth={viewDate}
        month={month}
        setCurrentMonth={setViewDate}
        year={year}
      />

      <CalendarDaysOfWeek />

      <CalendarGrid days={days} onChange={handleChangeDate} />
    </View>
  );
}
