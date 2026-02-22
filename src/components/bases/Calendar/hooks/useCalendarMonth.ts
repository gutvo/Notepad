import { useMemo, useState } from "react";

interface UseCalendarMonthProps {
  value?: Date;
}

export function useCalendarMonth({ value }: UseCalendarMonthProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(value ?? today);

  return {
    viewDate,
    setViewDate,
    year: viewDate.getFullYear(),
    month: viewDate.getMonth(),
  };
}
