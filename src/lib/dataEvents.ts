// lib/dataEvents.ts
type Listener = () => void;

const listeners = new Set<Listener>();

export const dataEvents = {
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  emit() {
    listeners.forEach((listener) => listener());
  },
};
