import { Pressable, PressableProps } from "react-native";

export type BaseButtonProps = PressableProps;

export default function BaseButton({
  style,
  children,
  ...rest
}: BaseButtonProps) {
  return (
    <Pressable
      {...rest}
      style={(state) => {
        const resolvedStyle =
          typeof style === "function" ? style(state) : style;

        return [resolvedStyle, state.pressed && { opacity: 0.8 }];
      }}
    >
      {children}
    </Pressable>
  );
}
