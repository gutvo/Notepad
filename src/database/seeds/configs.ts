import { ConfigRowProps } from "@Actions/config";
import { Appearance } from "react-native";

const configSeeds: ConfigRowProps[] = [
  { key: "TEXT_FONT_SIZE", value: "20", type: "NUMBER" },
  { key: "DAYS_BEFORE_REMINDER", value: "0", type: "NUMBER" },
  { key: "TRASH_RETENTION_DAYS", value: "30", type: "NUMBER" },
  { key: "THEME_INDEX", value: "0", type: "NUMBER" },
  {
    key: "THEME_IS_DARK_MODE",
    value: String(Appearance.getColorScheme() === "dark"),
    type: "BOOLEAN",
  },
];

export default configSeeds;
