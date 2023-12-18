"use client";
import Link from "next/link";
import {
  Button,
  Select,
  SelectItem,
  Navbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/react";

const levels = {
  "Easy 🤓": 2,
  "Medium 🧐": 8,
  "Hard 😵": 18,
};

const timers = {
  "Rapid 🤓": 10,
  "Blitz 🧐": 3,
  "Bullet 😵": 1,
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar disableAnimation isBordered>
        <NavbarContent className="pr-3" justify="center">
          <NavbarBrand>
            <p className="font-black text-black">Knightly</p>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
      <div className="flex justify-center text-center">
        <div className="grid grid-cols-2 grid-rows-1 gap-20 w-1/2">
          <div className="flex flex-col gap-6">
            <h1>Against Player</h1>
            <Select placeholder="Play Rapid" className="max-w-xs">
              {Object.entries(timers).map(([label, value]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            <Button color="success" variant="ghost">
              <Link href="/againstPlayer">Play</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <h1>Against Bot</h1>
            <Select placeholder="Play Easy" className="max-w-xs">
              {Object.entries(levels).map(([label, value]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            <Button color="success" variant="ghost">
              <Link href="/againstBot">Play</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
