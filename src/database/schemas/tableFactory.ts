import type { BuildColumns } from "drizzle-orm/column-builder";
import type {
  SQLiteColumnBuilderBase,
  SQLiteTableExtraConfigValue,
  SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

type ColumnBuilders = Record<string, SQLiteColumnBuilderBase>;

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
 * Cria uma tabela SQLite diretamente a partir do objeto de colunas.
 *
 * Toda tabela criada por esta função recebe automaticamente uma chave
 * primária inteira autoincremental chamada `id`.
 *
 * @param name - Nome da tabela no banco.
 * @param columns - Objeto com os builders Drizzle das colunas da tabela.
 * @param extraConfig - Configuração opcional para chaves estrangeiras, índices
 * e outras restrições da tabela.
 * @returns O schema da tabela com os tipos inferidos pelo Drizzle.
 */
export function createTable<
  TName extends string,
  TColumns extends ColumnBuilders,
>(
  name: TName,
  columns: TColumns,
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
  columns: ColumnBuilders,
  extraConfig?: (table: any) => SQLiteTableExtraConfigValue[],
): any {
  if ("id" in columns) {
    throw new Error(`A tabela "${name}" já define a coluna reservada "id".`);
  }

  return sqliteTable(
    name,
    {
      id: createIdColumn(),
      ...columns,
    },
    extraConfig,
  );
}

/**
 * Cria uma coluna de data armazenada como timestamp Unix em segundos.
 *
 * O Drizzle converte o valor inteiro armazenado para um `Date` do JavaScript.
 *
 * @param columnName - Nome da coluna no banco.
 * @param options - Use `nullable: true` para permitir valores nulos.
 * @returns Um builder de coluna de data com nulabilidade conforme a opção.
 */
function createDateColumnBuilder(columnName: string) {
  return integer(columnName, { mode: "timestamp" });
}

type DateColumnBuilder = ReturnType<typeof createDateColumnBuilder>;
type RequiredDateColumnBuilder = ReturnType<DateColumnBuilder["notNull"]>;

export function addDateColumn(columnName: string): RequiredDateColumnBuilder;
export function addDateColumn(
  columnName: string,
  options: { nullable: true },
): DateColumnBuilder;
export function addDateColumn(
  columnName: string,
  options?: { nullable: true },
) {
  const column = createDateColumnBuilder(columnName);
  return options?.nullable ? column : column.notNull();
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
