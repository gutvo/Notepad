import BaseDrawer from "@Components/BaseDrawer";
import BaseTypography from "@Components/BaseTypography";
import Divider from "@Components/List/Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useOpenModal from "@Hooks/useOpenModal";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity, View } from "react-native";

export default function Drawer() {
  const openModal = useOpenModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options = [
    {
      name: "config",
      label: "Configuração",
      icon: <MaterialCommunityIcons name="cog-outline" size={24} />,
      onclick: () => {
        openModal("CONFIG");
      },
    },
    // {
    //   name: "teste2",
    //   label: "teste",
    //   icon: <MaterialCommunityIcons name="cog" />,
    //   onclick: () => {},
    // },
  ];

  return (
    <BaseDrawer visible={isOpen} onClose={closeModal}>
      <BaseTypography variant="H4" style={{ padding: 20 }}>
        Menu
      </BaseTypography>

      <FlashList
        data={options}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "row",
                gap: 12,
              }}
              onPress={item.onclick}
            >
              {item.icon}
              <BaseTypography>{item.label}</BaseTypography>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </BaseDrawer>
  );
}
