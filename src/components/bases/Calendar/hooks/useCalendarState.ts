import { useCallback, useMemo, useState } from "react";

interface UseCalendarStateProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export function useCalendarState({ value, onChange }: UseCalendarStateProps) {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [internalTimestamp, setInternalTimestamp] = useState(
    value?.getTime() ?? today.getTime(),
  );

  const selectedTimestamp = value?.getTime() ?? internalTimestamp;

  const handleChangeDate = useCallback(
    (timestamp: number) => {
      const baseDate = new Date(selectedTimestamp);
      const newDay = new Date(timestamp);

      const newDate = new Date(
        newDay.getFullYear(),
        newDay.getMonth(),
        newDay.getDate(),
        baseDate.getHours(),
        baseDate.getMinutes(),
        baseDate.getSeconds(),
        baseDate.getMilliseconds(),
      );

      onChange?.(newDate);

      if (!onChange) {
        setInternalTimestamp(newDate.getTime());
      }
    },
    [onChange, selectedTimestamp],
  );

  return {
    selectedTimestamp,
    handleChangeDate,
    todayTimestamp: today.getTime(),
  };
}
