"use client";

import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, ChessInstance } from "chess.js";

const ChessboardComponent: React.FC = () => {
  const [game, setGame] = useState<ChessInstance>(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  function safeGameMutate(modify: (game: ChessInstance) => void) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: any) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setGame(gameCopy);

    if (move === null) return false;

    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  console.log(game);
  return (
    <Chessboard
      id="PlayVsRandom"
      position={game.fen()}
      onPieceDrop={onDrop}
      boardWidth={560}
      customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
      }}
      customDarkSquareStyle={{ backgroundColor: "#779952" }}
      customLightSquareStyle={{ backgroundColor: "#edeed1" }}
    />
  );
};

export default ChessboardComponent;
