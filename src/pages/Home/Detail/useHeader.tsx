import colors from "@Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNavigation from "@Hooks/useNavigation";
import useToast from "@Hooks/useToast";
import { useCallback, useLayoutEffect } from "react";
import { UseFormGetValues } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import createNote from "./utils/createNote";
import updateNote from "./utils/updateNote";

interface UseHeaderProps {
  id?: number;
  handleOpenModal: () => void;
  getValues: UseFormGetValues<{ description: string }>;
  isDirty: boolean;
}

export default function useHeader({
  id,
  handleOpenModal,
  getValues,
  isDirty,
}: UseHeaderProps) {
  const toast = useToast();
  const navigation = useNavigation();

  const handleGoBack = useCallback(async () => {
    if (!navigation.canGoBack()) return;

    try {
      const description = getValues("description");

      if (isDirty && description) {
        if (id) {
          updateNote({ description, toast, id });
        } else {
          createNote({ description, toast });
        }
      }

      navigation.goBack();
    } catch {
      const isUpdate = Boolean(id);

      toast.error(isUpdate ? "Erro ao atualizar nota!" : "Erro ao criar nota!");
    }
  }, [getValues, id, isDirty, navigation, toast]);

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
