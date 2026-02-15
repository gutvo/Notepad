export default function getDefaultValues(configs?: ConfigDataProps[]) {
  const defaultProps = configs?.reduce(
    (accumulator, config) => {
      if (config.key === "TEXT_FONT_SIZE") {
        accumulator.textFontSize = config.value;
      }

      if (config.key === "DAYS_BEFORE_REMINDER") {
        accumulator.daysBeforeReminder = config.value;
      }

      return accumulator;
    },
    { textFontSize: 12, daysBeforeReminder: 0 },
  );

  const defaultValues = {
    textFontSize: defaultProps?.textFontSize ?? 12,
    daysBeforeReminder: defaultProps?.daysBeforeReminder ?? 0,
  };

  return defaultValues;
}

export type ConfigDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
