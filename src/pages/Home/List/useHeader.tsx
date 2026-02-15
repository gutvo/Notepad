import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTextField from "@Components/BaseTextField";
import BaseTypography from "@Components/BaseTypography";
import useNavigation from "@Hooks/useNavigation";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
import { useCallback, useLayoutEffect, useState } from "react";
import { View } from "react-native";

export default function useHeader() {
  const theme = useTheme();
  const navigation = useNavigation();
  const openModal = useOpenModal();

  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleOnClick = useCallback(() => {
    if (isSearching) {
      setSearch(inputSearch);
      return;
    }

    setIsSearching((value) => !value);
  }, [inputSearch, isSearching]);

  function handleGoBack() {
    setSearch("");
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
          <BaseTextField
            onChangeText={(value) => setInputSearch(value)}
            value={inputSearch}
            style={{
              borderColor: theme.palette.primary.contrast,
              color: theme.palette.primary.contrast,
            }}
            placeholderTextColor={theme.palette.primary.contrast}
            placeholder="Pesquisar"
          />
        ) : (
          <BaseTypography style={{ color: theme.palette.primary.contrast }}>
            Página incial
          </BaseTypography>
        )}
      </View>
    ),
    [isSearching, inputSearch, theme.palette.primary.contrast],
  );

  const headerRight = useCallback(
    () => (
      <BaseButton onPress={handleOnClick}>
        <BaseIcon
          name="magnify"
          color={theme.palette.primary.contrast}
          style={{ marginLeft: theme.spacing(3) }}
        />
      </BaseButton>
    ),
    [handleOnClick, theme],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerCenter,
      headerRight: headerRight,
      headerLeft,
    });
  }, [navigation, headerRight, headerCenter, headerLeft]);

  return { search };
}
