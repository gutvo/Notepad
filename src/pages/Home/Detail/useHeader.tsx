import BaseIcon from "@Components/BaseIcon";
import BaseButton from "@Components/bases/BaseButton";
import BaseTypography from "@Components/BaseTypography";
import useNavigation from "@Hooks/useNavigation";
import useOnGoBack from "@Hooks/useOnGoBack";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
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
        Detalhes
      </BaseTypography>
    ),
    [theme.palette.primary.contrast],
  );

  const headerRight = useCallback(
    () => (
      <BaseButton onPress={() => openModal("CONFIG")}>
        <BaseIcon color={theme.palette.primary.contrast} name="cog-outline" />
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
