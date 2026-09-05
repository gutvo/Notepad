import actions from "@Actions";
import { FormattedConfigDataProps } from "@Actions/config/_formatData";
import { useActionList } from "@Hooks/useActionList";
import { useCallback, useEffect, useState } from "react";

export default function useGetDefaultSettings() {
  const [settingsGroupedByKey, setSettingsGroupedByKey] = useState<
    Record<ConfigKeyProps<"TEXT_FONT_SIZE">, string | boolean | number>
  >({
    TEXT_FONT_SIZE: 12,
  });

  const formatSettings = useCallback((configs: FormattedConfigDataProps[]) => {
    const groupedSettings = configs.reduce<
      Record<ConfigKeyProps, string | boolean | number>
    >(
      (accumulator, item) => {
        accumulator[item.key] = item.value;

        return accumulator;
      },
      {} as Record<ConfigKeyProps, string | boolean | number>,
    );

    setSettingsGroupedByKey(groupedSettings);
  }, []);

  const { data } = useActionList({ actions: actions.config });

  useEffect(() => {
    formatSettings(data);
  }, [data, formatSettings]);

  return [settingsGroupedByKey, setSettingsGroupedByKey] as const;
}
