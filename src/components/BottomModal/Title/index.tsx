import { Text } from "react-native";

interface BottomModalTitleProps {
  title: string;
}

export default function BottomModalTitle({ title }: BottomModalTitleProps) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 24,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  );
}
