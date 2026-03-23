import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const morphName  = searchParams.get("morph") ?? "モフ";
  const typeName   = searchParams.get("type")  ?? "";
  const catchphrase = searchParams.get("cp")   ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* ブランド */}
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 26, letterSpacing: "0.2em", marginBottom: 32 }}>
          CANDYCONTOWN
        </div>

        {/* カード枠 */}
        <div
          style={{
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 28,
            padding: "52px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            minWidth: 700,
          }}
        >
          {/* 系バッジ */}
          {typeName && (
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                padding: "8px 28px",
                color: "rgba(255,255,255,0.85)",
                fontSize: 28,
                marginBottom: 24,
              }}
            >
              {typeName}
            </div>
          )}

          {/* モフ名（主役） */}
          <div
            style={{
              color: "#ffffff",
              fontSize: 100,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            {morphName}
          </div>

          {/* キャッチフレーズ */}
          {catchphrase && (
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 34 }}>
              {catchphrase}
            </div>
          )}
        </div>

        {/* ハッシュタグ */}
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 22, marginTop: 32 }}>
          #CCTモフ診断　#CANDYCONTOWN
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
