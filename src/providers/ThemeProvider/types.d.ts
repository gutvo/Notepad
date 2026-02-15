import { ThemePaletteProps } from "@Theme/mergeTheme";
import { FontSizeFunctionProps } from "./fontSize";
import { SpacingFunctionProps } from "./spacing";

interface ThemeProps {
  palette: ThemePaletteProps;
  spacing: SpacingFunctionProps;
  fontSize: FontSizeFunctionProps;
}

interface ThemeContextChangeThemeProps {
  themeCode?: number;
  darkMode?: boolean;
}

interface ThemeContextProps {
  changeTheme: (data: ThemeContextChangeThemeProps) => void;
  theme: ThemeProps;
  isThemeLoading: boolean;
}
