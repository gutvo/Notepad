import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export type BaseSpinnerProps = ActivityIndicatorProps;

export default function BaseSpinner({ ...rest }: BaseSpinnerProps) {
  return <ActivityIndicator {...rest} />;
}
