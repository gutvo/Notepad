/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import database from "@Database";
import { and, desc, eq, gt, inArray, isNull, like, lt, SQL } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { Subject } from "rxjs";

export interface ActionOptions<TCreate, TUpdate, TRow, TCustom = {}> {
  schema: any;
  formatData?: (data: any) => TRow;
  observer?: Subject<{ type: string; payload: any }>;

  // Aqui definimos customActions tipadas e opcionais
  customActions?: (row: TRow) => TCustom;
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
  TRow,
  TCustom extends Record<string, (...args: any[]) => any> = {},
>({
  schema,
  formatData,
  observer,
  customActions,
}: ActionOptions<TCreate, TUpdate, TRow, TCustom>) {
  type Row = TRow;
  type RowWithCustom = Row & NonNullable<TCustom>;

  async function findAction(id: number): Promise<RowWithCustom | null> {
    const [row] = await database.select().from(schema).where(eq(schema.id, id));
    if (!row) return null;

    let formatted = formatData ? formatData(row) : (row as Row);
    if (customActions) {
      formatted = {
        ...formatted,
        ...customActions(formatted),
      } as RowWithCustom;
    }

    return formatted;
  }

  async function listAction(
    filters: RowFilters<Row> = {},
  ): Promise<RowWithCustom[]> {
    const whereMatch: SQL[] = [];

    for (const key in filters) {
      const value = filters[key as keyof Row];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const op = value as FilterOperators<any>;

        if (op.equals !== undefined)
          whereMatch.push(eq(schema[key as keyof Row], op.equals));
        if (op.in) whereMatch.push(inArray(schema[key as keyof Row], op.in));
        if (op.lowerThan !== undefined)
          whereMatch.push(lt(schema[key as keyof Row], op.lowerThan));
        if (op.greaterThan !== undefined)
          whereMatch.push(gt(schema[key as keyof Row], op.greaterThan));
        if (op.between) {
          const [start, end] = op.between;
          whereMatch.push(
            and(
              gt(schema[key as keyof Row], start),
              lt(schema[key as keyof Row], end),
            ),
          );
        }
        if (op.like)
          whereMatch.push(like(schema[key as keyof Row], `%${op.like}%`));
      } else if (value === null) {
        whereMatch.push(isNull(schema[key as keyof Row]));
      } else if (typeof value === "string") {
        whereMatch.push(like(schema[key as keyof Row], `%${value}%`));
      } else if (Array.isArray(value)) {
        whereMatch.push(inArray(schema[key as keyof Row], value));
      } else {
        whereMatch.push(eq(schema[key as keyof Row], value));
      }
    }

    let rows = await database
      .select()
      .from(schema)
      .where(whereMatch.length ? and(...whereMatch) : undefined)
      .orderBy(desc(schema.id));

    rows = formatData ? rows.map(formatData) : (rows as Row[]);
    if (customActions) {
      rows = rows.map(
        (row) => ({ ...row, ...customActions(row) }) as RowWithCustom,
      );
    }

    return rows as RowWithCustom[];
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

    const result = await finalDatabase.insert(schema).values(dataArray);
    const lastInsertIds = Array.from(
      { length: dataArray.length },
      (_, i) => (result.lastInsertRowId ?? 0) + i,
    );

    observer?.next({ type: "CREATED", payload: { ids: lastInsertIds } });

    const created = await Promise.all(lastInsertIds.map(findAction));

    // Retorna apenas o primeiro se era um objeto só
    return Array.isArray(data) ? created : created[0];
  }

  async function updateAction(
    id: number,
    data: TUpdate,
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom>;
  async function updateAction(
    ids: number[],
    data: TUpdate,
    options?: { transaction?: ExpoSQLiteDatabase },
  ): Promise<RowWithCustom[]>;
  async function updateAction(
    idsOrId: number | number[],
    data: TUpdate,
    options?: { transaction?: ExpoSQLiteDatabase },
  ) {
    const finalDatabase = options?.transaction || database;

    // normaliza para array
    const idsArray = Array.isArray(idsOrId) ? idsOrId : [idsOrId];
    const isSingle = !Array.isArray(idsOrId); // flag para saber se era único

    await finalDatabase
      .update(schema)
      .set(data as any)
      .where(inArray(schema.id, idsArray));

    observer?.next({ type: "UPDATED", payload: { ids: idsArray } });

    const updated = await Promise.all(idsArray.map(findAction));

    // retorna array ou único
    return isSingle ? updated[0] : updated;
  }

  async function deleteAction(
    ids: number | number[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ) {
    const finalDatabase = options?.transaction || database;
    const idsArray = Array.isArray(ids) ? ids : [ids];

    await finalDatabase.delete(schema).where(inArray(schema.id, idsArray));
    observer?.next({ type: "DELETED", payload: { ids: idsArray } });
    return idsArray;
  }

  async function updateBatchAction(
    updates: ({ id: number } & TUpdate)[],
    options?: { transaction?: ExpoSQLiteDatabase },
  ) {
    const finalDatabase = options?.transaction || database;

    await Promise.all(
      updates.map(({ id, ...data }) =>
        finalDatabase.update(schema).set(data).where(eq(schema.id, id)),
      ),
    );

    const ids = updates.map((u) => u.id);
    observer?.next({ type: "UPDATED", payload: { ids } });

    return Promise.all(updates.map((u) => findAction(u.id)));
  }

  return {
    find: findAction,
    list: listAction,
    create: createAction,
    update: updateAction,
    delete: deleteAction,
    updateBatch: updateBatchAction,

    observer,
  };
}
