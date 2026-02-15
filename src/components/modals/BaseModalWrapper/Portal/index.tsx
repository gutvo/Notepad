import usePortal from "@Hooks/usePortal";
import { ReactNode, useEffect, useRef } from "react";

interface PortalProps {
  children: ReactNode;
  priority?: number;
}

export function Portal({ children, priority }: PortalProps) {
  const { mount, update, unmount } = usePortal();
  const keyRef = useRef<string | null>(null);

  // monta apenas uma vez
  useEffect(() => {
    keyRef.current = mount(children, priority);

    return () => {
      if (keyRef.current) {
        unmount(keyRef.current);
      }
    };
  }, [children, mount, priority, unmount]);

  // atualiza quando children mudar
  useEffect(() => {
    if (keyRef.current) {
      update(keyRef.current, children);
    }
  }, [children, update]);

  return null;
}
