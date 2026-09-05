import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import SearchInput from "@Components/inputs/SearchInput";
import useDialogAlert from "@Hooks/useDialogAlert";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import deleteNotification from "@Utils/deleteNotification";
import { useCallback, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { FormattedReminderDataProps } from "../formatData";

interface UseHeaderProps {
  reminder?: FormattedReminderDataProps;
}

export default function useHeader({ reminder }: UseHeaderProps) {
  const { formatMessage } = useLocale();
  const theme = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const { openModal } = useModal();
  const { showAlert } = useDialogAlert();

  const [inputSearch, setInputSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteReminder = useCallback(async () => {
    if (!reminder) return;

    const isConfirmed = await showAlert({
      title: "Excluir lembrete",
      message:
        "Ao confirmar será excluido permanentemente o lembrete, deseja continuar?",
      isDestructive: true,
    });

    if (!isConfirmed) return;

    try {
      setIsLoading(true);

      await deleteNotification({ reminderId: reminder.id });

      navigation.back();
      toast.success(formatMessage({ id: "messages.success.delete-reminder" }));
    } catch {
      toast.success(formatMessage({ id: "messages.failure.delete-reminder" }));
    } finally {
      setIsLoading(false);
    }
  }, [formatMessage, navigation, reminder, showAlert, toast]);

  const handleUpdateReminder = useCallback(() => {
    if (!reminder) return;

    openModal("REMINDER", {
      noteId: reminder.note_id,
      id: reminder.id,
    });
  }, [openModal, reminder]);

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
            {formatMessage({ id: "pages.reminder-detail.title" })}
          </BaseTypography>
        )}
      </View>
    ),
    [isSearching, inputSearch, theme.palette.primary.contrast, formatMessage],
  );

  const headerRight = useCallback(
    () => (
      <>
        <BaseButton onPress={handleUpdateReminder} disabled={isLoading}>
          <BaseIcon
            name="pencil-outline"
            color={theme.palette.primary.contrast}
            style={{ marginLeft: theme.spacing(3) }}
          />
        </BaseButton>
        <BaseButton onPress={handleDeleteReminder} disabled={isLoading}>
          <BaseIcon
            name="trash-can-outline"
            color={theme.palette.primary.contrast}
            style={{ marginLeft: theme.spacing(3) }}
          />
        </BaseButton>
      </>
    ),
    [handleDeleteReminder, handleUpdateReminder, isLoading, theme],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerCenter,
      headerRight: headerRight,
      headerLeft,
    });
  }, [navigation, headerRight, headerCenter, headerLeft]);
}
