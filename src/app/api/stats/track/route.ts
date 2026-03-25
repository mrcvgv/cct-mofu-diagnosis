import { NextRequest, NextResponse } from "next/server";
import { trackDiagnosis } from "@/lib/stats";

export async function POST(req: NextRequest) {
  try {
    const { morphId, typeId, axisScores } = await req.json();
    if (!morphId || !typeId) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    await trackDiagnosis(morphId, typeId, axisScores ?? {});
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
