interface GenericBaseModalFooterButtonProps {
  onclick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
  backgroundColor?: string;
  color?: string;
  position?: number;
}

type BaseModalFooterButtonNames = "CONFIRM" | "CANCEL";

interface BaseModalFooterButtonProps extends GenericBaseModalFooterButtonProps {
  name: BaseModalFooterButtonNames;
  label?: string;
}

interface CustomBaseModalFooterButtonProps extends GenericBaseModalFooterButtonProps {
  name: string;
  label: string;
}
