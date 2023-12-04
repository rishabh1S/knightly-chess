"use client";
import { ChessboardComponent } from "@/components";

const AgainstPlayer: React.FC = () => {
  return (
    <div className="h-screen bg-gray-800 text-white flex md:flex-row flex-col">
      {/* Left side: Chessboard */}
      <div className="flex flex-col items-center justify-center p-8 pl-12">
        <div></div>
        <ChessboardComponent />
        <div></div>
      </div>

      {/* Right side: Chat feature */}
      <div className="sm:w-2/5 w-4/5 bg-gray-900 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Chat</h2>
          {/* Add your chat UI components here */}
        </div>
      </div>
    </div>
  );
};

export default AgainstPlayer;
