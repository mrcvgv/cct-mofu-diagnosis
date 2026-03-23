import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://cct-mofu-diagnosis.vercel.app";

export const metadata: Metadata = {
  title: "CCTモフ診断 — あなたはどのモフ？",
  description:
    "20モフ × 5系 = 100タイプの中からあなたにぴったりのモフを診断！55問の質問に答えるだけ。",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "CCTモフ診断 — あなたはどのモフ？",
    description:
      "20モフ × 5系 = 100タイプ。55問に答えて、あなたのモフタイプを診断しよう！",
    url: SITE_URL,
    siteName: "CCTモフ診断",
    locale: "ja_JP",
    type: "website",
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }], // TODO: OG画像を追加
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTモフ診断 — あなたはどのモフ？",
    description: "20モフ × 5系 = 100タイプ。あなたのモフタイプを診断しよう！",
    // images: ["/og-image.png"], // TODO: OG画像を追加
  },
  keywords: ["モフ診断", "CCT", "キャラクター診断", "性格診断", "占い"],
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
