import { useCallback, useEffect, useRef, useState } from "react";
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
  const isMounted = useRef(false);

  const load = useCallback(async (): Promise<ResultType> => {
    const normalizedOptions =
      options && typeof options === "object"
        ? Object.entries(options as Record<string, any>).reduce(
            (accumulator, [key, value]) => {
              if (value === undefined || value === null) return accumulator;

              if (typeof value === "string" && value.trim() === "") {
                return accumulator;
              }

              if (Array.isArray(value) && value.length === 0) {
                return accumulator;
              }

              if (
                typeof value === "object" &&
                !Array.isArray(value) &&
                Object.values(value as Record<string, any>).every(
                  (nestedValue) =>
                    nestedValue === undefined ||
                    nestedValue === null ||
                    (typeof nestedValue === "string" &&
                      nestedValue.trim() === "") ||
                    (Array.isArray(nestedValue) && nestedValue.length === 0),
                )
              ) {
                return accumulator;
              }

              accumulator[key] = value;
              return accumulator;
            },
            {} as Record<string, any>,
          )
        : undefined;

    const result = await actions.list(
      normalizedOptions && Object.keys(normalizedOptions).length
        ? (normalizedOptions as Options)
        : undefined,
    );

    return format ? await format(result) : (result as unknown as ResultType);
  }, [actions, options, format]);

  const reload = useCallback(async (): Promise<ResultType> => {
    setLoading(true);

    try {
      const result = await load();
      if (isMounted.current) {
        setData(result);
      }
      return result;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [load]);

  useEffect(() => {
    isMounted.current = true;

    const fetchInitialData = async () => {
      try {
        const result = await load();
        if (isMounted.current) {
          setData(result);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    void fetchInitialData();

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe(() => {
        void reload();
      });
    }

    return () => {
      isMounted.current = false;
      subscription?.unsubscribe();
    };
  }, [actions, load, reload]);

  return { data, loading, reload };
}
