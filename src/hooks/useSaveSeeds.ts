import actions from "@Actions";
import seeds from "@Seeds";
import saveSeed from "@Utils/saveSeed";
import { useEffect } from "react";

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
