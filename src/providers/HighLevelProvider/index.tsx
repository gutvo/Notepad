import ConfigModal from "@Components/modals/ConfigModal";
import MigrationModal from "@Components/modals/MigrationModal";
import ReminderModal from "@Components/modals/ReminderModal";
import database from "@Database";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useIsThemeLoading from "@Hooks/useIsThemeLoading";
import migrations from "@Migrations";
import useSaveSeeds from "@Providers/HighLevelProvider/hooks/useSaveSeeds";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import Sidebar from "../../components/modals/Sidebar";
import BlankView from "./BlankView";
import CustomStatusBar from "./CustomStatusBar";
import useClearOldReminders from "./hooks/useClearOldReminders";
import useNotificationObserver from "./hooks/useNotificationObserver";
import useNotificationPermission from "./hooks/useNotificationPermission";

interface HighLevelProviderProps {
  children: ReactNode;
}

export default function HighLevelProvider({
  children,
}: HighLevelProviderProps) {
  const isThemeLoading = useIsThemeLoading();
  useNotificationObserver({ isThemeLoading });
  useNotificationPermission();

  const { isOpen: configIsOpen } = useCurrentModal("CONFIG");
  const { isOpen: sideBarIsOpen } = useCurrentModal("SIDEBAR");
  const { isOpen: reminderIsOpen } = useCurrentModal("REMINDER");

  const { error, success } = useMigrations(database, migrations);

  useSaveSeeds(success);
  useClearOldReminders(success);

  if (isThemeLoading) return <BlankView />;

  if (error || !success) {
    return (
      <BlankView>
        <MigrationModal error={error} success={success} />
      </BlankView>
    );
  }

  return (
    <BlankView>
      {children}

      <CustomStatusBar />

      {configIsOpen && <ConfigModal />}
      {sideBarIsOpen && <Sidebar />}
      {reminderIsOpen && <ReminderModal />}
    </BlankView>
  );
}
