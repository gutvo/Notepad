import BaseTextField from "@Components/bases/TextField";
import useTheme from "@Hooks/useTheme";
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
    <BaseTextField
      onChangeText={(value) => setInputSearch(value)}
      value={inputSearch}
      style={{
        borderColor: theme.palette.primary.contrast,
        borderWidth: 1,
        color: theme.palette.primary.contrast,
      }}
      placeholder="Pesquisar"
    />
  );
}
