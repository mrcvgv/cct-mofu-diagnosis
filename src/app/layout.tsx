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
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/8 bg-[#0f3460]/60 py-5 px-4">
          <div className="max-w-lg mx-auto flex flex-col items-center gap-3">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
              {[
                { href: "/legal",   label: "特定商取引法に基づく表記" },
                { href: "/privacy", label: "プライバシーポリシー" },
                { href: "/terms",   label: "利用規約" },
              ].map(({ href, label }) => (
                <a key={href} href={href}
                  className="text-white/35 text-xs hover:text-white/60 transition-colors">
                  {label}
                </a>
              ))}
            </nav>
            <p className="text-white/20 text-xs">
              &copy; {new Date().getFullYear()} Cream. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
