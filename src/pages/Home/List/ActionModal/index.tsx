import actions from "@Actions";
import BaseBottomModal from "@Components/bases/BottomModal";
import BaseIcon from "@Components/bases/Icon";
import BaseListItemButton, {
  BaseListItemButtonProps,
} from "@Components/bases/ListItemButton";
import ReminderModal from "@Components/modals/ReminderModal";
import { useCurrentModal } from "@Hooks/useCurrentModal";
import { PrinterProps } from "@Hooks/useGetPrinters";
import useLocale from "@Hooks/useLocale";
import useModal from "@Hooks/useModal";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import useToast from "@Hooks/useToast";
import PrinterService from "@Services/PrinterService";
import CustomError from "@Utils/CustomError";
import { Dispatch, SetStateAction, useState } from "react";

interface ActionModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedNote: NoteDataProps | null;
  setSelectedNote: Dispatch<SetStateAction<NoteDataProps | null>>;
}

export default function ActionModal({
  handleCloseModal,
  isOpenModal,
  selectedNote,
  setSelectedNote,
}: ActionModalProps) {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const { formatMessage } = useLocale();
  const { openModal } = useModal();

  const { isOpen } = useCurrentModal("REMINDER");

  const [isLoading, setIsLoading] = useState(false);

  function handleVisualizeNote() {
    if (!selectedNote) return;

    navigation.navigate({
      pathname: "/home/detail",
      params: { id: selectedNote.id },
    });
    setSelectedNote(null);
    handleCloseModal();
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;

    setIsLoading(true);

    try {
      await actions.note.delete(selectedNote.id);

      setSelectedNote(null);
      handleCloseModal();

      toast.success(formatMessage({ id: "messages.success.delete-note" }));
    } catch {
      toast.error(formatMessage({ id: "messages.failure.delete-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDuplicateNote() {
    if (!selectedNote) return;

    setIsLoading(true);
    try {
      await actions.note.create({ description: selectedNote.description });

      setSelectedNote(null);
      handleCloseModal();

      toast.success(formatMessage({ id: "messages.success.duplicate-note" }));
    } catch {
      toast.error(formatMessage({ id: "messages.failure.duplicate-note" }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddReminder() {
    if (!selectedNote) return;

    openModal("REMINDER", { noteId: selectedNote.id });
  }

  async function handleGetPrinterId(devices: PrinterProps[]) {
    const defaultPrinterConfig = await actions.config.find("PRINTER_ID");
    const findPrinter = devices.find(
      (device) => device.id === defaultPrinterConfig?.value,
    );

    return findPrinter?.id;
  }

  async function handlePreparePrinter() {
    const allLines = selectedNote?.description?.split(/\r?\n/) ?? [];
    const lines = allLines.filter((text) => text.trim() !== "");

    const paperSizeConfig = await actions.config.find("PAPER_SIZE");

    const printerService = new PrinterService({
      paperSize: paperSizeConfig?.value,
    });
    const devices = await printerService.getAvailablePrinters();
    const printerId = await handleGetPrinterId(devices);

    if (!printerId) {
      throw new CustomError(
        formatMessage({ id: "messages.failure.not-found-thermal" }),
      );
    }

    await printerService.connect(printerId);

    return { printerService, lines };
  }

  async function handlePrintNote() {
    setIsLoading(true);

    try {
      const { lines, printerService } = await handlePreparePrinter();

      await printerService.print(async (printer) => {
        lines.forEach((line) => {
          printer.addText(line);
          // printer.addDivider();
        });

        printer.cut();
      });
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message);
      } else {
        toast.error(formatMessage({ id: "messages.failure.print" }));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePrintList() {
    setIsLoading(true);

    try {
      const { lines, printerService } = await handlePreparePrinter();

      const formattedLines = lines.map((line) => {
        const match = line.match(/^(.*?)(\d+[.,]?\d*)$/);

        if (!match) {
          return { text: line.trim(), value: "" };
        }

        return { text: match[1].trim(), value: match[2].trim() };
      });

      await printerService.print(async (printer) => {
        formattedLines.forEach(({ text, value }) => {
          printer.addRow(text, value);
          // printer.addDivider();
        });

        printer.cut();
      });
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message);
      } else {
        toast.error(formatMessage({ id: "messages.failure.print" }));
      }
    } finally {
      setIsLoading(false);
    }
  }

  const options: BaseListItemButtonProps[] = [
    {
      label: formatMessage({ id: "modals.home-actions.action.view" }),
      onPress: handleVisualizeNote,
      Left: <BaseIcon name="eye-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.print" }),
      onPress: handlePrintNote,
      Left: <BaseIcon name="printer-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.print-list" }),
      onPress: handlePrintList,
      Left: <BaseIcon name="printer-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.add-reminder" }),
      onPress: handleAddReminder,
      Left: <BaseIcon name="bell-plus-outline" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.duplicate" }),
      onPress: handleDuplicateNote,
      Left: <BaseIcon name="content-copy" />,
      disabled: isLoading,
    },
    {
      label: formatMessage({ id: "modals.home-actions.action.delete" }),
      onPress: handleDeleteNote,
      Left: <BaseIcon name="trash-can-outline" />,
      disabled: isLoading,
    },
  ];

  return (
    <BaseBottomModal.Modal
      isOpen={isOpenModal}
      title={formatMessage({ id: "modals.home-actions.title" })}
      onClose={handleCloseModal}
    >
      <BaseBottomModal.FlatList
        data={options}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <BaseListItemButton {...item} />}
        contentContainerStyle={{ paddingVertical: theme.spacing(3) }}
      />

      {isOpen && <ReminderModal />}
    </BaseBottomModal.Modal>
  );
}
