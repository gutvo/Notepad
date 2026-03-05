import locales, { LocaleKeysProps } from "@Locales";
import { useCallback } from "react";

interface FormatMessageDataProps {
  id: LocaleKeysProps;
}

export type FormatMessageProps = (
  { id }: FormatMessageDataProps,
  values?: Record<string, string | number | undefined>,
) => string;

export default function useLocale() {
  const formatMessage = useCallback(
    (
      { id }: FormatMessageDataProps,
      values?: Record<string, string | number | undefined>,
    ) => {
      let message: string = locales[id];

      if (values) {
        Object.keys(values).forEach((key) => {
          const regex = new RegExp(`{${key}}`, "g");
          message = message.replace(regex, String(values[key]));
        });
      }

      return message;
    },
    [],
  );

  return { formatMessage };
}
