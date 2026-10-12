import useTheme from "@Hooks/useTheme";
import actions from "@Actions";
import database from "@Database";
import migrations from "@Migrations";
import HighLevelProvider from "@Providers/HighLevelProvider";
import ModalProvider from "@Providers/ModalProvider";
import ThemeProvider from "@Providers/ThemeProvider";
import ToastProvider from "@Providers/ToastProvider";
import seeds from "@Seeds";
import saveSeed from "@Utils/saveSeed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

let databaseBootstrap: Promise<void> | undefined;

function initializeDatabase(): Promise<void> {
  databaseBootstrap ??= (async () => {
    await saveSeed({
      seed: seeds.config,
      action: actions.config,
      primaryKey: "key",
    });
  })();

  return databaseBootstrap;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function StackLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.palette.primary.main,
        },
        headerTintColor: theme.palette.primary.contrast,

        contentStyle: {
          backgroundColor: theme.palette.background.body,
        },
      }}
    />
  );
}

export default function Layout() {
  const { error: migrationError, success: migrationsSuccess } = useMigrations(
    database,
    migrations,
  );
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<Error>();

  useEffect(() => {
    if (!migrationsSuccess) return;

    let isMounted = true;

    void initializeDatabase().then(
      () => {
        if (isMounted) setBootstrapComplete(true);
      },
      (error: unknown) => {
        if (isMounted) {
          setBootstrapError(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, [migrationsSuccess]);

  const databaseReady = migrationsSuccess && bootstrapComplete;
  const initializationError = migrationError ?? bootstrapError;

  return (
    <ThemeProvider databaseReady={databaseReady}>
      <GestureHandlerRootView>
        <ModalProvider>
          <ToastProvider>
            <HighLevelProvider
              migrationError={initializationError}
              migrationsSuccess={databaseReady}
            >
              <StackLayout />
            </HighLevelProvider>
          </ToastProvider>
        </ModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
