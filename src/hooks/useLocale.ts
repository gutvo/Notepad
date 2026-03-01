import locales, { LocaleKeysProps } from "@Locales";
import { useCallback } from "react";

interface FormatMessageProps {
  id: LocaleKeysProps;
}

export default function useLocale() {
  const formatMessage = useCallback(
    ({ id }: FormatMessageProps, values?: Record<string, string | number>) => {
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
