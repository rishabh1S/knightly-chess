export interface Message {
  username: string;
  content: string;
}

export interface MovesKit {
  [moveNumber: number]: {
    white: string;
    black: string;
  };
}

export interface OptionSquares {
  [key: string]: {
    background: string;
    borderRadius: string;
  };
}

export interface RightClickedSquares {
  [key: string]:
    | {
        backgroundColor: string;
      }
    | undefined;
}
