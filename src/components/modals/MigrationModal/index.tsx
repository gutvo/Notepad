import BaseModal from "@Components/bases/Modal";
import BaseSpinner from "@Components/bases/Spinner";
import BaseTypography from "@Components/bases/Typography";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";

interface MigrationModalProps {
  success: boolean;
  error: Error | undefined;
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
      <BaseModal.Container
        style={{
          gap: theme.spacing(10),
          padding: theme.spacing(5),
        }}
      >
        <BaseSpinner size={80} color={theme.palette.primary.main} />

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
      </BaseModal.Container>
    </BaseModal.Modal>
  );
}
