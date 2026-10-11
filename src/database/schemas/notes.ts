import { text } from "drizzle-orm/sqlite-core";
import { addCreatedAt, createTable } from "./tableFactory";

const noteSchema = createTable("notes", {
  columns: {
    description: text("description").notNull(),
  },
  modifiers: [addCreatedAt()],
});

export default noteSchema;
