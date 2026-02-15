import { ThemeStorageConfigProps } from "@Utils/themeStorage";

export default function getDefaultValues(
  themeConfigs?: ThemeStorageConfigProps,
) {
  const defaultValues = {
    themeIndex: themeConfigs?.themeIndex ?? 0,
    isDarkMode: themeConfigs?.isDarkMode ?? false,
  };

  return defaultValues;
}

export type ThemeDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
