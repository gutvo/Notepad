interface BaseSelectRenderItemProps<DataProps> {
  item: DataProps;
  selectedItem: DataProps | undefined;
  index: number;
}

type BaseSelectValueProps = string | number | undefined;
