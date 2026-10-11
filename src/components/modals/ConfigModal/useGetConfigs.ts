import actions from "@Actions";
import { FormattedConfigDataProps } from "@Actions/config/_formatData";
import { useEffect, useState } from "react";

export default function useGetConfigs() {
  const [configs, setConfigs] = useState<FormattedConfigDataProps[]>([]);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      const settings = await actions.config.list({
        key: {
          in: [
            "TEXT_FONT_SIZE",
            "DAYS_BEFORE_REMINDER",
            "PRINTER_ID",
            "PAPER_SIZE",
          ],
        },
      });

      if (isMounted) {
        setConfigs(settings);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return [configs, setConfigs] as const;
}
