interface ReminderDataProps {
  id: number;

  note_id: number;
  notification_id: string;
  parent_id: number | null;

  title: string;
  message: string;

  notificate_at: Date;
}

type CreateReminderDataProps = Omit<ReminderDataProps, "id">;

type UpdateReminderDataProps = Partial<ReminderDataProps>;
