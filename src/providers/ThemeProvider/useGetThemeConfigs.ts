import {
  getThemeConfig,
  setDarkMode,
  setThemeIndex,
  ThemeStorageConfigProps,
} from "@Utils/themeStorage";
import { useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";

const DEFAULT_THEME_CONFIG: ThemeStorageConfigProps = {
  themeIndex: 0,
  isDarkMode: Appearance.getColorScheme() === "dark",
};

export default function useGetThemeConfigs(databaseReady: boolean) {
  const [themeConfigs, setThemeConfigs] =
    useState<ThemeStorageConfigProps>(DEFAULT_THEME_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!databaseReady) return;

    let isMounted = true;

    void (async () => {
      try {
        const settings = await getThemeConfig();
        if (isMounted) setThemeConfigs(settings);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Failed to load theme settings from the database.",
          error,
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [databaseReady]);

  const updateThemeIndex = useCallback(async (index: number) => {
    await setThemeIndex(index);
    setThemeConfigs((previous) => ({ ...previous, themeIndex: index }));
  }, []);

  const updateDarkMode = useCallback(async (isDarkMode: boolean) => {
    await setDarkMode(isDarkMode);
    setThemeConfigs((previous) => ({ ...previous, isDarkMode }));
  }, []);

  return {
    themeConfigs,
    updateThemeIndex,
    updateDarkMode,
    isLoading,
  } as const;
}
