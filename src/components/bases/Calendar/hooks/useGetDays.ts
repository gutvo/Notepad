import { useMemo } from "react";

interface UseGetDaysProps {
  year: number;
  month: number;
  todayTimestamp: number;
  selectedTimestamp: number | undefined;
  disabledPast?: boolean;
  disabledToday?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function useGetDays({
  month,
  selectedTimestamp,
  todayTimestamp,
  year,
  disabledPast,
  disabledToday,
  minDate,
  maxDate,
}: UseGetDaysProps) {
  // Normaliza minDate e maxDate para começar do dia (00:00:00)
  const minTimestamp = useMemo(() => {
    if (!minDate) return undefined;
    const date = new Date(minDate);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }, [minDate]);

  const maxTimestamp = useMemo(() => {
    if (!maxDate) return undefined;
    const date = new Date(maxDate);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }, [maxDate]);

  const monthStructure = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const daysArray: (number | null)[] = [];

    // Preenche dias vazios do início do mês
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    // Adiciona todos os dias do mês normalizados
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0); // IMPORTANTE: Normaliza para 00:00:00
      daysArray.push(date.getTime());
    }

    return daysArray;
  }, [year, month]);

  const selectedDayTimestamp = useMemo(() => {
    if (!selectedTimestamp) return undefined;

    const date = new Date(selectedTimestamp);
    date.setHours(0, 0, 0, 0); // Normaliza
    return date.getTime();
  }, [selectedTimestamp]);

  const days: (BaseCalendarDayDataProps | null)[] = useMemo(
    () =>
      monthStructure.map((dayTimestamp) => {
        if (!dayTimestamp) return null;

        // Verifica se está no passado
        const isPast = disabledPast && dayTimestamp < todayTimestamp;

        // Verifica se é hoje
        const isToday = dayTimestamp === todayTimestamp;

        // Verifica se hoje está desabilitado
        const isTodayDisabled = disabledToday && isToday;

        // Verifica minDate
        const isBeforeMin =
          minTimestamp !== undefined && dayTimestamp < minTimestamp;

        // Verifica maxDate
        const isAfterMax =
          maxTimestamp !== undefined && dayTimestamp > maxTimestamp;

        // Dia está desabilitado se qualquer condição for verdadeira
        const disabled = isPast || isTodayDisabled || isBeforeMin || isAfterMax;

        return {
          timestamp: dayTimestamp,
          isSelected: dayTimestamp === selectedDayTimestamp,
          isToday,
          disabled,
        };
      }),
    [
      disabledPast,
      disabledToday,
      monthStructure,
      selectedDayTimestamp,
      todayTimestamp,
      minTimestamp,
      maxTimestamp,
    ],
  );

  return days;
}
