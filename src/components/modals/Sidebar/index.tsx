import BaseDrawer from "@Components/bases/Drawer";
import BaseFlashList from "@Components/bases/FlashList";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton, {
  BaseListItemButtonProps,
} from "@Components/bases/ListItemButton";
import BaseTypography from "@Components/bases/Typography";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";

export default function Sidebar() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();
  const { isOpen, closeModal } = useCurrentModal("SIDEBAR");

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "modals.sidebar.option.reminder" }),
      Left: <BaseIcon name="bell-outline" />,
      onPress: () => {
        navigation.navigate("/reminders/list");
        closeModal();
      },
    },
    {
      label: formatMessage({ id: "modals.sidebar.option.config" }),
      Left: <BaseIcon name="cog-outline" />,
      onPress: () => openModal("CONFIG"),
    },
    {
      label: formatMessage({ id: "modals.sidebar.option.theme" }),
      Left: <BaseIcon name="theme-light-dark" />,
      onPress: () => openModal("THEME"),
    },
  ];

  return (
    <BaseDrawer visible={isOpen} onClose={closeModal}>
      <BaseTypography variant="H4" style={{ padding: theme.spacing(5) }}>
        {formatMessage({ id: "modals.sidebar.title" })}
      </BaseTypography>

      <BaseFlashList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <BaseListItemButton {...item} />}
      />
    </BaseDrawer>
  );
}
