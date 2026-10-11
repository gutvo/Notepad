import actions from "@Actions";
import deleteNotePermanently from "@Utils/deleteNotePermanently";
import { useEffect } from "react";
import { AppState } from "react-native";

const DEFAULT_TRASH_RETENTION_DAYS = 30;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export default function useClearExpiredNotes(migrationsSuccess: boolean) {
  useEffect(() => {
    if (!migrationsSuccess) return;

    let isCleaning = false;

    async function clearExpiredNotes() {
      const config = await actions.config.find("TRASH_RETENTION_DAYS");
      const retentionDays = config?.parsedValue ?? DEFAULT_TRASH_RETENTION_DAYS;

      if (!Number.isFinite(retentionDays) || retentionDays < 0) {
        throw new Error(
          `Configuração de retenção da lixeira inválida: ${retentionDays}`,
        );
      }

      if (retentionDays === 0) return;

      const expirationDate = new Date(
        Date.now() - retentionDays * MILLISECONDS_PER_DAY,
      );
      const expiredNotes = await actions.note.list({
        deleted_at: {
          isNotNull: true,
          lowerThan: expirationDate,
        },
      });

      for (const note of expiredNotes) {
        await deleteNotePermanently(note.id);
      }
    }

    function runCleanup() {
      if (isCleaning) return;

      isCleaning = true;
      void clearExpiredNotes()
        .catch((error: unknown) => {
          // Startup cleanup has no modal context; log failures for diagnostics.
          // eslint-disable-next-line no-console
          console.error("Falha ao limpar notas expiradas da lixeira.", error);
        })
        .finally(() => {
          isCleaning = false;
        });
    }

    runCleanup();
    const cleanupInterval = setInterval(runCleanup, MILLISECONDS_PER_DAY);
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") runCleanup();
      },
    );

    return () => {
      clearInterval(cleanupInterval);
      appStateSubscription.remove();
    };
  }, [migrationsSuccess]);
}
