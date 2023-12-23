import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameResult: string | null;
  onNewGame: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  gameResult,
  onNewGame,
}) => {
  const handleNewGameClick = () => {
    onNewGame();
    onClose();
  };
  return (
    <>
      <Modal size="sm" isOpen={isOpen} onClose={onClose} isDismissable={false}>
        <ModalContent className="p-2">
          {() => (
            <>
              <ModalHeader className="flex justify-center text-3xl font-extralight">
                {gameResult && <p>{gameResult}</p>}
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-1">
                    <Image
                      src="/images/def_stock.jpeg"
                      width={60}
                      height={60}
                      alt="Bot Profile"
                      className="rounded-md"
                    />
                    <p className="text-sm font-light">StockFish</p>
                  </div>
                  <div className="text-lg">Vs</div>
                  <div className="flex flex-col items-center gap-1">
                    <Image
                      src="/images/def_user.jpeg"
                      width={60}
                      height={60}
                      alt="User Profile"
                      className="rounded-md"
                    />
                    <p className="text-sm font-light">User</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="success"
                  variant="ghost"
                  onClick={handleNewGameClick}
                >
                  New Game
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameModal;
