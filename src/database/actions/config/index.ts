import { configSchema } from "@Schemas";
import { Subject } from "rxjs";
import { createActions } from "../createActions";
import _formatData, { FormattedConfigDataProps } from "./_formatData";

export type ConfigValueMapProps = {
  TEXT_FONT_SIZE: number;
  DAYS_BEFORE_REMINDER: number;
  PRINTER_ID: string;
  PAPER_SIZE: "58mm" | "65mm" | "70mm" | "76mm" | "80mm";
};

export type ConfigRowProps = {
  key: keyof ConfigValueMapProps;
  type: ConfigTypeProps;
  value: string;
};
type ConfigCreateProps = Omit<ConfigRowProps, "id">;
type ConfigUpdateProps = Partial<Omit<ConfigRowProps, "id">>;
export type ConfigDataProps = ConfigRowProps;

const configObserver$ = new Subject<{ type: string; payload: any }>();

const configActions = createActions<
  ConfigCreateProps,
  ConfigUpdateProps,
  ConfigRowProps,
  {},
  FormattedConfigDataProps,
  "key"
>({
  schema: configSchema,
  observer: configObserver$,
  formatData: _formatData,
  primaryKey: "key",
});

export default configActions;
