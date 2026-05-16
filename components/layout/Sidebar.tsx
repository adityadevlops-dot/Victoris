"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/arena", label: "Arena", icon: "⚔️" },
  { href: "/battles", label: "Battles", icon: "🔥" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
];

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 hidden md:flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-accent">VICTORIS</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-neutral-400 hover:bg-neutral-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 pt-4">
        <Link
          href="/profile/user"
          className="flex items-center gap-3 px-4 py-2 rounded-md text-neutral-400 hover:bg-neutral-800 transition-colors"
        >
          <div className="w-8 h-8 bg-neutral-800 rounded-full" />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}
