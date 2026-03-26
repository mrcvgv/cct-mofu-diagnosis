import { NextRequest, NextResponse } from "next/server";
import { trackDiagnosis } from "@/lib/stats";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { morphId, typeId } = body;
    if (!morphId || !typeId) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    await trackDiagnosis({
      morphId,
      typeId,
      axisScores:      body.axisScores      ?? {},
      sessionId:       body.sessionId       ?? undefined,
      subMorphIds:     body.subMorphIds      ?? [],
      answers:         body.answers          ?? {},
      timeSpentMs:     body.timeSpentMs      ?? undefined,
      questionTimings: body.questionTimings  ?? {},
      referrer:        body.referrer         ?? undefined,
      isMobile:        body.isMobile         ?? undefined,
      retakeCount:     body.retakeCount      ?? 0,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
