import ConfigModal from "@Components/modals/ConfigModal";
import MigrationModal from "@Components/modals/MigrationModal";
import database from "@Database";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useIsThemeLoading from "@Hooks/useIsThemeLoading";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import useTheme from "@Hooks/useTheme";
import migrations from "@Migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HighLevelProviderProps {
  children: ReactNode;
}

export default function HighLevelProvider({
  children,
}: HighLevelProviderProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const isThemeLoading = useIsThemeLoading();

  const { isOpen } = useCurrentModal("CONFIG");

  const { error, success } = useMigrations(database, migrations);

  useSaveSeeds(success);

  // While theme is loading, show empty view with theme background
  if (isThemeLoading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.palette.background.body }}
      />
    );
  }

  if (error || !success) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.palette.background.body }}>
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

      {isOpen && <ConfigModal />}
    </>
  );
}
