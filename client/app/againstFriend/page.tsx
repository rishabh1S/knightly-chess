"use client";
import { useState } from "react";
import {
  ChessboardPlayer,
  SideBoardComponent,
  TimerComponent,
} from "@/components";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { Message } from "@/public/utils/types";
import { useSearchParams } from "next/navigation";
import { useBoardStore } from "../store";

const AgainstFriend: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const searchParams = useSearchParams();
  const timer = Number(searchParams.get("timer"));
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer * 60);
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
        <div className="flex justify-between w-full py-1 gap-1">
          <div className="flex gap-1">
            <Image
              src="/images/def_stock.jpeg"
              width={40}
              height={40}
              alt="Bot Profile"
              className="rounded-md"
            />
            <div className="flex items-start justify-center gap-1 font-semibold">
              Player-1
              <span className="text-gray-300 font-light">(1000)</span>
              <span>
                <FlagIcons.US className="w-4 h-4 mx-1 mt-1" />
              </span>
            </div>
          </div>
          <TimerComponent expiryTimestamp={time} />
        </div>
        <ChessboardPlayer />
        <div className="flex justify-between w-full gap-1">
          <div className="flex gap-1">
            <Image
              src={profilePhoto}
              width={40}
              height={40}
              alt="User Profile"
              className="rounded-md"
            />
            <div className="flex items-start justify-center gap-1 font-semibold">
              Player-2
              <span className="text-gray-300 font-light">(1200)</span>
              <span>
                <FlagIcons.IN className="w-4 h-4 mx-1 mt-1" />
              </span>
            </div>
          </div>
          <TimerComponent expiryTimestamp={time} />
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

export default AgainstFriend;
