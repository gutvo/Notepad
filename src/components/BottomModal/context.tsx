import { createContext, useContext } from "react";

type BottomModalContextType = {
  title?: string;
};

const BottomModalContext = createContext<BottomModalContextType>({});

export const useBottomModal = () => useContext(BottomModalContext);

export default BottomModalContext;
