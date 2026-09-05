/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import database from "@Database";
import { and, eq, gt, gte, inArray, lt, lte, sql } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { Subject } from "rxjs";

export interface ActionOptions<
  TCreate,
  TUpdate,
  TRow,
  TCustom = {},
  TFormatted = TRow,
> {
  schema: any;
  primaryKey?: keyof TRow;
  formatData?: (data: TRow) => TFormatted;
  observer?: Subject<{ type: string; payload: any }>;
  customActions?: (row: TFormatted) => TCustom;
}

type FilterOperators<T> = {
  equals?: T;
  in?: T[];
  lowerThan?: T;
  greaterThan?: T;
  between?: [T, T];
  like?: T extends string ? string : never;
};

type RowFilters<Row> = {
  [K in keyof Row]?: FilterOperators<Row[K]> | Row[K];
};

export function createActions<
  TCreate,
  TUpdate,
  TRow extends Record<string, any>,
  TCustom extends Record<string, (...args: any[]) => any> = {},
  TFormatted = TRow,
  TPrimaryKey extends keyof TRow = keyof TRow & string,
>({
  schema,
  primaryKey,
  formatData,
  observer,
  customActions,
}: ActionOptions<TCreate, TUpdate, TRow, TCustom, TFormatted> & {
  primaryKey?: TPrimaryKey;
}) {
  type Row = TFormatted;
  type RowWithCustom = Row & NonNullable<TCustom>;
  type PrimaryKeyValue = TRow[TPrimaryKey];

  function getPrimaryKeyField() {
    const field = (schema as any)[primaryKey ?? "id"];
    return field ?? (schema as any).id;
  }

  function buildWhereClause(filters: RowFilters<Row> = {}) {
    const clauses: any[] = [];

    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      const column = (schema as any)[key];
      if (!column) return;

      if (typeof value === "object" && !Array.isArray(value)) {
        const operator = value as FilterOperators<any>;

        if (operator.equals !== undefined) {
          clauses.push(eq(column, operator.equals));
        }

        if (operator.in && operator.in.length) {
          clauses.push(inArray(column, operator.in));
        }

        if (operator.lowerThan !== undefined) {
          clauses.push(lt(column, operator.lowerThan));
        }

        if (operator.greaterThan !== undefined) {
          clauses.push(gt(column, operator.greaterThan));
        }

        if (operator.between) {
          const [start, end] = operator.between;
          clauses.push(and(gte(column, start), lte(column, end)));
        }

        if (operator.like !== undefined) {
          clauses.push(sql`${column} LIKE ${`%${operator.like}%`}`);
        }

        return;
      }

      clauses.push(eq(column, value));
    });

    return clauses.length ? and(...clauses) : undefined;
  }

  async function findAction(
    id: PrimaryKeyValue,
  ): Promise<RowWithCustom | null> {
    const primaryKeyField = getPrimaryKeyField();

    const [row] = await database
      .select()
      .from(schema)
      .where(eq(primaryKeyField, id));

    if (!row) return null;

    let formatted: Row = formatData ? formatData(row as TRow) : (row as Row);

    if (customActions) {
      formatted = {
        ...formatted,
        ...customActions(formatted),
      } as RowWithCustom;
    }

    return formatted as RowWithCustom;
  }

  async function listAction(
    filters: RowFilters<Row> = {},
  ): Promise<RowWithCustom[]> {
    const whereClause = buildWhereClause(filters);
    const primaryKeyField = getPrimaryKeyField();

    const rows =
      primaryKeyField && typeof primaryKeyField.desc === "function"
        ? await database
            .select()
            .from(schema)
            .where(whereClause)
            .orderBy(primaryKeyField.desc())
        : await database.select().from(schema).where(whereClause);

    const formattedRows = formatData
      ? rows.map((row) => formatData(row as TRow))
      : (rows as Row[]);

    if (customActions) {
      return formattedRows.map(
        (row) => ({ ...row, ...customActions(row) }) as RowWithCustom,
      );
    }

    return formattedRows as RowWithCustom[];
  }

  async function createAction(
    data: TCreate,
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom>;
  async function createAction(
    data: TCreate[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom[]>;
  async function createAction(
    data: TCreate | TCreate[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom | RowWithCustom[]> {
    const finalDatabase = options?.transaction || database;
    const dataArray = Array.isArray(data) ? data : [data];

    const result = await finalDatabase.insert(schema).values(dataArray as any);
    const lastInsertIds = Array.from(
      { length: dataArray.length },
      (_, i) => Number(result.lastInsertRowId ?? 0) + i,
    );

    observer?.next({ type: "CREATED", payload: { ids: lastInsertIds } });

    const created = await Promise.all(
      lastInsertIds.map((id) => findAction(id as PrimaryKeyValue)),
    );
    const validCreated = created.filter(Boolean) as RowWithCustom[];

    return Array.isArray(data)
      ? validCreated
      : (validCreated[0] as RowWithCustom);
  }

  async function updateAction(
    idsOrId: PrimaryKeyValue | PrimaryKeyValue[],
    data: TUpdate,
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom | RowWithCustom[]> {
    const finalDatabase = options?.transaction || database;
    const idsArray = Array.isArray(idsOrId) ? idsOrId : [idsOrId];
    const isSingle = !Array.isArray(idsOrId);

    const primaryKeyField = getPrimaryKeyField();

    await finalDatabase
      .update(schema)
      .set(data as any)
      .where(inArray(primaryKeyField, idsArray as any));

    observer?.next({ type: "UPDATED", payload: { ids: idsArray } });

    const updated = await Promise.all(
      idsArray.map((id) => findAction(id as PrimaryKeyValue)),
    );
    const validUpdated = updated.filter(Boolean) as RowWithCustom[];

    return isSingle ? validUpdated[0] : validUpdated;
  }

  async function deleteAction(
    ids: PrimaryKeyValue | PrimaryKeyValue[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ) {
    const finalDatabase = options?.transaction || database;
    const idsArray = Array.isArray(ids) ? ids : [ids];

    const primaryKeyField = getPrimaryKeyField();

    await finalDatabase
      .delete(schema)
      .where(inArray(primaryKeyField, idsArray as any));

    observer?.next({ type: "DELETED", payload: { ids: idsArray } });
    return idsArray;
  }

  async function updateBatchAction(
    updates: ({ id: PrimaryKeyValue } & TUpdate)[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ) {
    const finalDatabase = options?.transaction || database;

    const primaryKeyField = getPrimaryKeyField();

    await Promise.all(
      updates.map(({ id, ...data }) =>
        finalDatabase
          .update(schema)
          .set(data as any)
          .where(eq(primaryKeyField, id)),
      ),
    );

    const ids = updates.map((u) => u.id);
    observer?.next({ type: "UPDATED", payload: { ids } });

    return Promise.all(
      updates.map((update) => findAction(update.id as PrimaryKeyValue)),
    );
  }

  return {
    find: findAction,
    list: listAction,
    query: listAction,
    create: createAction,
    update: updateAction,
    delete: deleteAction,
    updateBatch: updateBatchAction,
    observer,
  };
}
