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

      if (config.key === "PRINTER_ID") {
        accumulator.printerId = config.parsedValue;
      }

      if (config.key === "PAPER_SIZE") {
        accumulator.paperSize = config.parsedValue;
      }

      return accumulator;
    },
    {
      textFontSize: 20,
      daysBeforeReminder: 0,
      printerId: "",
      paperSize: "80mm",
    },
  );
}

export type ConfigDefaultValueProps = Awaited<
  ReturnType<typeof getDefaultValues>
>;
