type ConfigValueMapProps = {
  TEXT_FONT_SIZE: number;
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
    value: ConfigValueMapProps[K];
  };
}[keyof ConfigValueMapProps];

type CreateConfigDataProps = ConfigDataProps;

type UpdateConfigDataProps = Partial<CreateConfigDataProps>;
