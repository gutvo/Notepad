import { FormattedConfigDataProps } from "@Actions/config/_formatData";

export default function getDefaultValues(
  configs: FormattedConfigDataProps[] = [],
) {
  return configs.reduce(
    (accumulator, config) => {
      if (config.key === "TEXT_FONT_SIZE") {
        accumulator.textFontSize = config.parsedValue;
      }

      if (config.key === "DAYS_BEFORE_REMINDER") {
        accumulator.daysBeforeReminder = config.parsedValue;
      }

      if (config.key === "TRASH_RETENTION_DAYS") {
        accumulator.trashRetentionDays = config.parsedValue;
      }

      return accumulator;
    },
    { textFontSize: 20, daysBeforeReminder: 0, trashRetentionDays: 30 },
  );
}

export type ConfigDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
