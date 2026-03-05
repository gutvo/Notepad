import useTheme from "@Hooks/useTheme";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import BaseClock from "../Clock";

import { addDays } from "date-fns";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import CalendarModeHeader from "./CalendarModeHeader";
import { useCalendarMonth } from "./hooks/useCalendarMonth";
import { useCalendarState } from "./hooks/useCalendarState";
import useGetDays from "./hooks/useGetDays";

export interface BaseCalendarProps {
  type?: "DATE" | "DATETIME";
  value?: Date;
  onChange?: (date?: Date) => void;
  disabledPast?: boolean;
  disabledToday?: boolean;
}

type ViewMode = "calendar" | "clock";

export default function BaseCalendar({
  type = "DATE",
  value,
  onChange,
  disabledPast,
  disabledToday,
}: BaseCalendarProps) {
  const theme = useTheme();

  const isDateTime = type === "DATETIME";

  function getDefaultValue(value: Date | undefined) {
    if (value) {
      return value;
    }

    const today = new Date();

    if (!disabledToday) {
      return today;
    }

    return addDays(today, 1);
  }

  const [internalDate, setInternalDate] = useState<Date>(
    getDefaultValue(value),
  );

  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
    }
  }, [value]);

  function updateDate(newDate: Date) {
    if (onChange) {
      onChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  }

  const { selectedTimestamp, handleChangeDate, todayTimestamp } =
    useCalendarState({
      value: internalDate,
      onChange: undefined,
      disabledToday,
    });

  const { viewDate, setViewDate, year, month } = useCalendarMonth({
    value: internalDate,
  });

  const days = useGetDays({
    month,
    selectedTimestamp,
    todayTimestamp,
    year,
    disabledPast,
    disabledToday,
  });

  function handleSelectDay(timestamp: number) {
    const updated = new Date(timestamp);

    updated.setHours(internalDate.getHours());
    updated.setMinutes(internalDate.getMinutes());
    updated.setSeconds(0);
    updated.setMilliseconds(0);

    updateDate(updated);
    handleChangeDate(timestamp);
  }

  function handleChangeTime(time: { hour: number; minute: number }) {
    const updated = new Date(internalDate);

    updated.setHours(time.hour);
    updated.setMinutes(time.minute);
    updated.setSeconds(0);
    updated.setMilliseconds(0);

    updateDate(updated);
  }

  const clockValue = useMemo(
    () => ({
      hour: internalDate.getHours(),
      minute: internalDate.getMinutes(),
    }),
    [internalDate],
  );

  return (
    <View style={{ padding: theme.spacing(4) }}>
      {isDateTime && (
        <CalendarModeHeader viewMode={viewMode} setViewMode={setViewMode} />
      )}

      {viewMode === "calendar" && (
        <View
          style={{
            backgroundColor: theme.palette.background.card,
            padding: theme.spacing(2),
            borderRadius: 4,
          }}
        >
          <CalendarHeader
            currentMonth={viewDate}
            month={month}
            setCurrentMonth={setViewDate}
            year={year}
          />

          <CalendarDaysOfWeek />

          <CalendarGrid days={days} onChange={handleSelectDay} />
        </View>
      )}

      {/* CLOCK */}
      {viewMode === "clock" && isDateTime && (
        <BaseClock
          value={clockValue}
          onChange={handleChangeTime}
          referenceDate={internalDate}
          disabledPast={disabledPast}
        />
      )}
    </View>
  );
}
