import { useCallback, useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

interface ActionListStructure<DataType, Options> {
  list: (options?: Options) => Promise<DataType>;
  observer?: Observable<any>;
}

interface UseActionListProps<DataType, Options, ResultType = DataType> {
  actions: ActionListStructure<DataType, Options>;
  options?: Options;
  format?: (data: DataType) => Promise<ResultType>;
}

export function useActionList<
  DataType,
  Options = undefined,
  ResultType = DataType,
>({
  actions,
  options,
  format,
}: UseActionListProps<DataType, Options, ResultType>) {
  const [data, setData] = useState<ResultType>([] as ResultType);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result = await actions.list(options);

    const formatted = format
      ? await format(result)
      : (result as unknown as ResultType);

    setData(formatted);
    setLoading(false);
  }, [actions, options, format]);

  useEffect(() => {
    load();

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe(() => {
        load();
      });
    }

    return () => subscription?.unsubscribe();
  }, [load, actions]);

  return { data, loading, reload: load };
}
