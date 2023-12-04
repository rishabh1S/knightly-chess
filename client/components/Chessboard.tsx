"use client";
import Chessground from "@react-chess/chessground";
import "node_modules/chessground/assets/chessground.base.css";
import "node_modules/chessground/assets/chessground.brown.css";
import "node_modules/chessground/assets/chessground.cburnett.css";

const ChessboardComponent: React.FC = () => {
  const config = {
    width: 580,
    height: 580,
  };
  return <Chessground {...config} />;
};

export default ChessboardComponent;
