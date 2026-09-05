import actions from "@Actions";
import { useCallback, useEffect } from "react";

export default function useClearOldReminders(migrationsSuccess: boolean) {
  const getOldReminders = useCallback(async () => {
    const today = new Date();
    const oldReminders = await actions.reminder.list({
      notificate_at: { lowerThan: today },
    });
    return oldReminders;
  }, []);

  const deleteOldReminders = useCallback(async () => {
    const oldReminders = await getOldReminders();

    const allIds = oldReminders.map((reminder) => reminder.id);

    await actions.reminder.delete(allIds);
  }, [getOldReminders]);

  useEffect(() => {
    if (migrationsSuccess) {
      deleteOldReminders();
    }
  }, [deleteOldReminders, migrationsSuccess]);
}
