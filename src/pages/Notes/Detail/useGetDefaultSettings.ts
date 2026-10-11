import actions from "@Actions";
import { FormattedConfigDataProps } from "@Actions/config/_formatData";
import { useActionList } from "@Hooks/useActionList";
import { useMemo } from "react";

export default function useGetDefaultSettings() {
  const { data } = useActionList({ actions: actions.config });

  const settingsGroupedByKey = useMemo(() => {
    const baseDefaults: Record<ConfigKeyProps, string | boolean | number> = {
      TEXT_FONT_SIZE: 12,
      DAYS_BEFORE_REMINDER: 1,
      TRASH_RETENTION_DAYS: 30,
    };

    const groupedSettings = (data as FormattedConfigDataProps[]).reduce<
      Record<ConfigKeyProps, string | boolean | number>
    >(
      (accumulator, item) => {
        accumulator[item.key] = item.parsedValue;

        return accumulator;
      },
      { ...baseDefaults },
    );

    return groupedSettings;
  }, [data]);

  return [settingsGroupedByKey] as const;
}
