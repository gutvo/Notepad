import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import SearchInput from "@Components/inputs/SearchInput";
import useDebounce from "@Hooks/useDebounce";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import { useCallback, useLayoutEffect, useState } from "react";
import { View } from "react-native";

export default function useHeader() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [inputSearch, setInputSearch] = useState("");
  const debouncedSearch = useDebounce(inputSearch, 500);
  const [isSearching, setIsSearching] = useState(false);

  const handleGoBack = useCallback(() => {
    if (isSearching) {
      setInputSearch("");
      setIsSearching(false);
      return true;
    }

    navigation.back();

    return true;
  }, [isSearching, navigation]);

  useOnGoBack({ onBackPress: handleGoBack });

  const headerLeft = useCallback(
    () => (
      <BaseButton onPress={handleGoBack}>
        <BaseIcon
          name="arrow-left"
          color={theme.palette.primary.contrast}
          style={{ marginRight: theme.spacing(3) }}
        />
      </BaseButton>
    ),
    [handleGoBack, theme],
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
            Lembretes
          </BaseTypography>
        )}
      </View>
    ),
    [isSearching, inputSearch, theme.palette.primary.contrast],
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
