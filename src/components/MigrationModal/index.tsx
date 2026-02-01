import BaseModal from "@Components/BaseModal/Modal";
import { DrizzleError } from "drizzle-orm";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface MigrationModalProps {
  success: boolean;
  error: DrizzleError | undefined;
}

export default function MigrationModal({
  error,
  success,
}: MigrationModalProps) {
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
    <BaseModal visible={isOpenModal}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          padding: 20,
        }}
      >
        <ActivityIndicator size={50} />

        {error && (
          <>
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
              Erro ao migrar os dados:
            </Text>
            <Text style={{ color: "red" }}>{error?.message}</Text>
          </>
        )}

        {!error && !success && (
          <Text style={{ fontSize: 20 }}>Fazendo a migração dos dados...</Text>
        )}
      </View>
    </BaseModal>
  );
}
