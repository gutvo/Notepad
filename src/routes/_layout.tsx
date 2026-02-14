import colors from "@Colors";
import ConfigModal from "@Components/ConfigModal";
import MigrationModal from "@Components/MigrationModal";
import database from "@Database";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import migrations from "@Migrations";
import ModalProvider from "@Providers/ModalProvider";
import ToastProvider from "@Providers/ToastProvider";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Remote debugger"]);

export default function Layout() {
  const insets = useSafeAreaInsets();

  const { success, error } = useMigrations(database, migrations);

  useSaveSeeds(success);

  if (error || !success) {
    return <MigrationModal error={error} success={success} />;
  }

  return (
    <GestureHandlerRootView>
      <ModalProvider>
        <ToastProvider>
          <ConfigModal />

          <Slot />
          <View
            style={{
              height: insets.bottom,
              backgroundColor: colors.common.black,
            }}
          />
        </ToastProvider>
      </ModalProvider>
    </GestureHandlerRootView>
  );
}
