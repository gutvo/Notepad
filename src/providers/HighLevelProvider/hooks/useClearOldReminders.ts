import actions from "@Actions";
import { useCallback, useEffect } from "react";

export default function useClearOldReminders() {
  const getOldReminders = useCallback(async () => {
    const today = new Date();
    return actions.reminder.list({ lowerThan: today });
  }, []);

  const deleteOldReminders = useCallback(async () => {
    const oldReminders = await getOldReminders();

    await Promise.all(
      oldReminders.map((oldReminder) =>
        actions.reminder.delete(oldReminder.id),
      ),
    );
  }, [getOldReminders]);

  useEffect(() => {
    deleteOldReminders();
  }, [deleteOldReminders]);
}
