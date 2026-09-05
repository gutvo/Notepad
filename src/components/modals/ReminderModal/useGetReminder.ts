import actions from "@Actions";
import { ReminderDataProps } from "@Actions/reminder";
import { useCallback, useEffect, useState } from "react";

interface UseGetReminderProps {
  id?: number;
}

export default function useGetReminder({ id }: UseGetReminderProps) {
  const [reminder, setReminder] = useState<ReminderDataProps | undefined>(
    undefined,
  );

  const getReminder = useCallback(async () => {
    if (!id) return;

    const findReminder = await actions.reminder.find(id);

    if (findReminder) {
      setReminder(findReminder);
    }
  }, [id]);

  useEffect(() => {
    getReminder();
  }, [getReminder]);

  return [reminder, setReminder] as const;
}
