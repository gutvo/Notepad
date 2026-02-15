export default function getDefaultValues(themeConfigs?: ConfigDataProps[]) {
  const defaultProps = themeConfigs?.reduce(
    (accumulator, themeConfig) => {
      if (themeConfig.key === "THEME_INDEX") {
        accumulator.themeIndex = themeConfig.value;
      }

      if (themeConfig.key === "THEME_IS_DARK_MODE") {
        accumulator.isDarkMode = themeConfig.value;
      }

      return accumulator;
    },
    { themeIndex: 0, isDarkMode: false },
  );

  const defaultValues = {
    themeIndex: defaultProps?.themeIndex ?? 0,
    isDarkMode: defaultProps?.isDarkMode ?? false,
  };

  return defaultValues;
}

export type ThemeDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
