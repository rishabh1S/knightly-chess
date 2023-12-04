"use client";
import { useState, useRef, useEffect } from "react";
import { ChessboardComponent } from "@/components";
import Image from "next/image";
import * as FlagIcons from "country-flag-icons/react/3x2";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { FaRegFaceSmile } from "react-icons/fa6";

interface Message {
  username: string;
  content: string;
}

const AgainstBot: React.FC = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  const handleEmojiClick = (emojiObject: { emoji: any }) => {
    // Extract the actual emoji from the object
    const emoji = emojiObject.emoji;
    setMessage((prevMessage) => prevMessage + emoji);
    // setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        username: "Rishabh",
        content: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white flex md:flex-row flex-col gap-6">
      {/* Left side: Chessboard */}
      <div className="flex flex-col items-center justify-center pl-12 gap-2">
        <div className="flex justify-start w-full py-1 gap-1">
          <Image
            src="/images/def_bot.jpeg"
            width={40}
            height={40}
            alt="Bot Profile"
            className="rounded-md"
          />
          <div className="flex items-start justify-center gap-1 font-semibold">
            Bot<span className="text-gray-300 font-light">(1200)</span>
            <span>
              <FlagIcons.US className="w-4 h-4 mx-1 mt-1" />
            </span>
          </div>
        </div>
        <ChessboardComponent />
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
      <div className="sm:w-2/5 w-4/5 bg-gray-900 my-4 rounded-md">
        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-1 flex items-end overflow-y-auto px-4">
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-yellow-400">{msg.username}:</span>
                  <span className="px-1">{msg.content}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="mt-4 relative" ref={emojiPickerRef}>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 bg-gray-900 text-white border-t-[1px] border-gray-600 focus:outline-none rounded-t-none rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={"dark" as Theme}
                />
              </div>
            )}

            {/* Smiley Icon */}
            <FaRegFaceSmile
              size={20}
              className="absolute bottom-3 right-3 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgainstBot;
