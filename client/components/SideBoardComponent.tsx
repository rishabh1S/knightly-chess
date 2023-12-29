"use client";

import React, { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  MdOutlineShare,
  MdOutlineEmojiEmotions,
  MdOutlineSettings,
  MdOutlinedFlag,
} from "react-icons/md";
import { Message } from "@/public/utils/types";
import { useBoardStore } from "@/app/store";
import { Tabs, Tab, Button, useDisclosure } from "@nextui-org/react";
import { GameModal, SettingsModal } from ".";

interface SideBoardProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}

const SideBoardComponent: React.FC<SideBoardProps> = ({
  onSendMessage,
  messages,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const moves = useBoardStore((state) => state.moves);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showGameModal, setShowGameModal] = useState(false);
  const onNewGame = useBoardStore((state) => state.onNewGame);
  const gameResult = useBoardStore((state) => state.gameResult);

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
    const emoji = emojiObject.emoji;
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-4/5 h-[95%] bg-slate-900 my-4 rounded-md flex flex-col">
        <Tabs key="underlined" variant="underlined" aria-label="Tabs">
          <Tab key="moves" title="Moves">
            {/* Moves Section */}
            <div className="flex flex-col space-y-2">
              <ol className="px-4 list-decimal list-inside">
                {moves.map(
                  (move, index) =>
                    index % 2 === 0 && (
                      <li key={index / 2} className="font-semibold">
                        <span className="text-blue-400 mx-4">{move}</span>
                        {index + 1 < moves.length && (
                          <span className="text-yellow-400 mx-4">
                            {moves[index + 1]}
                          </span>
                        )}
                      </li>
                    )
                )}
              </ol>
            </div>
          </Tab>
          <Tab key="chat" title="Chat" className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto max-h-[30rem] px-4 py-1">
              <div className="flex flex-col-reverse space-y-1">
                {messages
                  .slice()
                  .reverse()
                  .map((msg, index) => (
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
                className="w-full px-4 py-2 bg-slate-900 text-white border-t-[1px] border-gray-600 focus:outline-none rounded-t-none rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
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
              <MdOutlineEmojiEmotions
                size={20}
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </div>
          </Tab>
        </Tabs>
        <div className="mt-auto bg-slate-950 flex py-2 px-1 gap-2">
          <Button isIconOnly variant="light" aria-label="Like">
            <MdOutlineShare size={24} />
          </Button>
          <Button
            isIconOnly
            variant="light"
            aria-label="Share"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            <MdOutlineSettings size={24} />
          </Button>
          <Button
            variant="light"
            aria-label="Resign"
            className="ml-auto"
            onClick={(e) => {
              e.preventDefault();
              setShowGameModal(true);
            }}
          >
            <MdOutlinedFlag size={24} />
            Resign
          </Button>
        </div>
      </div>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
      <GameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        gameResult={gameResult}
        onNewGame={onNewGame}
      />
    </>
  );
};

export default SideBoardComponent;
