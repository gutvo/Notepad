import { View, ViewProps } from "react-native";

export type BaseViewProps = ViewProps;

export default function BaseView({ children, ...rest }: BaseViewProps) {
  return <View {...rest}>{children}</View>;
}
