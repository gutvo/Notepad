import BaseModal from "@Components/bases/Modal";
import BaseTypography from "@Components/bases/Typography";
import useTheme from "@Hooks/useTheme";
import locales from "@Locales";
import { DrizzleError } from "drizzle-orm";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface MigrationModalProps {
  success: boolean;
  error: DrizzleError | undefined;
}

export default function MigrationModal({
  error,
  success,
}: MigrationModalProps) {
  const theme = useTheme();

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    if (error || !success) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }
  }, [error, success]);

  return (
    <BaseModal.Modal visible={isOpenModal}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(5),
          padding: theme.spacing(5),
        }}
      >
        <ActivityIndicator size={50} color={theme.palette.primary.main} />

        {error && (
          <>
            <BaseTypography
              style={{ color: theme.palette.error.main }}
              variant="H4"
            >
              {locales.migration.modal.error.title}
            </BaseTypography>
            <BaseTypography style={{ color: theme.palette.error.main }}>
              {error?.message}
            </BaseTypography>
          </>
        )}

        {!error && !success && (
          <BaseTypography variant="H4">
            {locales.migration.modal.progress}
          </BaseTypography>
        )}
      </View>
    </BaseModal.Modal>
  );
}
