import actions from "@Actions";
import { NoteDataProps } from "@Actions/note";
import BaseFlashList from "@Components/bases/FlashList";
import BaseTypography from "@Components/bases/Typography";
import { usePaginatedActionList } from "@Hooks/usePaginatedActionList";
import useLocale from "@Hooks/useLocale";
import useNavigation from "@Hooks/useNavigation";
import useTheme from "@Hooks/useTheme";
import { useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ActionModal from "./ActionModal";
import ListItem from "../List/ListItem";

export default function NotesTrash() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { formatMessage } = useLocale();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteDataProps | null>(null);
  const options = useMemo(() => ({ deleted_at: { isNotNull: true } }), []);
  const { data, loading, loadingMore, loadMore } = usePaginatedActionList({
    actions: actions.note,
    options,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: formatMessage({ id: "pages.trash.title" }),
    });
  }, [formatMessage, navigation]);

  return (
    <>
      {data.length ? (
        <BaseFlashList
          data={data}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                color={theme.palette.primary.main}
                style={{ padding: theme.spacing(4) }}
              />
            ) : null
          }
          renderItem={({ item }) => (
            <ListItem
              item={item}
              date={item.deleted_at ?? item.created_at}
              onPress={() => {
                setSelectedNote(item);
                setIsOpenModal(true);
              }}
              onLongPress={() => {
                setSelectedNote(item);
                setIsOpenModal(true);
              }}
            />
          )}
        />
      ) : loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={theme.palette.primary.main} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(4),
          }}
        >
          <BaseTypography>
            {formatMessage({ id: "pages.trash.empty" })}
          </BaseTypography>
        </View>
      )}

      <ActionModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </>
  );
}
