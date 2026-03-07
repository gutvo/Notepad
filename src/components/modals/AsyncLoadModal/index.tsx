import BaseSpinner from "@Components/bases/Spinner";
import useTheme from "@Hooks/useTheme";
import { Modal, View } from "react-native";

export default function AsyncLoadModal() {
  const theme = useTheme();

  return (
    <Modal visible transparent={false}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          backgroundColor: theme.palette.background.body,
        }}
      >
        <BaseSpinner size={100} color={theme.palette.primary.main} />
      </View>
    </Modal>
  );
}
