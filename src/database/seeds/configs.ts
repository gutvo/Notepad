import { ConfigRowProps } from "@Actions/config";

const configSeeds: ConfigRowProps[] = [
  { key: "TEXT_FONT_SIZE", value: "20", type: "NUMBER" },
  { key: "DAYS_BEFORE_REMINDER", value: "0", type: "NUMBER" },
  { key: "TRASH_RETENTION_DAYS", value: "30", type: "NUMBER" },
];

export default configSeeds;
