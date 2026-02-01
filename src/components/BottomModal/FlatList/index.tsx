import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StyleProp, ViewStyle } from "react-native";
import { useBottomModal } from "../context";
import BottomModalTitle from "../Title";

interface RenderItemProps<DataProps> {
  item: DataProps;
  index: number;
}

interface BottomModalFlatListProps<DataProps> {
  data: DataProps[];
  renderItem: (item: RenderItemProps<DataProps>) => React.JSX.Element;
  keyExtractor?: (item: DataProps) => string | number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function BottomModalFlatList<DataProps>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
}: BottomModalFlatListProps<DataProps>) {
  const { title } = useBottomModal();

  return (
    <BottomSheetFlatList<DataProps>
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={title ? <BottomModalTitle title={title} /> : null}
    />
  );
}
