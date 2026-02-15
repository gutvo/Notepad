import BaseDivider from "@Components/BaseDivider";
import BaseDrawer from "@Components/BaseDrawer";
import BaseIcon from "@Components/BaseIcon";
import BaseButton from "@Components/bases/Button";
import BaseTypography from "@Components/BaseTypography";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";

export default function Drawer() {
  const theme = useTheme();
  const openModal = useOpenModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options = [
    {
      name: "config",
      label: "Configuração",
      icon: <BaseIcon name="cog-outline" />,
      onclick: () => openModal("CONFIG"),
    },
    {
      name: "theme",
      label: "Temas",
      icon: <BaseIcon name="theme-light-dark" />,
      onclick: () => openModal("THEME"),
    },
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
          <BaseButton
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
          </BaseButton>
        )}
        ItemSeparatorComponent={() => <BaseDivider />}
      />
    </BaseDrawer>
  );
}
