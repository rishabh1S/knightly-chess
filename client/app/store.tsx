import { create } from "zustand";

type Theme = {
  darkSquareStyle: React.CSSProperties;
  lightSquareStyle: React.CSSProperties;
};

type BoardStore = {
  theme: Theme;
  moves: String[];
  gameResult: string | null;
  currentFEN: string;
  onNewGame: () => void;
  setTheme: (theme: Theme) => void;
  setMoves: (moves: String[]) => void;
  setGameResult: (result: string | null) => void;
  setOnNewGame: (onNewGame: () => void) => void;
  setCurrentFEN: (fen: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  theme: {
    darkSquareStyle: { backgroundColor: "#779952" },
    lightSquareStyle: { backgroundColor: "#edeed1" },
  },
  moves: [],
  gameResult: null,
  currentFEN: "",
  onNewGame: () => {},
  setTheme: (theme) => set({ theme }),
  setMoves: (moves) => set({ moves }),
  setGameResult: (result) => set({ gameResult: result }),
  setOnNewGame: (onNewGame) => set({ onNewGame }),
  setCurrentFEN: (fen) => set({ currentFEN: fen }),
}));
