import BaseButton from "@Components/bases/Button";
import BaseFlashList from "@Components/bases/FlashList";
import BaseModal from "@Components/bases/Modal";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import { Dispatch, ReactNode, SetStateAction, useMemo } from "react";
import { useWindowDimensions } from "react-native";

interface BaseSelectModalProps<DataProps, ValueProps> {
  isOpenModal: boolean;
  onClose: () => void;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  onChange?: (data: DataProps) => void;
  getOptionValue?: (option: DataProps) => ValueProps;
  setInternalValue: Dispatch<SetStateAction<ValueProps | undefined>>;
  selectedItem: DataProps | undefined;
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
  itemHeight = 60.5, // ajuste esse valor baseado no seu item
}: BaseSelectModalProps<DataProps, ValueProps>) {
  const { formatMessage } = useLocale();
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();

  function handleSelectOption(item: DataProps) {
    onChange?.(item);

    const newValue = getOptionValue
      ? getOptionValue(item)
      : (item as unknown as ValueProps);

    setInternalValue?.(newValue);
    onClose();
  }

  const listHeight = useMemo(() => {
    const availableModalHeight = (screenHeight - theme.spacing(8)) * 0.8 - 40;
    const contentHeight = options.length * itemHeight;

    return Math.min(contentHeight, Math.max(availableModalHeight, 0));
  }, [options.length, itemHeight, screenHeight, theme]);

  return (
    <BaseModal.Modal
      visible={isOpenModal}
      title={formatMessage({ id: "modals.select.title" })}
      onClose={onClose}
      style={{ minHeight: 0 }}
    >
      <BaseModal.Container style={{ height: listHeight }}>
        <BaseFlashList
          data={options}
          renderItem={({ item, index }) => (
            <BaseButton onPress={() => handleSelectOption(item)}>
              {renderItem({ item, selectedItem, index })}
            </BaseButton>
          )}
        />
      </BaseModal.Container>
    </BaseModal.Modal>
  );
}
