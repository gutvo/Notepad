import PortalContext from "@Providers/PotalProvider/context";
import { useContext } from "react";

export default function usePortal() {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error("usePortal must be inside PortalProvider");
  }
  return context;
}
