type ConfigValueMapProps = {
  TEXT_FONT_SIZE: number;
  DAYS_BEFORE_REMINDER: number;
  TRASH_RETENTION_DAYS: number;
  THEME_INDEX: number;
  THEME_IS_DARK_MODE: boolean;
};

type ConfigTypeProps = "STRING" | "NUMBER" | "BOOLEAN";

type ConfigKeyProps<
  KeyProps extends keyof ConfigValueMapProps = keyof ConfigValueMapProps,
> = KeyProps;

type ConfigDataProps = {
  [K in keyof ConfigValueMapProps]: {
    key: K;
    type: ConfigTypeProps;
    value: string;
    parsedValue: ConfigValueMapProps[K];
  };
}[keyof ConfigValueMapProps];

type CreateConfigDataProps = ConfigDataProps;

type UpdateConfigDataProps = Partial<CreateConfigDataProps>;
