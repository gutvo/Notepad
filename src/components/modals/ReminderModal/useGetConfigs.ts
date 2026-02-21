import actions from "@Actions";
import { useCallback, useEffect, useState } from "react";

export default function useGetConfigs() {
  const [daysBefore, setDaysBefore] = useState<number>(0);

  const getConfigs = useCallback(async () => {
    const settings = await actions.config.list({
      findBy: { keys: ["DAYS_BEFORE_REMINDER"] },
    });

    if (settings[0].key === "DAYS_BEFORE_REMINDER") {
      setDaysBefore(settings[0].value);
    }
  }, []);

  useEffect(() => {
    getConfigs();
  }, [getConfigs]);

  return [daysBefore, setDaysBefore] as const;
}
