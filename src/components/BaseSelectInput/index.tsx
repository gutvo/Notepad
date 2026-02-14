import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import BaseSelectModal from "./BaseSelectModal";

export interface BaseSelectInputProps<DataProps> {
  placeholder?: string;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  value?: BaseSelectValueProps;
  onChange?: (data: DataProps) => void;
  disabled?: boolean;
  getOptionSelected?: (
    option: DataProps,
    value?: BaseSelectValueProps,
  ) => BaseSelectValueProps;
}

export default function BaseSelectInput<DataProps>({
  placeholder,
  options,
  renderItem,
  value,
  onChange,
  disabled,
  getOptionSelected,
}: BaseSelectInputProps<DataProps>) {
  const theme = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenModal}
        disabled={disabled}
        style={{ flex: 1 }}
      >
        {placeholder && !value && !internalValue && (
          <BaseTypography
            style={{ backgroundColor: theme.palette.background.textSecondary }}
          >
            {placeholder}
          </BaseTypography>
        )}
        <BaseTypography>{value ?? internalValue}</BaseTypography>
      </TouchableOpacity>

      {isOpenModal && (
        <BaseSelectModal
          isOpenModal={isOpenModal}
          options={options}
          renderItem={renderItem}
          value={internalValue}
          onClose={handleCloseModal}
          onChange={onChange}
          getOptionSelected={getOptionSelected}
          setInternalValue={setInternalValue}
        />
      )}
    </>
  );
}
