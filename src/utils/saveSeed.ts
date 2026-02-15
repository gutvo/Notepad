type ActionProps<DataProps> = {
  list: () => Promise<DataProps[]>;
  create: (data: DataProps) => Promise<DataProps>;
};

interface SaveSeedProps<DataProps> {
  seed: DataProps[];
  action: ActionProps<DataProps>;
  primaryKey: keyof DataProps;
}

export default async function saveSeed<DataProps>({
  seed,
  action,
  primaryKey,
}: SaveSeedProps<DataProps>) {
  const existData = await action.list();

  const groupExistDataByPrimaryKey = existData.reduce<
    Record<string, DataProps>
  >((accumulator, item) => {
    const key = String(item[primaryKey]);
    accumulator[key] = item;
    return accumulator;
  }, {});

  const createData = seed.reduce<DataProps[]>((accumulator, item) => {
    const key = String(item[primaryKey]);

    if (!groupExistDataByPrimaryKey[key]) {
      accumulator.push(item);
    }

    return accumulator;
  }, []);

  await Promise.all(createData.map((item) => action.create(item)));
}
