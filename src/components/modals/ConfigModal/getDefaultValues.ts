export default function getDefaultValues(configs: ConfigDataProps[] = []) {
  return configs.reduce(
    (accumulator, config) => {
      if (config.key === "TEXT_FONT_SIZE") {
        accumulator.textFontSize = config.value;
      }

      if (config.key === "DAYS_BEFORE_REMINDER") {
        accumulator.daysBeforeReminder = config.value;
      }

      if (config.key === "PRINTER_ID") {
        accumulator.printerId = config.value;
      }

      if (config.key === "PAPER_SIZE") {
        accumulator.paperSize = config.value;
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
