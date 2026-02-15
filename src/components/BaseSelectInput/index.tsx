import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/BaseTypography";
import useTheme from "@Hooks/useTheme";
import { ReactNode, useEffect, useState } from "react";
import BaseSelectModal from "./BaseSelectModal";

export interface BaseSelectInputProps<DataProps, ValueProps> {
  placeholder?: string;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  value?: ValueProps;
  onChange?: (data: DataProps) => void;
  disabled?: boolean;
  getOptionValue?: (option: DataProps) => ValueProps;
  renderInputValue?: (value: ValueProps) => ReactNode;
}

export default function BaseSelectInput<
  DataProps,
  ValueProps extends BaseSelectValueProps,
>({
  placeholder,
  options,
  renderItem,
  value,
  onChange,
  disabled,
  renderInputValue,
  getOptionValue,
}: BaseSelectInputProps<DataProps, ValueProps>) {
  const theme = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [selectedItem, setSelectedItem] = useState<DataProps | undefined>(
    options.find((option) =>
      getOptionValue ? getOptionValue(option) === value : option === value,
    ),
  );

  useEffect(() => {
    setSelectedItem(
      options.find((option) =>
        getOptionValue ? getOptionValue(option) === value : option === value,
      ),
    );
  }, [value, options, getOptionValue]);

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
      <BaseButton
        onPress={handleOpenModal}
        disabled={disabled}
        style={{ flex: 1 }}
      >
        {renderInputValue &&
          internalValue !== undefined &&
          renderInputValue(internalValue)}

        {!renderInputValue && (
          <>
            {placeholder &&
              value === undefined &&
              internalValue === undefined && (
                <BaseTypography
                  style={{
                    backgroundColor: theme.palette.background.textSecondary,
                  }}
                >
                  {placeholder}
                </BaseTypography>
              )}

            <BaseTypography>{value ?? internalValue}</BaseTypography>
          </>
        )}
      </BaseButton>

      {isOpenModal && (
        <BaseSelectModal
          isOpenModal={isOpenModal}
          options={options}
          renderItem={renderItem}
          onClose={handleCloseModal}
          onChange={onChange}
          setInternalValue={setInternalValue}
          getOptionValue={getOptionValue}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
}
