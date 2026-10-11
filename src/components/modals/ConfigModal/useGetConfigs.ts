import actions from "@Actions";
import { FormattedConfigDataProps } from "@Actions/config/_formatData";
import { useCallback, useEffect, useState } from "react";

export default function useGetConfigs() {
  const [configs, setConfigs] = useState<FormattedConfigDataProps[]>([]);

  const getConfigs = useCallback(async () => {
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

    setConfigs(settings);
  }, []);

  useEffect(() => {
    getConfigs();
  }, [getConfigs]);

  return [configs, setConfigs] as const;
}
