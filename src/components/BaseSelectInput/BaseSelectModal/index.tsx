import BaseDivider from "@Components/BaseDivider";
import BaseModal from "@Components/BaseModal";
import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import { Dispatch, ReactNode, SetStateAction, useMemo } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";

interface BaseSelectModalProps<DataProps, ValueProps> {
  isOpenModal: boolean;
  onClose: () => void;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  onChange?: (data: DataProps) => void;
  getOptionValue?: (option: DataProps) => ValueProps;
  setInternalValue: Dispatch<SetStateAction<ValueProps | undefined>>;
  selectedItem: DataProps | undefined;
  setSelectedItem: Dispatch<SetStateAction<DataProps | undefined>>;
  itemHeight?: number; // altura de cada item (padding + conteúdo)
}

export default function BaseSelectModal<DataProps, ValueProps>({
  isOpenModal,
  onClose,
  renderItem,
  options,
  onChange,
  setInternalValue,
  getOptionValue,
  selectedItem,
  setSelectedItem,
  itemHeight = 60, // ajuste esse valor baseado no seu item
}: BaseSelectModalProps<DataProps, ValueProps>) {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();

  function handleSelectOption(item: DataProps) {
    setSelectedItem(item);
    onChange?.(item);

    const newValue = getOptionValue
      ? getOptionValue(item)
      : (item as unknown as ValueProps);

    setInternalValue?.(newValue);
    onClose();
  }

  // Calcula a altura ideal
  const listHeight = useMemo(() => {
    const maxHeight = screenHeight * 0.7;
    const contentHeight = options.length * itemHeight;

    // Retorna o menor valor entre o conteúdo e o máximo permitido
    return Math.min(contentHeight, maxHeight);
  }, [options.length, itemHeight, screenHeight]);

  return (
    <BaseModal.Modal
      visible={isOpenModal}
      title="Selecione"
      onClose={onClose}
      style={{ minHeight: 0 }}
    >
      <BaseModal.Container style={{ flex: undefined }}>
        <View style={{ height: listHeight }}>
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
            ItemSeparatorComponent={() => <BaseDivider />}
            showsVerticalScrollIndicator
            indicatorStyle={theme.palette.isDarkMode ? "white" : "black"}
          />
        </View>
      </BaseModal.Container>
    </BaseModal.Modal>
  );
}
