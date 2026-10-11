import { noteSchema } from "@Schemas";
import { Subject } from "rxjs";
import { createEntityActions } from "../createActions";

type NoteRowProps = typeof noteSchema.$inferSelect;
export type NoteDataProps = NoteRowProps;

const noteObserver$ = new Subject<{ type: string; payload: any }>();

const noteActions = createEntityActions({
  schema: noteSchema,
  observer: noteObserver$,
});

export default noteActions;
