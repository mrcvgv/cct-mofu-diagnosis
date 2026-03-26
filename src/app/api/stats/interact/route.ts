import { NextRequest, NextResponse } from "next/server";
import { trackInteraction } from "@/lib/stats";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType } = body;
    if (!eventType) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    await trackInteraction({
      eventType,
      sessionId:  body.sessionId  ?? undefined,
      morphId:    body.morphId    ?? undefined,
      properties: body.properties ?? {},
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
