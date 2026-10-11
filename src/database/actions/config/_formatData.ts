import { ConfigRowProps } from ".";

export default function _formatData(data: ConfigRowProps) {
  let parsedValue: any;

  switch (data.key) {
    case "TEXT_FONT_SIZE":
    case "DAYS_BEFORE_REMINDER":
    case "TRASH_RETENTION_DAYS":
      parsedValue = Number(data.value);
      break;
    default:
      parsedValue = data.value;
  }

  return { ...data, parsedValue };
}

export type FormattedConfigDataProps = ReturnType<typeof _formatData>;
