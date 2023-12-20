"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  Tooltip,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useBoardTheme } from "@/app/provider";

interface GameSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGameMode: string;
}

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "bg-content1 hover:bg-content2 m-0",
          "flex-row-reverse max-w-[180px] cursor-pointer gap-1 rounded-lg p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const GameSelectionModal: React.FC<GameSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedGameMode,
}) => {
  const { stockfishLevel, setStockfishLevel } = useBoardTheme();
  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="p-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center text-3xl font-extralight">
                {selectedGameMode === "friend"
                  ? "Play with a friend"
                  : selectedGameMode === "computer"
                  ? "Play with the computer"
                  : "Unknown Game Mode"}
              </ModalHeader>
              <ModalBody>
                {selectedGameMode === "friend" && (
                  <Slider
                    size="sm"
                    label="Minutes per side"
                    step={1}
                    maxValue={180}
                    minValue={1}
                    defaultValue={10}
                    className="max-w-md"
                  />
                )}
                {selectedGameMode === "computer" && (
                  <div className="flex flex-col items-center gap-3 p-2">
                    <div>Strength</div>
                    <RadioGroup
                      orientation="horizontal"
                      onValueChange={(value) => {
                        setStockfishLevel(Number(value));
                        console.log(stockfishLevel);
                      }}
                    >
                      <CustomRadio value="2">Easy 🤓</CustomRadio>
                      <CustomRadio value="8">Medium 🧐</CustomRadio>
                      <CustomRadio value="18">Hard 😵</CustomRadio>
                    </RadioGroup>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Tooltip content="Black">
                  <Link href="/againstComputer">
                    <Button
                      isIconOnly
                      size="lg"
                      radius="none"
                      color="default"
                      variant="ghost"
                      className="bg-zinc-800 mx-1"
                    >
                      <Image
                        src="/images/chess_black.svg"
                        alt="chess-black"
                        width={50}
                        height={50}
                      />
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip content="White">
                  <Link href="/againstComputer">
                    <Button
                      isIconOnly
                      size="lg"
                      radius="none"
                      color="default"
                      variant="ghost"
                      className="bg-zinc-800 mx-1"
                    >
                      <Image
                        src="/images/chess_white.svg"
                        alt="chess-white"
                        width={50}
                        height={50}
                      />
                    </Button>
                  </Link>
                </Tooltip>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameSelectionModal;
