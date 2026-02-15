import { createContext } from "react";
import { ThemeContextProps } from "./types";

const ThemeContext = createContext<ThemeContextProps | null>(null);

export default ThemeContext;
