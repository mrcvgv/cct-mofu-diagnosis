import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCTモフ診断",
  description: "あなたはどのモフ？20モフ×5系＝100タイプの中からあなたを診断します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
