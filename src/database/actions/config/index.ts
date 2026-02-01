import createNote from "./create";
import deleteNote from "./delete";
import findNote from "./find";
import listNotes from "./list";
import updateNote from "./update";

const configActions = {
  list: listNotes,
  create: createNote,
  update: updateNote,
  delete: deleteNote,
  find: findNote,
};

export default configActions;
