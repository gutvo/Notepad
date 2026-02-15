import BaseButton from "@Components/bases/Button";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
import locales from "@Locales";
import { useCallback, useLayoutEffect } from "react";

interface UseHeaderProps {
  onSubmit: () => Promise<void>;
  isDirty: boolean;
}

export default function useHeader({ onSubmit, isDirty }: UseHeaderProps) {
  const theme = useTheme();
  const openModal = useOpenModal();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    if (!navigation.canGoBack()) return true;

    if (!isDirty) {
      navigation.goBack();
      return true;
    }

    onSubmit();

    return true;
  }, [isDirty, navigation, onSubmit]);

  useOnGoBack({ onBackPress: handleGoBack });

  const headerLeft = useCallback(
    () => (
      <BaseButton
        onPress={handleGoBack}
        style={{ marginRight: theme.spacing(3) }}
      >
        <BaseIcon
          name="arrow-left"
          color={theme.palette.primary.contrast}
          style={{ marginRight: theme.spacing(3) }}
        />
      </BaseButton>
    ),
    [handleGoBack, theme],
  );

  const headerTitle = useCallback(
    () => (
      <BaseTypography style={{ color: theme.palette.primary.contrast }}>
        {locales.home.detail.title}
      </BaseTypography>
    ),
    [theme.palette.primary.contrast],
  );

  const headerRight = useCallback(
    () => (
      <BaseButton onPress={() => openModal("CONFIG")}>
        <BaseIcon color={theme.palette.primary.contrast} name="settings" />
      </BaseButton>
    ),
    [openModal, theme.palette.primary.contrast],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerLeft,
      headerRight,
    });
  }, [navigation, headerTitle, headerLeft, headerRight]);
}
