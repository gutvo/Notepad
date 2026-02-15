import {
  getThemeConfig,
  setDarkMode,
  setThemeIndex,
} from "@Utils/themeStorage";
import { useCallback, useEffect, useState } from "react";

interface ThemeConfigProps {
  THEME_INDEX: number;
  THEME_IS_DARK_MODE: boolean;
}

const DEFAULT_THEME_CONFIG = {
  THEME_INDEX: 0,
  THEME_IS_DARK_MODE: true,
} as const;

export default function useGetThemeConfigs() {
  const [themeConfigs, setThemeConfigs] =
    useState<ThemeConfigProps>(DEFAULT_THEME_CONFIG);

  const loadThemeConfigs = useCallback(async () => {
    try {
      const config = await getThemeConfig();
      setThemeConfigs({
        THEME_INDEX: config.themeIndex,
        THEME_IS_DARK_MODE: config.isDarkMode,
      });
    } catch {
      setThemeConfigs(DEFAULT_THEME_CONFIG);
    }
  }, []);

  useEffect(() => {
    loadThemeConfigs();
  }, [loadThemeConfigs]);

  const updateThemeIndex = useCallback(async (index: number) => {
    setThemeConfigs((prev) => ({ ...prev, THEME_INDEX: index }));
    await setThemeIndex(index);
  }, []);

  const updateDarkMode = useCallback(async (isDarkMode: boolean) => {
    setThemeConfigs((prev) => ({ ...prev, THEME_IS_DARK_MODE: isDarkMode }));
    await setDarkMode(isDarkMode);
  }, []);

  return {
    themeConfigs,
    updateThemeIndex,
    updateDarkMode,
  } as const;
}
