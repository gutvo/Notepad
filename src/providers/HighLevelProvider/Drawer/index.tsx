import BaseButton from "@Components/bases/Button";
import BaseDivider from "@Components/bases/Divider";
import BaseDrawer from "@Components/bases/Drawer";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useOpenModal from "@Hooks/useOpenModal";
import useTheme from "@Hooks/useTheme";
import locales from "@Locales";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";

export default function Drawer() {
  const router = useRouter();
  const theme = useTheme();
  const openModal = useOpenModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options = [
    {
      name: "reminder",
      label: locales.home.list.drawer.reminder,
      icon: <BaseIcon name="bell" />,
      onclick: () => router.push("/reminders"),
    },
    {
      name: "config",
      label: locales.home.list.drawer.config,
      icon: <BaseIcon name="settings" />,
      onclick: () => openModal("CONFIG"),
    },
    {
      name: "theme",
      label: locales.home.list.drawer.theme,
      icon: <BaseIcon name="sun" />,
      onclick: () => openModal("THEME"),
    },
  ];

  return (
    <BaseDrawer visible={isOpen} onClose={closeModal}>
      <BaseTypography variant="H4" style={{ padding: theme.spacing(5) }}>
        {locales.home.list.drawer.title}
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
