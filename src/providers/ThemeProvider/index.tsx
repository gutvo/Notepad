import mergeTheme from "@Theme/mergeTheme";
import { ReactNode, useCallback, useMemo } from "react";
import ConfigContext from "./context";
import fontSize from "./fontSize";
import spacing from "./spacing";
import { ThemeContextChangeThemeProps, ThemeProps } from "./types";
import useGetThemeConfigs from "./useGetThemeConfigs";

interface ThemeProviderProps {
  children: ReactNode;
  databaseReady: boolean;
}

export default function ThemeProvider({
  children,
  databaseReady,
}: ThemeProviderProps) {
  const { themeConfigs, updateThemeIndex, updateDarkMode, isLoading } =
    useGetThemeConfigs(databaseReady);

  const theme: ThemeProps = useMemo(
    () => ({
      palette: mergeTheme({
        isDarkMode: themeConfigs.isDarkMode,
        themeIndex: themeConfigs.themeIndex,
      }),
      spacing,
      fontSize,
    }),
    [themeConfigs.themeIndex, themeConfigs.isDarkMode],
  );

  const changeTheme = useCallback(
    async ({ darkMode, themeCode }: ThemeContextChangeThemeProps) => {
      if (darkMode !== undefined) {
        await updateDarkMode(darkMode);
      }

      if (themeCode !== undefined) {
        await updateThemeIndex(themeCode);
      }
    },
    [updateDarkMode, updateThemeIndex],
  );

  const contextValue = useMemo(
    () => ({ changeTheme, theme, isThemeLoading: isLoading }),
    [changeTheme, theme, isLoading],
  );

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}
