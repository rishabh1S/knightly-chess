"use client";
import { useState } from "react";
import { ChessboardBot, SideBoardComponent } from "@/components";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { Message } from "@/public/utils/types";
import { useSearchParams } from "next/navigation";
import { useBoardStore } from "../store";

const AgainstComputer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const searchParams = useSearchParams();
  const stockfishLevel = Number(searchParams.get("stockfishLevel"));
  const stockfishLevelSymbol =
    stockfishLevel === 2 ? "E" : stockfishLevel === 6 ? "M" : "H";
  const { userName, profilePhoto } = useBoardStore((state) => ({
    userName: state.userName,
    profilePhoto: state.profilePhoto,
  }));
  const handleSendMessage = (message: string) => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        username: userName,
        content: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white flex sm:flex-row flex-col sm:gap-8 gap-4 sm:px-6 px-4 py-2">
      {/* Chessboard */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex justify-start w-full py-1 gap-1">
          <Image
            src="/images/def_stock.jpeg"
            width={40}
            height={40}
            alt="Bot Profile"
            className="rounded-md"
          />
          <div className="flex items-start justify-center gap-1 font-semibold">
            StockFish
            <span className="text-gray-300 font-light">
              ({stockfishLevelSymbol})
            </span>
            <span>
              <FlagIcons.US className="w-4 h-4 mx-1 mt-1" />
            </span>
          </div>
        </div>
        <ChessboardBot />
        <div className="flex justify-start w-full gap-1">
          <Image
            src={profilePhoto}
            width={40}
            height={40}
            alt="User Profile"
            className="rounded-md"
          />
          <div className="flex items-start justify-center gap-1 font-semibold">
            {userName}
            <span>
              <FlagIcons.IN className="w-4 h-4 mx-1 mt-1" />
            </span>
          </div>
        </div>
      </div>

      {/* SideBoard */}
      <div className="w-full h-full">
        <SideBoardComponent
          onSendMessage={handleSendMessage}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default AgainstComputer;
