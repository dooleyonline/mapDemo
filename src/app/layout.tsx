import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Map App",
  description: "Next.js + MapLibre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
