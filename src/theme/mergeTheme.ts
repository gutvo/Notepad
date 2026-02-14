import { merge } from "lodash";
import { darkBackground, lightBackground } from "./backgroundTheme";
import defaultColors from "./defaultColors";
import { themes } from "./themes";

interface MergeThemeProps {
  isDarkMode: boolean;
  themeIndex: number;
}

export default function mergeTheme({
  isDarkMode,
  themeIndex,
}: MergeThemeProps) {
  const currentTheme = { primary: themes[themeIndex] };
  const currentBackgroundTheme = {
    background: isDarkMode ? darkBackground : lightBackground,
  };
  const mergedTheme = merge(
    defaultColors,
    currentBackgroundTheme,
    currentTheme,
    { isDarkMode },
  );

  return { ...mergedTheme };
}

export type ThemePaletteProps = ReturnType<typeof mergeTheme>;
