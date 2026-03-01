import BaseButton from "@Components/bases/Button";
import BaseDrawer from "@Components/bases/Drawer";
import BaseFlashList from "@Components/bases/FlashList";
import BaseIcon from "@Components/bases/Icon";
import BaseTypography from "@Components/bases/Typography";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";

export default function Drawer() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options = [
    {
      name: "reminder",
      label: formatMessage({ id: "modals.sidebar.option.reminder" }),
      icon: <BaseIcon name="bell-outline" />,
      onclick: () => {
        navigation.navigate("/reminders/list");
        closeModal();
      },
    },
    {
      name: "config",
      label: formatMessage({ id: "modals.sidebar.option.config" }),
      icon: <BaseIcon name="cog-outline" />,
      onclick: () => openModal("CONFIG"),
    },
    {
      name: "theme",
      label: formatMessage({ id: "modals.sidebar.option.theme" }),
      icon: <BaseIcon name="theme-light-dark" />,
      onclick: () => openModal("THEME"),
    },
  ];

  return (
    <BaseDrawer visible={isOpen} onClose={closeModal}>
      <BaseTypography variant="H4" style={{ padding: theme.spacing(5) }}>
        {formatMessage({ id: "modals.sidebar.title" })}
      </BaseTypography>

      <BaseFlashList
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
      />
    </BaseDrawer>
  );
}
