type ConfigTypeProps = "STRING" | "NUMBER" | "BOOLEAN";

type ConfigKeyProps = "TEXT_FONT_SIZE";

interface ConfigDataProps {
  key: ConfigKeyProps;
  type: ConfigTypeProps;
  value: string | number | boolean;
}

type CreateConfigDataProps = ConfigDataProps;

type UpdateConfigDataProps = Partial<CreateConfigDataProps>;
