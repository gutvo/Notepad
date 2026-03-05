import actions from "@Actions";
import { useCallback, useEffect } from "react";

export default function useClearOldReminders(migrationsSuccess: boolean) {
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
    if (migrationsSuccess) {
      deleteOldReminders();
    }
  }, [deleteOldReminders, migrationsSuccess]);
}
