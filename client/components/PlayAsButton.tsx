import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface PlayAsButtonProps {
  content: string;
  href: string;
  stockfishLevel: number;
}

const PlayAsButton: React.FC<PlayAsButtonProps> = ({ content, href }) => (
  <Tooltip content={content}>
    <Link href={href}>
      <Button
        isIconOnly
        size="lg"
        radius="none"
        color="default"
        variant="ghost"
        className="bg-zinc-800 mx-1"
      >
        <Image
          src={`/images/chess_${content.toLowerCase()}.svg`}
          alt={`chess-${content.toLowerCase()}`}
          width={50}
          height={50}
        />
      </Button>
    </Link>
  </Tooltip>
);

export default PlayAsButton;
