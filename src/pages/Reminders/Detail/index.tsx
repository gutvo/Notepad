import actions from "@Actions";
import BaseTypography from "@Components/bases/Typography";
import { useActionShow } from "@Hooks/useActionShow";
import useLocale from "@Hooks/useLocale";
import useTheme from "@Hooks/useTheme";
import getFormattedDate from "@Utils/getFormattedDate";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import Card from "./Card";
import formatData from "./formatData";
import useHeader from "./hooks/useHeader";

interface RemindersDetailProps {
  id: number;
}

export default function RemindersDetail({ id }: RemindersDetailProps) {
  const { formatMessage } = useLocale();
  const theme = useTheme();

  const { data: reminder } = useActionShow({
    actions: actions.reminder,
    id,
    format: formatData,
  });

  useHeader({ reminder });

  const today = useMemo(() => new Date(), []);

  if (!reminder) return;

  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing(2),
        gap: theme.spacing(4),
      }}
    >
      <Card
        title={reminder.title}
        subtitle={reminder.message}
        message={`Notificação em: ${getFormattedDate(reminder.notificate_at, "DATETIME")}`}
        isCompleted={reminder.notificate_at < today}
        isPrimaryTheme
        showStatusIcon={false}
      />

      {reminder.childrens.length > 0 && (
        <>
          <BaseTypography>
            {formatMessage({ id: "pages.reminder-detail.children" })}
          </BaseTypography>
          <View style={{ gap: theme.spacing(4) }}>
            {reminder.childrens.map((children) => (
              <Card
                key={children.id}
                title={children.title}
                subtitle={children.message}
                message={`Notificação em: ${getFormattedDate(children.notificate_at, "DATETIME")}`}
                isCompleted={children.notificate_at < today}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}
