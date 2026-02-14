import ConfigModal from "@Components/ConfigModal";
import MigrationModal from "@Components/MigrationModal";
import database from "@Database";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import useTheme from "@Hooks/useTheme";
import migrations from "@Migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HighLevelProps {
  children: ReactNode;
}

export default function HighLevel({ children }: HighLevelProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const { success, error } = useMigrations(database, migrations);

  useSaveSeeds(success);

  if (error || !success) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.palette.background.body,
          width: "100%",
        }}
      >
        <MigrationModal error={error} success={success} />
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.palette.background.body,
          width: "100%",
        }}
      >
        {children}
      </View>

      <View
        style={{
          height: insets.bottom,
          backgroundColor: theme.palette.common.black,
        }}
      />

      <ConfigModal />
    </>
  );
}
