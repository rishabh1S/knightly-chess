"use client";
import { useEffect, useState } from "react";
import { ChessboardBot, SideBoardComponent, EvalBar } from "@/components";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { Message } from "@/public/utils/types";
import { useSearchParams } from "next/navigation";

const AgainstComputer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const searchParams = useSearchParams();
  const stockfishLevel = Number(searchParams.get("stockfishLevel"));
  const pe = -0.4;
  const stockfishLevelSymbol =
    stockfishLevel === 2 ? "E" : stockfishLevel === 6 ? "M" : "H";
  const handleSendMessage = (message: string) => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        username: "Rishabh",
        content: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="h-screen bg-gray-800 text-white flex sm:flex-row flex-col gap-8 px-4">
      <div className="flex gap-4">
        {/*EvalBar */}
        <div className="py-2 flex justify-center">
          <EvalBar pe={pe} />
        </div>
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
          {loading ? (
            <Image
              src="/images/chess.png"
              width={1130}
              height={1130}
              alt="Chess"
            />
          ) : (
            <ChessboardBot />
          )}
          <div className="flex justify-start w-full gap-1">
            <Image
              src="/images/def_user.jpeg"
              width={40}
              height={40}
              alt="User Profile"
              className="rounded-md"
            />
            <div className="flex items-start justify-center gap-1 font-semibold">
              Rishabh
              <span>
                <FlagIcons.IN className="w-4 h-4 mx-1 mt-1" />
              </span>
            </div>
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
