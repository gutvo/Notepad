import colors from "@Colors";
import BaseTextField from "@Components/BaseTextField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function useHeader() {
  const navigation = useNavigation();

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
        {isSearching && (
          <TouchableOpacity onPress={handleGoBack}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color={colors.primary.contrast}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        )}
      </>
    ),
    [isSearching],
  );

  const headerCenter = useCallback(
    () => (
      <View>
        {isSearching ? (
          <BaseTextField
            onChangeText={(value) => setInputSearch(value)}
            value={inputSearch}
            style={{
              borderColor: colors.primary.contrast,
              color: colors.primary.contrast,
            }}
            placeholderTextColor={colors.primary.contrast}
            placeholder="Pesquisar"
          />
        ) : (
          <Text style={{ color: colors.primary.contrast }}>Página incial</Text>
        )}
      </View>
    ),
    [isSearching, inputSearch],
  );

  const headerRight = useCallback(
    () => (
      <TouchableOpacity onPress={handleOnClick}>
        <MaterialCommunityIcons
          name="magnify"
          size={28}
          color={colors.primary.contrast}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    [handleOnClick],
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
