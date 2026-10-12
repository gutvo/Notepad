import { reminderSchema } from "@Schemas";
import { Subject } from "rxjs";
import { createEntityActions } from "../createActions";
import getChildren from "./customActions/getChildren";

export type ReminderRowProps = typeof reminderSchema.$inferSelect;
export type ReminderCreateProps = Omit<ReminderRowProps, "id">;
export type ReminderUpdateProps = Partial<Omit<ReminderRowProps, "id">>;
export type ReminderDataProps = ReminderRowProps & {
  getChildren: () => Promise<ReminderRowProps[]>;
};

const reminderObserver$ = new Subject<{ type: string; payload: any }>();

const reminderActions = createEntityActions({
  schema: reminderSchema,
  observer: reminderObserver$,
  rowActions: (reminder) => ({
    getChildren: async () => getChildren(reminder),
  }),
});

export default reminderActions;
