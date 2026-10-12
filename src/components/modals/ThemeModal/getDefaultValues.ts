import { ThemeStorageConfigProps } from "@Utils/themeStorage";
import { themes } from "@Theme/themes";

export default function getDefaultValues(
  themeConfigs?: ThemeStorageConfigProps,
) {
  const storedThemeIndex = themeConfigs?.themeIndex;
  const themeIndex =
    typeof storedThemeIndex === "number" &&
    Number.isInteger(storedThemeIndex) &&
    storedThemeIndex >= 0 &&
    storedThemeIndex < themes.length
      ? storedThemeIndex
      : 0;

  const defaultValues = {
    themeIndex,
    isDarkMode: themeConfigs?.isDarkMode ?? false,
  };

  return defaultValues;
}

export type ThemeDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
