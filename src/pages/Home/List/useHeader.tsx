import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import SearchInput from "@Components/inputs/SearchInput";
import useDebounce from "@Hooks/useDebounce";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { useCallback, useLayoutEffect, useState } from "react";
import { View } from "react-native";

export default function useHeader() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();

  const [inputSearch, setInputSearch] = useState("");
  const debouncedSearch = useDebounce(inputSearch, 500);
  const [isSearching, setIsSearching] = useState(false);

  function handleGoBack() {
    setInputSearch("");
    setIsSearching(false);
  }

  const headerLeft = useCallback(
    () => (
      <>
        {isSearching ? (
          <BaseButton onPress={handleGoBack}>
            <BaseIcon
              name="arrow-left"
              color={theme.palette.primary.contrast}
              style={{ marginRight: theme.spacing(3) }}
            />
          </BaseButton>
        ) : (
          <BaseButton
            onPress={() => {
              openModal("SIDEBAR");
            }}
          >
            <BaseIcon
              name="menu"
              color={theme.palette.primary.contrast}
              style={{ marginRight: theme.spacing(3) }}
            />
          </BaseButton>
        )}
      </>
    ),
    [isSearching, openModal, theme],
  );

  const headerCenter = useCallback(
    () => (
      <View>
        {isSearching ? (
          <SearchInput
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
          />
        ) : (
          <BaseTypography style={{ color: theme.palette.primary.contrast }}>
            {formatMessage({ id: "pages.home-list.title" })}
          </BaseTypography>
        )}
      </View>
    ),
    [isSearching, inputSearch, theme.palette.primary.contrast, formatMessage],
  );

  const headerRight = useCallback(
    () =>
      !isSearching && (
        <BaseButton onPress={() => setIsSearching((value) => !value)}>
          <BaseIcon
            name="magnify"
            color={theme.palette.primary.contrast}
            style={{ marginLeft: theme.spacing(3) }}
          />
        </BaseButton>
      ),
    [isSearching, theme],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerCenter,
      headerRight: headerRight,
      headerLeft,
    });
  }, [navigation, headerRight, headerCenter, headerLeft]);

  return { search: debouncedSearch };
}
