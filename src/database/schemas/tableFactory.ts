import type { BuildColumns } from "drizzle-orm/column-builder";
import type {
  SQLiteColumnBuilderBase,
  SQLiteTableExtraConfigValue,
  SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

type ColumnBuilders = Record<string, SQLiteColumnBuilderBase>;
type TableModifier = () => object;

type UnionToIntersection<T> = (
  T extends unknown ? (value: T) => void : never
) extends (value: infer TIntersection) => void
  ? TIntersection
  : never;

type ModifierColumns<TModifiers extends readonly TableModifier[]> = [
  TModifiers[number],
] extends [never]
  ? object
  : UnionToIntersection<ReturnType<TModifiers[number]>>;

type BuiltTable<
  TName extends string,
  TColumns extends ColumnBuilders,
> = SQLiteTableWithColumns<{
  name: TName;
  schema: undefined;
  columns: BuildColumns<TName, TColumns, "sqlite">;
  dialect: "sqlite";
}>;

/**
 * Cria uma tabela SQLite a partir de um objeto com suas colunas e
 * modificadores opcionais.
 *
 * Toda tabela criada por esta função recebe automaticamente uma chave
 * primária inteira autoincremental chamada `id`.
 *
 * @param name - Nome da tabela no banco.
 * @param definition - Objeto com builders Drizzle das colunas específicas e
 * modificadores opcionais, como `addCreatedAt()`.
 * @param extraConfig - Configuração opcional para chaves estrangeiras, índices
 * e outras restrições da tabela.
 * @returns O schema da tabela com os tipos inferidos pelo Drizzle.
 */
export function createTable<
  TName extends string,
  TColumns extends ColumnBuilders,
  const TModifiers extends readonly TableModifier[],
>(
  name: TName,
  definition: {
    columns: TColumns;
    modifiers?: TModifiers;
  },
  extraConfig?: (
    table: BuildColumns<
      TName,
      TColumns & {
        id: ReturnType<typeof createIdColumn>;
      } & ModifierColumns<TModifiers>,
      "sqlite"
    >,
  ) => SQLiteTableExtraConfigValue[],
): BuiltTable<
  TName,
  TColumns & {
    id: ReturnType<typeof createIdColumn>;
  } & ModifierColumns<TModifiers>
>;
export function createTable<
  TName extends string,
  TColumns extends ColumnBuilders,
>(
  name: TName,
  definition: {
    columns: TColumns;
  },
  extraConfig?: (
    table: BuildColumns<
      TName,
      TColumns & { id: ReturnType<typeof createIdColumn> },
      "sqlite"
    >,
  ) => SQLiteTableExtraConfigValue[],
): BuiltTable<TName, TColumns & { id: ReturnType<typeof createIdColumn> }>;
export function createTable(
  name: string,
  definition: {
    columns: ColumnBuilders;
    modifiers?: readonly TableModifier[];
  },
  extraConfig?: (table: any) => SQLiteTableExtraConfigValue[],
): any {
  if ("id" in definition.columns) {
    throw new Error(`A tabela "${name}" já define a coluna reservada "id".`);
  }

  const tableColumns = Object.assign(
    {},
    { id: createIdColumn() },
    definition.columns,
    ...(definition.modifiers ?? []).map((modifier) => modifier()),
  );

  return sqliteTable(name, tableColumns, extraConfig);
}

/**
 * Cria um modificador que adiciona uma coluna timestamp obrigatória
 * `created_at`.
 *
 * @returns Um modificador de tabela com a coluna `created_at`.
 */
export function addCreatedAt() {
  return () => ({
    created_at: createTimestampColumn(),
  });
}

/**
 * Cria um modificador que adiciona uma coluna timestamp obrigatória
 * `updated_at`.
 *
 * @returns Um modificador de tabela com a coluna `updated_at`.
 */
export function addUpdatedAt() {
  return () => ({
    updated_at: createUpdatedAtColumn(),
  });
}

/**
 * Cria uma coluna inteira obrigatória de chave primária com geração automática
 * de identificadores.
 *
 * @param columnName - Nome da coluna no banco. O padrão é `"id"`.
 * @returns Um builder de coluna inteira do Drizzle configurado como chave
 * primária autoincremental.
 */
export function createIdColumn(columnName = "id") {
  return integer(columnName).primaryKey({ autoIncrement: true });
}

/**
 * Cria uma coluna obrigatória de timestamp armazenada como inteiro.
 *
 * O Drizzle converte o valor inteiro armazenado para um `Date` do JavaScript.
 *
 * @param columnName - Nome da coluna no banco. O padrão é `"created_at"`.
 * @returns Um builder de coluna timestamp não nula.
 */
export function createTimestampColumn(columnName = "created_at") {
  return integer(columnName, { mode: "timestamp" }).notNull();
}

/**
 * Cria uma coluna obrigatória de timestamp, normalmente usada para registrar
 * a última atualização de uma linha.
 *
 * @param columnName - Nome da coluna no banco. O padrão é `"updated_at"`.
 * @returns Um builder de coluna timestamp não nula.
 */
export function createUpdatedAtColumn(columnName = "updated_at") {
  return integer(columnName, { mode: "timestamp" }).notNull();
}
