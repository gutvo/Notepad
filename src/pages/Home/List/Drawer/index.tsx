import BaseDrawer from "@Components/BaseDrawer";
import BaseTypography from "@Components/BaseTypography";
import Divider from "@Components/List/Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useChangeTheme from "@Hooks/useChangeTheme";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native";

export default function Drawer() {
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const openModal = useOpenModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options = [
    {
      name: "config",
      label: "Configuração",
      icon: (
        <MaterialCommunityIcons
          name="cog-outline"
          color={theme.palette.background.textPrimary}
          size={24}
        />
      ),
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
      <BaseTypography variant="H4" style={{ padding: theme.spacing(5) }}>
        Menu
      </BaseTypography>

      <FlashList
        data={options}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: theme.spacing(4),
              display: "flex",
              flexDirection: "row",
              gap: theme.spacing(3),
            }}
            onPress={item.onclick}
          >
            {item.icon}
            <BaseTypography>{item.label}</BaseTypography>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />

      <TouchableOpacity
        style={{
          padding: theme.spacing(4),
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing(3),
        }}
        onPress={() => {
          changeTheme({ darkMode: !theme.palette.isDarkMode });
        }}
      >
        <MaterialCommunityIcons
          name={theme.palette.isDarkMode ? "weather-night" : "brightness-7"}
          color={theme.palette.background.textPrimary}
          size={24}
        />
        <BaseTypography>Alterar modo escuro</BaseTypography>
      </TouchableOpacity>
    </BaseDrawer>
  );
}
