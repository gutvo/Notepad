// import {} from '@expo/ui/jetpack-compose'

import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import Divider from "./Divider";
import ListItem from "./ListItem";

interface ListProps {
  data: ListItemDataProps[];
  onClick?: (data: ListItemDataProps) => void;
  onLongPress?: (data: ListItemDataProps) => void;
}

export default function List({ data, onClick, onLongPress }: ListProps) {
  const theme = useTheme();

  return (
    <FlashList
      style={{ backgroundColor: theme.palette.background.body }}
      data={data}
      renderItem={({ item }) => (
        <ListItem item={item} onClick={onClick} onLongPress={onLongPress} />
      )}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}
