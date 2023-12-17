import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="font-black text-gray-100 text-3xl">Knightly</h1>
      <div className="flex justify-center items-center">
        <Link
          className="mx-2 border px-3 py-2 rounded-lg hover:bg-slate-200 hover:text-black"
          href="/againstPlayer"
        >
          Against Player
        </Link>
        <Link
          className="mx-2 border px-3 py-2 rounded-lg hover:bg-slate-200 hover:text-black"
          href="/againstBot"
        >
          Against Chess Bot
        </Link>
      </div>
    </main>
  );
}
