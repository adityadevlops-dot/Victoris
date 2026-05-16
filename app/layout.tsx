import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VICTORIS - Competitive Coding Arena",
  description:
    "Real-time competitive coding battles. Test your skills against other developers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-background text-neutral-50">{children}</body>
    </html>
  );
}
