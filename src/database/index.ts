import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expoDatabase = openDatabaseSync("db.db");
const database = drizzle(expoDatabase);

export default database;
