import { useCallback, useMemo, useState } from "react";

interface UseCalendarStateProps {
  value?: Date;
  onChange?: (date: Date) => void;
  disabledToday?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function useCalendarState({
  value,
  onChange,
  disabledToday = false,
  minDate,
  maxDate,
}: UseCalendarStateProps) {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [internalTimestamp, setInternalTimestamp] = useState<
    number | undefined
  >(value?.getTime());

  const selectedTimestamp = value?.getTime() ?? internalTimestamp;

  // Função para verificar se uma data está desabilitada
  const isDateDisabled = useCallback(
    (timestamp: number) => {
      const date = new Date(timestamp);
      date.setHours(0, 0, 0, 0);
      const dateTime = date.getTime();

      // Verifica se é hoje e se hoje está desabilitado
      if (disabledToday && dateTime === today.getTime()) {
        return true;
      }

      // Verifica data mínima
      if (minDate) {
        const min = new Date(minDate);
        min.setHours(0, 0, 0, 0);
        if (dateTime < min.getTime()) {
          return true;
        }
      }

      // Verifica data máxima
      if (maxDate) {
        const max = new Date(maxDate);
        max.setHours(0, 0, 0, 0);
        if (dateTime > max.getTime()) {
          return true;
        }
      }

      return false;
    },
    [disabledToday, today, minDate, maxDate],
  );

  const handleChangeDate = useCallback(
    (timestamp: number) => {
      // Não permite selecionar data desabilitada
      if (isDateDisabled(timestamp)) {
        return;
      }

      const baseDate = selectedTimestamp
        ? new Date(selectedTimestamp)
        : new Date();
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
    [onChange, selectedTimestamp, isDateDisabled],
  );

  return {
    selectedTimestamp,
    handleChangeDate,
    todayTimestamp: today.getTime(),
    isDateDisabled,
  };
}
