import MigrationModal from "@Components/MigrationModal";
import database from "@Database";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import migrations from "@Migrations";
import ToastProvider from "@Providers/ToastProvider";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

LogBox.ignoreLogs(["Remote debugger"]);

export default function Layout() {
  const { success, error } = useMigrations(database, migrations);

  useSaveSeeds(success);

  if (error || !success) {
    return <MigrationModal error={error} success={success} />;
  }

  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <Slot />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
