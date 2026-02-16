import { useMemo } from "react";

interface UseGetDaysProps {
  year: number;
  month: number;
  todayTimestamp: number;
  selectedTimestamp: number;
  disabledPast?: boolean;
}

export default function useGetDays({
  month,
  selectedTimestamp,
  todayTimestamp,
  year,
  disabledPast,
}: UseGetDaysProps) {
  const monthStructure = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysArray: (number | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      daysArray.push(date.getTime());
    }

    return daysArray;
  }, [year, month]);

  const selectedDayTimestamp = useMemo(() => {
    const date = new Date(selectedTimestamp);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).getTime();
  }, [selectedTimestamp]);

  const days: (BaseCalendarDayDataProps | null)[] = useMemo(
    () =>
      monthStructure.map((dayTimestamp) => {
        if (!dayTimestamp) return null;

        return {
          timestamp: dayTimestamp,
          isSelected: dayTimestamp === selectedDayTimestamp,
          isToday: dayTimestamp === todayTimestamp,
          disabled: disabledPast ? todayTimestamp > dayTimestamp : false,
        };
      }),
    [disabledPast, monthStructure, selectedDayTimestamp, todayTimestamp],
  );

  return days;
}
