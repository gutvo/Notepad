import { configSchema } from "@Schemas";
import { Subject } from "rxjs";
import { createEntityActions } from "../createActions";
import _formatData from "./_formatData";

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
export type ConfigDataProps = ConfigRowProps;

const configObserver$ = new Subject<{ type: string; payload: unknown }>();

const configActions = createEntityActions({
  schema: configSchema,
  observer: configObserver$,
  formatData: _formatData,
  primaryKey: "key",
});

export default configActions;
