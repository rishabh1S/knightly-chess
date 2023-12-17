import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="font-black text-gray-100 text-3xl">Knightly</h1>
      <div className="flex justify-center items-center gap-4">
        <Button color="success" variant="ghost">
          <Link href="/againstPlayer">Against Player</Link>
        </Button>
        <Button color="success" variant="ghost">
          <Link href="/againstBot">Against Bot</Link>
        </Button>
      </div>
    </main>
  );
}
