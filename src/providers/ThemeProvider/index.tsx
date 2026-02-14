import mergeTheme from "@Theme/mergeTheme";
import { ReactNode, useCallback, useMemo, useState } from "react";
import ConfigContext from "./context";
import fontSize from "./fontSize";
import spacing from "./spacing";
import { ThemeContextChangeThemeProps, ThemeProps } from "./types";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const theme: ThemeProps = useMemo(
    () => ({
      palette: mergeTheme({ isDarkMode, themeIndex }),
      spacing,
      fontSize,
    }),
    [isDarkMode, themeIndex],
  );

  const changeTheme = useCallback(
    ({ darkMode, themeCode }: ThemeContextChangeThemeProps) => {
      if (darkMode !== undefined) setIsDarkMode(darkMode);
      if (themeCode !== undefined) setThemeIndex(themeCode);
    },
    [],
  );

  return (
    <ConfigContext.Provider value={{ changeTheme, theme }}>
      {children}
    </ConfigContext.Provider>
  );
}
