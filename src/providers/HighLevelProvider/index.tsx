import ConfigModal from "@Components/modals/ConfigModal";
import MigrationModal from "@Components/modals/MigrationModal";
import database from "@Database";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useIsThemeLoading from "@Hooks/useIsThemeLoading";
import useSaveSeeds from "@Hooks/useSaveSeeds";
import migrations from "@Migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import BlankView from "./BlankView";
import Footer from "./Footer";

interface HighLevelProviderProps {
  children: ReactNode;
}

export default function HighLevelProvider({
  children,
}: HighLevelProviderProps) {
  const isThemeLoading = useIsThemeLoading();

  const { isOpen } = useCurrentModal("CONFIG");

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

      <Footer />
    </BlankView>
  );
}
