import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/bases/Typography";
import { ReactNode, useCallback, useEffect, useState } from "react";
import BaseSelectModal from "./BaseSelectModal";

export interface BaseSelectInputProps<DataProps, ValueProps> {
  placeholder?: string;
  renderItem: (data: BaseSelectRenderItemProps<DataProps>) => ReactNode;
  options: DataProps[];
  value?: ValueProps;
  onChange?: (data: DataProps) => void;
  disabled?: boolean;
  getOptionValue?: (option: DataProps) => ValueProps;
  renderInputValue?: (option?: DataProps) => ReactNode;
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

  const handleOpenModal = useCallback(() => {
    if (!disabled) {
      setIsOpenModal(true);
    }
  }, [disabled]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <BaseButton
        onPress={handleOpenModal}
        disabled={disabled}
        style={{ flex: 1 }}
      >
        {renderInputValue && renderInputValue(selectedItem)}

        {!renderInputValue && (
          <>
            {placeholder &&
              value === undefined &&
              internalValue === undefined && (
                <BaseTypography variant="PLACEHOLDER">
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
