import { ReactNode, useCallback, useState } from "react";
import { View } from "react-native";
import PortalContext from "./context";

let portalId = 0;

export function PortalProvider({ children }: { children: ReactNode }) {
  const [portals, setPortals] = useState<PortalProviderItemProps[]>([]);

  const mount = useCallback((node: ReactNode, priority = 0) => {
    const key = `portal_${portalId++}`;

    setPortals((prev) => [...prev, { key, node, priority }]);

    return key;
  }, []);

  const update = useCallback((key: string, node: ReactNode) => {
    setPortals((prev) =>
      prev.map((item) => (item.key === key ? { ...item, node } : item)),
    );
  }, []);

  const unmount = useCallback((key: string) => {
    setPortals((prev) => prev.filter((item) => item.key !== key));
  }, []);

  return (
    <PortalContext.Provider value={{ mount, update, unmount }}>
      {children}

      {[...portals]
        .sort((a, b) => a.priority - b.priority)
        .map(({ key, node, priority }) => (
          <View
            key={key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000 + priority,
              elevation: 1000 + priority,
            }}
            pointerEvents="box-none"
          >
            {node}
          </View>
        ))}
    </PortalContext.Provider>
  );
}
