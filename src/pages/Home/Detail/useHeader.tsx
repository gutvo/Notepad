import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import { useCallback, useLayoutEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

interface UseHeaderProps {
  handleOpenModal: () => void;
  onSubmit: () => Promise<void>;
  isDirty: boolean;
}

export default function useHeader({
  handleOpenModal,
  onSubmit,
  isDirty,
}: UseHeaderProps) {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    if (!navigation.canGoBack()) return true;

    if (!isDirty) {
      navigation.goBack();
      return true;
    }

    onSubmit()
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});

    return true;
  }, [isDirty, navigation, onSubmit]);

  useOnGoBack({ onBackPress: handleGoBack });

  const headerLeft = useCallback(
    () => (
      <TouchableOpacity onPress={handleGoBack} style={{ marginRight: 10 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.primary.contrast}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    ),
    [handleGoBack],
  );

  const headerTitle = useCallback(
    () => <Text style={{ color: colors.primary.contrast }}>Detalhes</Text>,
    [],
  );

  const headerRight = useCallback(
    () => (
      <TouchableOpacity onPress={handleOpenModal}>
        <MaterialCommunityIcons
          name="cog"
          size={24}
          color={colors.primary.contrast}
        />
      </TouchableOpacity>
    ),
    [handleOpenModal],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerLeft,
      headerRight,
    });
  }, [navigation, headerTitle, headerLeft, headerRight]);
}
