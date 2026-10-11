import actions from "@Actions";
import { useEffect, useState } from "react";

export default function useGetConfigs() {
  const [daysBefore, setDaysBefore] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      const settings = await actions.config.list({
        key: { in: ["DAYS_BEFORE_REMINDER"] },
      });

      if (isMounted && settings[0]?.key === "DAYS_BEFORE_REMINDER") {
        setDaysBefore(Number(settings[0].value));
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return [daysBefore, setDaysBefore] as const;
}
