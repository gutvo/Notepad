import { createContext, ReactNode, useContext } from "react";

interface PortalContextProps {
  mount: (node: ReactNode, priority?: number) => string;
  unmount: (key: string) => void;
  update: (key: string, node: ReactNode) => void;
}

const PortalContext = createContext<PortalContextProps | null>(null);

export default PortalContext;

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be inside PortalProvider");
  return context;
}
