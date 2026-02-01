type ConfigTypeProps = "STRING" | "NUMBER" | "BOOLEAN";

interface ConfigDataProps {
  key: string;
  type: ConfigTypeProps;
  value: string;
}

type CreateConfigDataProps = ConfigDataProps;

type UpdateConfigDataProps = Partial<CreateConfigDataProps>;
