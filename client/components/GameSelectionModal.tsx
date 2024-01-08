"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import { PlayAsButton } from ".";

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
  const [stockfishLevel, setStockfishLevel] = useState(2);

  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="p-2">
          {() => (
            <>
              <ModalHeader className="flex justify-center text-3xl font-extralight">
                {selectedGameMode === "friend"
                  ? "Play with a friend"
                  : selectedGameMode === "computer"
                  ? "Play with the computer"
                  : "Unknown Game Mode"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-3 p-2">
                  <div>Strength</div>
                  <RadioGroup
                    orientation="horizontal"
                    onValueChange={(value) => {
                      setStockfishLevel(Number(value));
                    }}
                  >
                    <CustomRadio value="2">Easy 🤓</CustomRadio>
                    <CustomRadio value="6">Medium 🧐</CustomRadio>
                    <CustomRadio value="12">Hard 😵</CustomRadio>
                  </RadioGroup>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <PlayAsButton
                  content="Black"
                  href={`/againstComputer?stockfishLevel=${stockfishLevel}&playAs=black`}
                  stockfishLevel={stockfishLevel}
                />
                <PlayAsButton
                  content="White"
                  href={`/againstComputer?stockfishLevel=${stockfishLevel}&playAs=white`}
                  stockfishLevel={stockfishLevel}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameSelectionModal;
