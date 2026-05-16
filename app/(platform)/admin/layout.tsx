"use client";

import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      {children}
    </div>
  );
}
