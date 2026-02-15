import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_INDEX_KEY = "@notepad:theme_index";
const THEME_DARK_MODE_KEY = "@notepad:theme_dark_mode";

const DEFAULT_THEME_INDEX = 0;
const DEFAULT_DARK_MODE = true;

export async function getThemeIndex(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(THEME_INDEX_KEY);
    return value ? parseInt(value, 10) : DEFAULT_THEME_INDEX;
  } catch {
    return DEFAULT_THEME_INDEX;
  }
}

export async function setThemeIndex(index: number): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_INDEX_KEY, String(index));
  } catch {
    // Silently fail
  }
}

export async function getDarkMode(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(THEME_DARK_MODE_KEY);
    return value ? JSON.parse(value) : DEFAULT_DARK_MODE;
  } catch {
    return DEFAULT_DARK_MODE;
  }
}

export async function setDarkMode(isDarkMode: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_DARK_MODE_KEY, JSON.stringify(isDarkMode));
  } catch {
    // Silently fail
  }
}

export type ThemeStorageConfigProps = {
  themeIndex: number;
  isDarkMode: boolean;
};

export async function getThemeConfig(): Promise<ThemeStorageConfigProps> {
  const [themeIndex, isDarkMode] = await Promise.all([
    getThemeIndex(),
    getDarkMode(),
  ]);

  return {
    themeIndex,
    isDarkMode,
  };
}
