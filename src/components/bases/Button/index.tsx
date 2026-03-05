import { Pressable, PressableProps } from "react-native";

export type BaseButtonProps = PressableProps;

export default function BaseButton({
  style,
  children,
  disabled,
  ...rest
}: BaseButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      {...rest}
      style={(state) => {
        const resolvedStyle =
          typeof style === "function" ? style(state) : style;

        return [
          { opacity: disabled ? 0.5 : 1 },
          resolvedStyle,
          state.pressed && { opacity: 0.8 },
        ];
      }}
    >
      {children}
    </Pressable>
  );
}
