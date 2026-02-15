import mergeTheme from "@Theme/mergeTheme";
import { ReactNode, useCallback, useMemo } from "react";
import ConfigContext from "./context";
import fontSize from "./fontSize";
import spacing from "./spacing";
import { ThemeContextChangeThemeProps, ThemeProps } from "./types";
import useGetThemeConfigs from "./useGetThemeConfigs";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeConfigs, updateThemeIndex, updateDarkMode, isLoading } =
    useGetThemeConfigs();

  const theme: ThemeProps = useMemo(
    () => ({
      palette: mergeTheme({
        isDarkMode: themeConfigs.THEME_IS_DARK_MODE,
        themeIndex: themeConfigs.THEME_INDEX,
      }),
      spacing,
      fontSize,
    }),
    [themeConfigs.THEME_INDEX, themeConfigs.THEME_IS_DARK_MODE],
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
