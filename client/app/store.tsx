import { MovesKit } from "@/public/utils/types";
import { ShortMove } from "chess.js";
import { create } from "zustand";

type Theme = {
  darkSquareStyle: React.CSSProperties;
  lightSquareStyle: React.CSSProperties;
};

type BoardStore = {
  theme: Theme;
  moves: String[];
  setTheme: (theme: Theme) => void;
  setMoves: (moves: String[]) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  theme: {
    darkSquareStyle: { backgroundColor: "#779952" },
    lightSquareStyle: { backgroundColor: "#edeed1" },
  },
  moves: [],
  setTheme: (theme) => set({ theme }),
  setMoves: (moves) => set({ moves }),
}));
