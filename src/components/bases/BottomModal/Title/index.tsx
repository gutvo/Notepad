import BaseTypography from "@Components/bases/Typography";

interface BottomModalTitleProps {
  title: string;
}

export default function BottomModalTitle({ title }: BottomModalTitleProps) {
  return (
    <BaseTypography variant="H4" style={{ textAlign: "center" }}>
      {title}
    </BaseTypography>
  );
}
