"use client";

import { useState } from "react";

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-neutral-900 border-b border-neutral-800 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-xl">
          ☰
        </button>
        <h1 className="text-lg font-bold text-accent">VICTORIS</h1>
      </div>

      <div className="flex-1 hidden md:block" />

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors" />
      </div>
    </header>
  );
}
