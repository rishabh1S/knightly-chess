"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, ChessInstance, ShortMove } from "chess.js";
import {
  OptionSquares,
  RightClickedSquares,
  convertCSSPropertiesToStringObject,
} from "@/public/utils/types";
import { useBoardStore } from "@/app/store";
import { useSearchParams } from "next/navigation";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { GameModal } from ".";

class Engine {
  private stockfish: Worker | null;

  constructor() {
    this.stockfish =
      typeof Worker !== "undefined" ? new Worker("/stockfish.js") : null;
    this.onMessage = this.onMessage.bind(this);

    if (this.stockfish) {
      this.sendMessage("uci");
      this.sendMessage("isready");
    }
  }

  onMessage(callback: (data: { bestMove: string }) => void) {
    if (this.stockfish) {
      this.stockfish.addEventListener("message", (e) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
        callback({ bestMove });
      });
    }
  }

  evaluatePosition(fen: string, depth: number) {
    if (this.stockfish) {
      this.stockfish.postMessage(`position fen ${fen}`);
      this.stockfish.postMessage(`go depth ${depth}`);
    }
  }

  stop() {
    this.sendMessage("stop");
  }

  quit() {
    this.sendMessage("quit");
  }

  private sendMessage(message: string) {
    if (this.stockfish) {
      this.stockfish.postMessage(message);
    }
  }
}

const ChessboardBot: React.FC = () => {
  const engine = useMemo(() => new Engine(), []);
  const [game, setGame] = useState<ChessInstance>(new Chess());
  const theme = useBoardStore((state) => state.theme);
  const setMoves = useBoardStore((state) => state.setMoves);
  const setOnNewGame = useBoardStore((state) => state.setOnNewGame);
  const setGameOver = useBoardStore((state) => state.setGameOver);
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] =
    useState<RightClickedSquares>({});
  const moveSquares = {};
  const [optionSquares, setOptionSquares] = useState<OptionSquares>({});
  const searchParams = useSearchParams();
  const stockfishLevel = Number(searchParams.get("stockfishLevel"));
  const playAs = searchParams.get("playAs");
  const [gameResult, setGameResult] = useBoardStore((state) => [
    state.gameResult,
    state.setGameResult,
  ]);
  const [showGameModal, setShowGameModal] = useState(false);
  const [boardWidth, setBoardWidth] = useState(560);

  useEffect(() => {
    if (playAs === "black") {
      makeStockfishMove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playAs]);

  useEffect(() => {
    if (game.in_checkmate() || game.in_draw() || game.in_stalemate()) {
      if (game.in_checkmate()) {
        if (playAs === "black") {
          setGameResult(game.turn() === "w" ? "User wins!" : "StockFish wins!");
        } else {
          setGameResult(game.turn() === "w" ? "StockFish wins!" : "User wins!");
        }
      } else {
        setGameResult("It's a draw!");
      }
      setShowGameModal(true);
      setGameOver(true);
    } else {
      setGameResult("You Resigned!");
    }

    setMoves(game.history());
  }, [game, playAs, setMoves, setGameResult, setGameOver]);

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: OptionSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to)!.color !== game.get(square)!.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
      borderRadius: "",
    };
    setOptionSquares(newSquares);
    return true;
  }

  const makeStockfishMove = useCallback(() => {
    engine.evaluatePosition(game.fen(), stockfishLevel);
    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        const move = game.move({
          from: bestMove.substring(0, 2) as Square,
          to: bestMove.substring(2, 4) as Square,
          promotion: bestMove.substring(4, 5) as
            | "b"
            | "n"
            | "r"
            | "q"
            | undefined,
        });

        if (move) {
          setGame(game);
        }
      }
    });
  }, [engine, game, setGame, stockfishLevel]);

  function onSquareClick(square: Square) {
    setRightClickedSquares({});

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    if (!moveTo) {
      const piece = game.get(moveFrom);
      const moves = game.moves({
        square: moveFrom,
        verbose: true,
      }) as ShortMove[];
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );
      if (!foundMove) {
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : null);
        return;
      }

      setMoveTo(square);

      if (
        (piece?.color === "w" && piece?.type === "p" && square[1] === "8") ||
        (piece?.color === "b" && piece?.type === "p" && square[1] === "1")
      ) {
        setShowPromotionDialog(true);
        return;
      }

      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });

      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      setGame(gameCopy);
      setTimeout(makeStockfishMove, 500);
      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }

  function onPromotionPieceSelect(piece: any) {
    if (piece) {
      const gameCopy = { ...game };
      gameCopy.move({
        from: moveFrom!,
        to: moveTo!,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setGame(gameCopy);
      setTimeout(makeStockfishMove, 500);
    }

    setMoveFrom(null);
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  function onSquareRightClick(square: Square) {
    const colour = "rgba(255, 0, 0, 0.5)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square]!.backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  const onNewGame = useCallback(() => {
    game.reset();
    useBoardStore.setState({ moves: [] });
    if (playAs === "black") {
      makeStockfishMove();
    }
  }, [game, playAs, makeStockfishMove]);

  useEffect(() => {
    setOnNewGame(onNewGame);

    return () => {
      setOnNewGame(() => {});
    };
  }, [onNewGame, setOnNewGame]);

  const getBoardWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      return 260;
    } else if (screenWidth < 960) {
      return 400;
    } else {
      return 560;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(getBoardWidth());
    };
    setBoardWidth(getBoardWidth());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    useBoardStore.setState({ currentFEN: game.fen() });
  }, [game]);

  return (
    <>
      <Chessboard
        animationDuration={300}
        arePiecesDraggable={false}
        boardOrientation={playAs as BoardOrientation}
        position={game.fen()}
        boardWidth={boardWidth}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPromotionPieceSelect={onPromotionPieceSelect}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customSquareStyles={{
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares,
        }}
        promotionToSquare={moveTo}
        showPromotionDialog={showPromotionDialog}
        customDarkSquareStyle={convertCSSPropertiesToStringObject(
          theme.darkSquareStyle
        )}
        customLightSquareStyle={convertCSSPropertiesToStringObject(
          theme.lightSquareStyle
        )}
      />
      <GameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        gameResult={gameResult}
        onNewGame={onNewGame}
      />
    </>
  );
};

export default ChessboardBot;
