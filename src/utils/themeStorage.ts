import actions from "@Actions";
import { themes } from "@Theme/themes";
import { Appearance } from "react-native";

export type ThemeStorageConfigProps = {
  themeIndex: number;
  isDarkMode: boolean;
};

export async function getThemeConfig(): Promise<ThemeStorageConfigProps> {
  const [themeIndex, isDarkMode] = await Promise.all([
    actions.config.find("THEME_INDEX"),
    actions.config.find("THEME_IS_DARK_MODE"),
  ]);

  const storedThemeIndex = themeIndex?.parsedValue;

  return {
    themeIndex:
      typeof storedThemeIndex === "number" &&
      Number.isInteger(storedThemeIndex) &&
      storedThemeIndex >= 0 &&
      storedThemeIndex < themes.length
        ? storedThemeIndex
        : 0,
    isDarkMode:
      typeof isDarkMode?.parsedValue === "boolean"
        ? isDarkMode.parsedValue
        : Appearance.getColorScheme() === "dark",
  };
}

export async function setThemeIndex(index: number): Promise<void> {
  await actions.config.update("THEME_INDEX", {
    value: String(index),
    type: "NUMBER",
  });
}

export async function setDarkMode(isDarkMode: boolean): Promise<void> {
  await actions.config.update("THEME_IS_DARK_MODE", {
    value: String(isDarkMode),
    type: "BOOLEAN",
  });
}
