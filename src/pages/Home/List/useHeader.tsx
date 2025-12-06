import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Button } from "react-native";

export default function useHeader() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: (props) => <LogoTitle {...props} />,
      headerRight: () => <Button title="Update count" />,
    });
  }, [navigation]);
}
