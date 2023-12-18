"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  CSSProperties,
} from "react";
import { NextUIProvider } from "@nextui-org/react";

type Theme = {
  darkSquareStyle: CSSProperties;
  lightSquareStyle: CSSProperties;
};

type BoardThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const BoardThemeContext = createContext<BoardThemeContextType | undefined>(
  undefined
);

type BoardThemeProviderProps = {
  children: ReactNode;
};

export const BoardThemeProvider: React.FC<BoardThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({
    darkSquareStyle: { backgroundColor: "#779952" },
    lightSquareStyle: { backgroundColor: "#edeed1" },
  });

  return (
    <BoardThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </BoardThemeContext.Provider>
  );
};

export const useBoardTheme = () => {
  const context = useContext(BoardThemeContext);
  if (!context) {
    throw new Error("useBoardTheme must be used within a BoardThemeProvider");
  }
  return context;
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BoardThemeProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </BoardThemeProvider>
  );
};
