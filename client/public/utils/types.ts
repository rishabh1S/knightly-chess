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
