// import {} from '@expo/ui/jetpack-compose'

import { FlashList } from "@shopify/flash-list";
import Divider from "./Divider";
import ListItem from "./ListItem";

interface ListProps {
  data: ListItemDataProps[];
  onClick?: (data: ListItemDataProps) => void;
  onLongPress?: (data: ListItemDataProps) => void;
}

export default function List({ data, onClick, onLongPress }: ListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <ListItem item={item} onClick={onClick} onLongPress={onLongPress} />
      )}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}
