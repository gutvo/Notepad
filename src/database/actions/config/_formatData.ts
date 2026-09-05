import { ConfigRowProps, ConfigValueMapProps } from ".";

export default function _formatData(data: ConfigRowProps) {
  let parsedValue: any;

  switch (data.key) {
    case "TEXT_FONT_SIZE":
    case "DAYS_BEFORE_REMINDER":
      parsedValue = Number(data.value);
      break;
    case "PRINTER_ID":
      parsedValue = data.value;
      break;
    case "PAPER_SIZE":
      parsedValue = data.value as ConfigValueMapProps["PAPER_SIZE"];
      break;
    default:
      parsedValue = data.value;
  }

  return { ...data, parsedValue };
}

export type FormattedConfigDataProps = ReturnType<typeof _formatData>;
