import { ReminderDataProps } from "@Actions/reminder";

export default async function formatData(
  reminder: ReminderDataProps | undefined,
) {
  if (!reminder) return undefined;

  const childrens = await reminder.getChildren();

  const formattedReminder = { ...reminder, childrens };

  return formattedReminder;
}

export type FormattedReminderDataProps = Awaited<ReturnType<typeof formatData>>;
