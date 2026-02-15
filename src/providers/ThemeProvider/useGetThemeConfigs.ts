import actions from "@Actions";
import { useActionList } from "@Hooks/useActionList";
import { useEffect, useMemo, useState } from "react";

type ThemeConfigKeys = Extract<
  ConfigDataProps,
  { key: "THEME_INDEX" | "THEME_IS_DARK_MODE" }
>["key"];

type ThemeConfigProps = {
  [KeyProps in ThemeConfigKeys]: Extract<
    ConfigDataProps,
    { key: KeyProps }
  >["value"];
};

const DEFAULT_THEME_CONFIG: ThemeConfigProps = {
  THEME_INDEX: 0,
  THEME_IS_DARK_MODE: true,
} satisfies ThemeConfigProps;

export default function useGetThemeConfigs() {
  const [themeConfigs, setThemeConfigs] =
    useState<ThemeConfigProps>(DEFAULT_THEME_CONFIG);

  const options = useMemo(
    () => ({
      findBy: { keys: ["THEME_INDEX", "THEME_IS_DARK_MODE"] as const },
    }),
    [],
  );

  const settings = useActionList(actions.config.list, options);

  useEffect(() => {
    const formattedData = settings.data.reduce<ThemeConfigProps>(
      (accumulator, setting) => {
        if (setting.key === "THEME_INDEX") {
          accumulator.THEME_INDEX = setting.value;
        }

        if (setting.key === "THEME_IS_DARK_MODE") {
          accumulator.THEME_IS_DARK_MODE = setting.value;
        }

        return accumulator;
      },
      { ...DEFAULT_THEME_CONFIG },
    );
    setThemeConfigs(formattedData);
  }, [settings.data]);

  return [themeConfigs, setThemeConfigs] as const;
}
