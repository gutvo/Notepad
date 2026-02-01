import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import { useCallback, useLayoutEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import createUpdateOrder from "./createUpdateOrder";

interface UseHeaderProps {
  id?: number;
  description: string;
  handleOpenModal: () => void;
}

export default function useHeader({
  description,
  id,
  handleOpenModal,
}: UseHeaderProps) {
  const navigation = useNavigation();

  const handleGoBack = useCallback(async () => {
    if (!navigation.canGoBack()) return;

    await createUpdateOrder({ id, description });

    navigation.goBack();
  }, [description, id, navigation]);

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
