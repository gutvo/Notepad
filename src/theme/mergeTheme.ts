import merge from "lodash.merge";
import { darkBackground, lightBackground } from "./backgroundTheme";
import defaultColors from "./defaultColors";
import { darkForeground, lightForeground } from "./foregroundTheme";
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

  const currentForegroundTheme = isDarkMode ? darkForeground : lightForeground;

  const mergedTheme = merge(
    defaultColors,
    currentBackgroundTheme,
    currentForegroundTheme,
    currentTheme,
    { isDarkMode },
  );

  return { ...mergedTheme };
}

export type ThemePaletteProps = ReturnType<typeof mergeTheme>;
