type ConfigValueMapProps = {
  TEXT_FONT_SIZE: number;
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
