import BaseModal from "@Components/BaseModal";
import Divider from "@Components/List/Divider";
import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TouchableOpacity } from "react-native";

interface BaseSelectModalProps<DataProps> {
  isOpenModal: boolean;
  onClose: () => void;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  value?: BaseSelectValueProps;
  onChange?: (data: DataProps) => void;
  getOptionSelected?: (
    option: DataProps,
    value?: BaseSelectValueProps,
  ) => BaseSelectValueProps;
  setInternalValue: Dispatch<SetStateAction<BaseSelectValueProps>>;
}

export default function BaseSelectModal<DataProps>({
  isOpenModal,
  onClose,
  renderItem,
  options,
  value,
  onChange,
  getOptionSelected,
  setInternalValue,
}: BaseSelectModalProps<DataProps>) {
  const theme = useTheme();

  const [selectedItem, setSelectedItem] = useState<DataProps | undefined>(
    options.find((option) =>
      getOptionSelected ? getOptionSelected(option, value) : option === value,
    ),
  );

  useEffect(() => {
    setSelectedItem(
      options.find((option) =>
        getOptionSelected ? getOptionSelected(option, value) : option === value,
      ),
    );
  }, [value, options, getOptionSelected]);

  function handleSelectOption(item: DataProps) {
    setSelectedItem(item);
    onChange?.(item);

    const newValue = getOptionSelected
      ? getOptionSelected(item)
      : (item as unknown as BaseSelectValueProps);
    setInternalValue?.(newValue);
    onClose();
  }

  return (
    <BaseModal.Modal
      visible={isOpenModal}
      title="Selecione"
      onClose={onClose}
      style={{ minHeight: 0, maxHeight: "70%" }}
    >
      <BaseModal.Container>
        <FlashList
          data={options}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelectOption(item)}
              style={{ padding: theme.spacing(4) }}
            >
              {renderItem({ item, selectedItem, index })}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator
          indicatorStyle={theme.palette.isDarkMode ? "white" : "black"}
        />
      </BaseModal.Container>
    </BaseModal.Modal>
  );
}
