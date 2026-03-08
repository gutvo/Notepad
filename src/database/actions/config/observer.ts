import { Subject } from "rxjs";

export interface ConfigEventProps {
  type: "CONFIG_UPDATED" | "CONFIG_DELETED" | "CONFIG_CREATED";
  payload: { ids: ConfigKeyProps[] };
}

const configEvents$ = new Subject<ConfigEventProps>();

export default configEvents$;
