import useTheme from "@Hooks/useTheme";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import BaseDivider from "../Divider";

type BaseFlashListProps<DataProps> = FlashListProps<DataProps>;

export default function BaseFlashList<DataProps>({
  ...rest
}: BaseFlashListProps<DataProps>) {
  const theme = useTheme();

  return (
    <FlashList
      {...rest}
      ItemSeparatorComponent={() => <BaseDivider />}
      indicatorStyle={theme.palette.isDarkMode ? "white" : "black"}
      showsVerticalScrollIndicator
    />
  );
}
