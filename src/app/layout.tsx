import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://cct-mofu-diagnosis.vercel.app";
const DEFAULT_OG = `${SITE_URL}/api/og?morph=%E3%83%91%E3%83%B3%E3%83%A2%E3%83%95&type=%E3%81%B5%E3%82%8F%E3%81%B5%E3%82%8F%E7%B3%BB&cp=%E4%B8%96%E7%95%8C%E3%81%8C%E6%84%9B%E3%81%99%E3%82%8B%E5%AD%98%E5%9C%A8`;

export const metadata: Metadata = {
  title: "CCTモフ診断 — あなたはどのモフ？",
  description:
    "20モフ × 5系 = 100タイプ。55問に答えて、あなたのモフタイプを診断しよう！",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "CCTモフ診断 — あなたはどのモフ？",
    description: "20モフ × 5系 = 100タイプ。あなたのモフタイプを診断しよう！",
    url: SITE_URL,
    siteName: "CCTモフ診断",
    locale: "ja_JP",
    type: "website",
    images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTモフ診断 — あなたはどのモフ？",
    description: "20モフ × 5系 = 100タイプ。あなたのモフタイプを診断しよう！",
    images: [DEFAULT_OG],
  },
  keywords: ["モフ診断", "CCT", "CANDYCONTOWN", "キャラクター診断", "性格診断"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
