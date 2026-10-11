import { noteSchema } from "@Schemas";
import { Subject } from "rxjs";
import { createActions } from "../createActions";

type NoteRowProps = typeof noteSchema.$inferSelect;
type NoteCreateProps = Omit<NoteRowProps, "id">;
type NoteUpdateProps = Partial<Omit<NoteRowProps, "id">>;
export type NoteDataProps = NoteRowProps;

const noteObserver$ = new Subject<{ type: string; payload: any }>();

const noteActions = createActions<
  NoteCreateProps,
  NoteUpdateProps,
  NoteRowProps
>({
  schema: noteSchema,
  observer: noteObserver$,
});

export default noteActions;
