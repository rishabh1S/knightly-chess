"use client";
import { useState } from "react";
import { ChessboardBot, SideBoardComponent } from "@/components";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { Message, MovesKit } from "@/public/utils/types";

const AgainstComputer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [movesKit, setMovesKit] = useState<MovesKit>({});

  const handleSendMessage = (message: string) => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        username: "Rishabh",
        content: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleMakeMove = (whiteMove: string, blackMove: string) => {
    const moveNumber = Object.keys(movesKit).length + 1;
    setMovesKit((prevMovesKit) => ({
      ...prevMovesKit,
      [moveNumber]: {
        white: whiteMove,
        black: blackMove,
      },
    }));
  };

  return (
    <div className="h-screen bg-gray-800 text-white flex md:flex-row flex-col gap-6">
      {/* Left side: Chessboard */}
      <div className="flex flex-col items-center justify-center pl-12 gap-2">
        <div className="flex justify-start w-full py-1 gap-1">
          <Image
            src="/images/def_stock.jpeg"
            width={40}
            height={40}
            alt="Bot Profile"
            className="rounded-md"
          />
          <div className="flex items-start justify-center gap-1 font-semibold">
            StockFish<span className="text-gray-300 font-light">(1200)</span>
            <span>
              <FlagIcons.US className="w-4 h-4 mx-1 mt-1" />
            </span>
          </div>
        </div>
        <ChessboardBot />
        <div className="flex justify-start w-full gap-1">
          <Image
            src="/images/def_user.jpeg"
            width={40}
            height={40}
            alt="User Profile"
            className="rounded-md"
          />
          <div className="flex items-start justify-center gap-1 font-semibold">
            Rishabh <span className="text-gray-300 font-light">(1000)</span>
            <span>
              <FlagIcons.IN className="w-4 h-4 mx-1 mt-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Chat feature */}
      <SideBoardComponent
        onSendMessage={handleSendMessage}
        messages={messages}
        moves={Object.values(movesKit)}
      />
    </div>
  );
};

export default AgainstComputer;
