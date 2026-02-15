import actions from "@Actions";
import { useCallback, useEffect, useState } from "react";

export default function useGetThemeConfigs() {
  const [themeConfigs, setThemeConfigs] = useState<ConfigDataProps[]>([]);

  const getThemeConfigs = useCallback(async () => {
    const settings = await actions.config.list({
      findBy: { keys: ["THEME_INDEX", "THEME_IS_DARK_MODE"] },
    });

    setThemeConfigs(settings);
  }, []);

  useEffect(() => {
    getThemeConfigs();
  }, [getThemeConfigs]);

  return [themeConfigs, setThemeConfigs] as const;
}
