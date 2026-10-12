import { useCallback, useEffect, useRef, useState } from "react";
import { Observable, Subscription } from "rxjs";

const PAGE_SIZE = 30;

interface PaginatedQuery<DataType> {
  limit: (count: number) => PaginatedQuery<DataType>;
  offset: (count: number) => PaginatedQuery<DataType>;
  execute: () => Promise<DataType[]>;
}

interface PaginatedActionListStructure<DataType, Options> {
  query: (options?: Options) => PaginatedQuery<DataType>;
  observer?: Observable<unknown>;
}

interface UsePaginatedActionListProps<
  DataType,
  Options,
  ResultType = DataType,
> {
  actions: PaginatedActionListStructure<DataType, Options>;
  options?: Options;
  format?: (data: DataType[]) => Promise<ResultType[]>;
}

export function usePaginatedActionList<
  DataType,
  Options = undefined,
  ResultType = DataType,
>({
  actions,
  options,
  format,
}: UsePaginatedActionListProps<DataType, Options, ResultType>) {
  const [data, setData] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const offset = useRef(0);
  const requestId = useRef(0);
  const loadMoreRequestId = useRef(0);
  const loadingMoreRef = useRef(false);
  const isMounted = useRef(false);

  const loadRows = useCallback(
    async (limit: number, rowOffset: number) => {
      const rows = await actions
        .query(options)
        .limit(limit)
        .offset(rowOffset)
        .execute();

      return {
        rows,
        formattedRows: format
          ? await format(rows)
          : (rows as unknown as ResultType[]),
      };
    },
    [actions, format, options],
  );

  const reload = useCallback(async () => {
    const currentRequestId = ++requestId.current;
    const limit = Math.max(PAGE_SIZE, offset.current);
    loadMoreRequestId.current += 1;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    setLoading(true);

    try {
      const { rows, formattedRows } = await loadRows(limit, 0);

      if (isMounted.current && currentRequestId === requestId.current) {
        offset.current = rows.length;
        setData(formattedRows);
        setHasMore(rows.length === limit);
      }
    } finally {
      if (isMounted.current && currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }, [loadRows]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMoreRef.current || loading) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);
    const currentRequestId = requestId.current;
    const currentLoadMoreRequestId = ++loadMoreRequestId.current;

    try {
      const { rows, formattedRows } = await loadRows(PAGE_SIZE, offset.current);

      if (isMounted.current && currentRequestId === requestId.current) {
        offset.current += rows.length;
        setData((currentData) => [...currentData, ...formattedRows]);
        setHasMore(rows.length === PAGE_SIZE);
      }
    } finally {
      if (currentLoadMoreRequestId === loadMoreRequestId.current) {
        loadingMoreRef.current = false;
        if (isMounted.current) setLoadingMore(false);
      }
    }
  }, [hasMore, loadRows, loading]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
      requestId.current += 1;
    };
  }, []);

  useEffect(() => {
    void Promise.resolve().then(reload);

    let subscription: Subscription | undefined;

    if (actions.observer) {
      subscription = actions.observer.subscribe(() => {
        void reload();
      });
    }

    return () => subscription?.unsubscribe();
  }, [actions, reload]);

  return { data, loading, loadingMore, hasMore, loadMore, reload } as const;
}
