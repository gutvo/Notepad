import actions from "@Actions";
import seeds from "@Seeds";
import { useEffect } from "react";
import saveSeed from "src/utils/saveSeed";

export default function useSaveSeeds(migrationsSuccess: boolean) {
  useEffect(() => {
    if (!migrationsSuccess) return;

    async function runSeed() {
      await saveSeed({
        seed: seeds.config,
        action: actions.config,
        primaryKey: "key",
      });
    }

    runSeed();
  }, [migrationsSuccess]);
}
