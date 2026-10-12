import config from "./config";
import note from "./note";
import reminder from "./reminder";

export { createEntityActions } from "./createActions";

const actions = { note, config, reminder };

export default actions;
