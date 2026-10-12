import { getThemeConfig, ThemeStorageConfigProps } from "@Utils/themeStorage";
import { useEffect, useState } from "react";

export default function useGetThemeConfigs() {
  const [themeConfigs, setThemeConfigs] = useState<ThemeStorageConfigProps>();

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      try {
        const settings = await getThemeConfig();
        if (isMounted) setThemeConfigs(settings);
      } catch {}
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return [themeConfigs, setThemeConfigs] as const;
}
