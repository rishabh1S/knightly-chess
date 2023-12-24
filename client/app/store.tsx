import { MovesKit } from "@/public/utils/types";
import { ShortMove } from "chess.js";
import { create } from "zustand";

type Theme = {
  darkSquareStyle: React.CSSProperties;
  lightSquareStyle: React.CSSProperties;
};

type BoardStore = {
  theme: Theme;
  moves: MovesKit;
  setTheme: (theme: Theme) => void;
  addMove: (move: ShortMove, playAs: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  theme: {
    darkSquareStyle: { backgroundColor: "#779952" },
    lightSquareStyle: { backgroundColor: "#edeed1" },
  },
  moves: [],
  setTheme: (theme) => set({ theme }),
  addMove: (move, playAs) =>
    set((state) => {
      const moveNumber =
        playAs === "white"
          ? state.moves.filter((m) => m.white !== "").length + 1
          : state.moves.length;

      const updatedMoves = [...state.moves];

      if (!updatedMoves[moveNumber - 1]) {
        updatedMoves[moveNumber - 1] = {
          white: "",
          black: "",
        };
      }

      if (playAs === "white") {
        updatedMoves[moveNumber - 1].white = `${move.to}`;
      } else if (playAs === "black") {
        updatedMoves[moveNumber - 1].black = `${move.to}`;
      }

      return {
        moves: updatedMoves,
      };
    }),
}));
