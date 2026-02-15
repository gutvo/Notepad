import { getThemeConfig, ThemeStorageConfigProps } from "@Utils/themeStorage";
import { useCallback, useEffect, useState } from "react";

export default function useGetThemeConfigs() {
  const [themeConfigs, setThemeConfigs] = useState<ThemeStorageConfigProps>();

  const getThemeConfigs = useCallback(async () => {
    const settings = await getThemeConfig();

    setThemeConfigs(settings);
  }, []);

  useEffect(() => {
    getThemeConfigs();
  }, [getThemeConfigs]);

  return [themeConfigs, setThemeConfigs] as const;
}
