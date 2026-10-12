import ConfigModal from "@Components/modals/ConfigModal";
import MigrationModal from "@Components/modals/MigrationModal";
import ReminderModal from "@Components/modals/ReminderModal";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useIsThemeLoading from "@Hooks/useIsThemeLoading";
import { ReactNode } from "react";
import Sidebar from "../../components/modals/Sidebar";
import BlankView from "./BlankView";
import CustomStatusBar from "./CustomStatusBar";
import useClearExpiredNotes from "./hooks/useClearExpiredNotes";
import useClearOldReminders from "./hooks/useClearOldReminders";
import useNotificationObserver from "./hooks/useNotificationObserver";
import useNotificationPermission from "./hooks/useNotificationPermission";

interface HighLevelProviderProps {
  children: ReactNode;
  migrationError?: Error;
  migrationsSuccess: boolean;
}

export default function HighLevelProvider({
  children,
  migrationError,
  migrationsSuccess,
}: HighLevelProviderProps) {
  const isThemeLoading = useIsThemeLoading();
  useNotificationObserver({ isThemeLoading });
  useNotificationPermission();

  const { isOpen: configIsOpen } = useCurrentModal("CONFIG");
  const { isOpen: sideBarIsOpen } = useCurrentModal("SIDEBAR");
  const { isOpen: reminderIsOpen } = useCurrentModal("REMINDER");

  useClearOldReminders(migrationsSuccess);
  useClearExpiredNotes(migrationsSuccess);

  if (migrationError || !migrationsSuccess) {
    return (
      <BlankView>
        <MigrationModal error={migrationError} success={migrationsSuccess} />
      </BlankView>
    );
  }

  if (isThemeLoading) return <BlankView />;

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
