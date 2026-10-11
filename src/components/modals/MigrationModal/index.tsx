import BaseModal from "@Components/bases/Modal";
import BaseTypography from "@Components/bases/Typography";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import { DrizzleError } from "drizzle-orm";
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
  const { formatMessage } = useLocale();
  const isOpenModal = Boolean(error) || !success;

  return (
    <BaseModal.Modal
      visible={isOpenModal}
      title={formatMessage({ id: "modals.migration.title" })}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(10),
          padding: theme.spacing(5),
        }}
      >
        <ActivityIndicator size={80} color={theme.palette.primary.main} />

        {error && (
          <>
            <BaseTypography
              style={{ color: theme.palette.error.main }}
              variant="H4"
            >
              {formatMessage({ id: "modals.migration.message.error" })}
            </BaseTypography>
            <BaseTypography style={{ color: theme.palette.error.main }}>
              {error?.message}
            </BaseTypography>
          </>
        )}

        {!error && !success && (
          <BaseTypography variant="H4">
            {formatMessage({ id: "modals.migration.message.progress" })}
          </BaseTypography>
        )}
      </View>
    </BaseModal.Modal>
  );
}
