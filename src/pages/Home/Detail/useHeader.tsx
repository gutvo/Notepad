import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import { useCallback, useLayoutEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

interface UseHeaderProps {
  handleOpenModal: () => void;
  onSubmit: () => Promise<void>;
}

export default function useHeader({
  handleOpenModal,
  onSubmit,
}: UseHeaderProps) {
  const navigation = useNavigation();

  const headerLeft = useCallback(
    () => (
      <TouchableOpacity onPress={onSubmit} style={{ marginRight: 10 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.primary.contrast}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    ),
    [onSubmit],
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
