import getStatusBarStyle from "@Utils/theme/getStatusBarStyle";
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

  const primaryMain = currentTheme.primary.main;

  const mergedTheme = merge(
    defaultColors,
    currentBackgroundTheme,
    currentForegroundTheme,
    currentTheme,
    { isDarkMode, statusBar: getStatusBarStyle(primaryMain) },
  );

  return { ...mergedTheme };
}

export type ThemePaletteProps = ReturnType<typeof mergeTheme>;
