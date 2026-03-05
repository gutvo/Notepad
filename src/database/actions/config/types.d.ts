type ConfigValueMapProps = {
  TEXT_FONT_SIZE: number;
  DAYS_BEFORE_REMINDER: number;
  PRINTER_ID: string;
  PAPER_SIZE: "58mm" | "65mm" | "70mm" | "76mm" | "80mm";
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
