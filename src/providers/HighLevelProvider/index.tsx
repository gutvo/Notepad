import ConfigModal from "@Components/modals/ConfigModal";
import MigrationModal from "@Components/modals/MigrationModal";
import database from "@Database";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useIsThemeLoading from "@Hooks/useIsThemeLoading";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import migrations from "@Migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import Sidebar from "../../components/modals/Sidebar";
import BlankView from "./BlankView";
import Footer from "./Footer";
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

  const { isOpen } = useCurrentModal("CONFIG");
  const { isOpen: sideBarIsOpen } = useCurrentModal("SIDEBAR");

  const { error, success } = useMigrations(database, migrations);

  useSaveSeeds(success);

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

      {isOpen && <ConfigModal />}
      {sideBarIsOpen && <Sidebar />}

      <Footer />
    </BlankView>
  );
}
