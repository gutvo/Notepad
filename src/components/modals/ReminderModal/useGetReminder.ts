import actions from "@Actions";
import { ReminderDataProps } from "@Actions/reminder";
import { useEffect, useState } from "react";

interface UseGetReminderProps {
  id?: number;
}

export default function useGetReminder({ id }: UseGetReminderProps) {
  const [reminder, setReminder] = useState<ReminderDataProps | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!id) {
      queueMicrotask(() => setReminder(undefined));
      return;
    }

    let isMounted = true;

    void (async () => {
      const findReminder = await actions.reminder.find(id);

      if (isMounted && findReminder) {
        setReminder(findReminder);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return [reminder, setReminder] as const;
}
