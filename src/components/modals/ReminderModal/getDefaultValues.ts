export default function getDefaultValues(reminder?: ReminderDataProps) {
  return {
    name: reminder?.title || "",
    notify_at: reminder?.notificate_at || undefined,
  };
}

export type ReminderFormDataProps = ReturnType<typeof getDefaultValues>;
