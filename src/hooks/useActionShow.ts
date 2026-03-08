import { useCallback, useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

interface ActionShowStructure<DataType> {
  find: (id: number) => Promise<DataType | null>;
  observer?: Observable<any>;
}

interface UseActionShowProps<DataType, ResultType = DataType> {
  actions: ActionShowStructure<DataType>;
  id: number | undefined;
  format?: (data: DataType | undefined) => Promise<ResultType>;
}

export function useActionShow<DataType, ResultType = DataType>({
  actions,
  id,
  format,
}: UseActionShowProps<DataType, ResultType>) {
  const [data, setData] = useState<ResultType | undefined>();
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    if (id) {
      const result = await actions.find(id);

      const formatted = format
        ? result
          ? await format(result)
          : undefined
        : (result as unknown as ResultType | undefined);

      setData(formatted);
    }

    setLoading(false);
  }, [actions, id, format]);

  useEffect(() => {
    load();

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe((event: any) => {
        if (event?.payload?.ids?.includes(id)) {
          load();
        }
      });
    }

    return () => subscription?.unsubscribe();
  }, [load, actions, id]);

  return { data, loading, reload: load };
}
