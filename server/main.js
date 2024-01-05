import { Chess } from "chess.js";

const Color = Object.freeze({
  Black: "black",
  White: "white",
});

function onRoomStart() {
  return {
    state: {
      plrIdToColor: {},
      fen: null,
      winner: null,
      lastMovedSquare: null,
    },
  };
}

function onPlayerJoin(player, roomState) {
  const { players, state } = roomState;
  if (players.length === 2) {
    const game = new Chess();
    state.fen = game.fen();
    state.plrIdToColor[players[1].id] = Color.Black;
    return { joinable: false, state };
  }

  // default first player to white to simplify
  state.plrIdToColor[players[0].id] = Color.White;
  return { state };
}

function onPlayerQuit(player, roomState) {
  const { state, players } = roomState;
  if (players.length === 1) {
    const [winner] = players;
    state.winner = winner;
    return { state, finished: true };
  }
  return { joinable: false, finished: true };
}

function onPlayerMove(player, move, roomState) {
  const { state } = roomState;
  const { fen } = state;
  if (fen == null) {
    throw new Error("Still waiting on another player!");
  }
  const game = new Chess(fen);
  const turnColor = game.turn() === "w" ? Color.White : Color.Black;
  if (turnColor !== state.plrIdToColor[player.id]) {
    throw new Error("It is not your turn!");
  }
  const result = game.move(move);
  if (result == null) {
    throw new Error("Invalid chess move!");
  }
  state.fen = game.fen();
  state.lastMovedSquare = move;

  if (game.game_over()) {
    if (game.in_checkmate()) {
      state.winner = player;
    }
    return { state, finished: true };
  }

  return { state };
}

export default {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};
