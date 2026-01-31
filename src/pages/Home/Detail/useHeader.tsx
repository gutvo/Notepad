import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import { useCallback, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function useHeader() {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    if (!navigation.canGoBack()) return;

    navigation.goBack();
  }, [navigation]);

  const headerLeft = useCallback(
    () => (
      <>
        <TouchableOpacity onPress={handleGoBack} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={colors.primary.contrast}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </>
    ),
    [handleGoBack],
  );

  const headerCenter = useCallback(
    () => (
      <View>
        <Text style={{ color: colors.primary.contrast }}>Detalhes</Text>
      </View>
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerCenter,
      headerLeft,
    });
  }, [navigation, headerCenter, headerLeft]);
}
