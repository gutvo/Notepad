import BaseTextInput from "@Components/bases/TextInput";
import useTheme from "@Hooks/useTheme";
import withOpacity from "@Utils/color/withOpacity";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  inputSearch: string;
  setInputSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({
  setInputSearch,
  inputSearch,
}: SearchInputProps) {
  const theme = useTheme();

  return (
    <BaseTextInput
      onChangeText={(value) => setInputSearch(value)}
      value={inputSearch}
      placeholderTextColor={withOpacity(theme.palette.primary.contrast, 0.7)}
      style={{
        borderColor: theme.palette.primary.contrast,
        borderWidth: 1,
        color: theme.palette.primary.contrast,
      }}
      placeholder="Pesquisar"
    />
  );
}
