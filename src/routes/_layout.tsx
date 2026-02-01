import MigrationModal from "@Components/MigrationModal";
import database from "@Database";
import migrations from "@Migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";

export default function Layout() {
  const { success, error } = useMigrations(database, migrations);

  if (error || !success) {
    return <MigrationModal error={error} success={success} />;
  }

  return <Slot />;
}
