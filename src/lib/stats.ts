import { createClient } from "@supabase/supabase-js";
import { MORPH_PROFILES } from "@/data/morphProfiles";
import { TYPE_PROFILES } from "@/data/typeProfiles";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ────────────────────────────────────────────────────────────
// Track: diagnosis complete
// ────────────────────────────────────────────────────────────
export async function trackDiagnosis(payload: {
  morphId: string;
  typeId: string;
  axisScores: Record<string, number>;
  sessionId?: string;
  subMorphIds?: string[];
  answers?: Record<string, number>;
  timeSpentMs?: number;
  questionTimings?: Record<string, number>;
  referrer?: string;
  isMobile?: boolean;
  retakeCount?: number;
}): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    await supabase.from("diagnosis_events").insert({
      morph_id:         payload.morphId,
      type_id:          payload.typeId,
      axis_scores:      payload.axisScores,
      session_id:       payload.sessionId       ?? null,
      sub_morph_ids:    payload.subMorphIds      ?? [],
      answers:          payload.answers          ?? {},
      time_spent_ms:    payload.timeSpentMs      ?? null,
      question_timings: payload.questionTimings  ?? {},
      referrer:         payload.referrer         ?? null,
      is_mobile:        payload.isMobile         ?? null,
      retake_count:     payload.retakeCount      ?? 0,
    });
  } catch {
    // best-effort
  }
}

// ────────────────────────────────────────────────────────────
// Track: any interaction (share, CTA, page_view, purchase, etc.)
// ────────────────────────────────────────────────────────────
export async function trackInteraction(payload: {
  eventType: string;
  sessionId?: string;
  morphId?: string;
  properties?: Record<string, unknown>;
}): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    await supabase.from("interaction_events").insert({
      event_type: payload.eventType,
      session_id: payload.sessionId ?? null,
      morph_id:   payload.morphId   ?? null,
      properties: payload.properties ?? {},
    });
  } catch {
    // best-effort
  }
}

// ────────────────────────────────────────────────────────────
// Stats types
// ────────────────────────────────────────────────────────────
export interface MorphStat {
  id: string;
  name: string;
  count: number;
  pct: number;
  shares: number;
  ctas: number;
  purchases: number;
}

export interface TypeStat {
  id: string;
  name: string;
  count: number;
  pct: number;
}

export interface SubMorphStat {
  id: string;
  name: string;
  count: number;
}

export interface StatsData {
  total: number;
  recent7d: number;
  avgTimeMs: number | null;
  mobileRate: number;
  avgRetakes: number | null;
  quizStarts: number;
  completionRate: number | null;
  shareRate: number;
  ctaRate: number;
  purchaseRate: number;
  morphCounts: MorphStat[];
  typeCounts: TypeStat[];
  subMorphCounts: SubMorphStat[];
  byShare: Record<string, number>;
  byCta: Record<string, number>;
  byPurchase: Record<string, number>;
  byPageView: Record<string, number>;
}

// ────────────────────────────────────────────────────────────
// Fetch aggregated stats via RPC
// ────────────────────────────────────────────────────────────
export async function getStats(): Promise<StatsData | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("get_diagnosis_stats");
    if (error || !data) return null;

    const total: number = Number(data.total ?? 0);
    const byMorph: Record<string, number> = data.by_morph ?? {};
    const byType: Record<string, number> = data.by_type ?? {};
    const subMorphsRaw: Record<string, number> = data.sub_morphs ?? {};
    const morphConv: Record<string, { diagnoses: number; shares: number; ctas: number; purchases: number }> =
      data.morph_conversions ?? {};

    const morphCounts: MorphStat[] = MORPH_PROFILES.map((m) => {
      const count = byMorph[m.id] ?? 0;
      const conv  = morphConv[m.id] ?? { shares: 0, ctas: 0, purchases: 0 };
      return {
        id: m.id, name: m.name, count,
        pct: total > 0 ? (count / total) * 100 : 0,
        shares: conv.shares, ctas: conv.ctas, purchases: conv.purchases,
      };
    }).sort((a, b) => b.count - a.count);

    const typeCounts: TypeStat[] = TYPE_PROFILES.map((t) => {
      const count = byType[t.id] ?? 0;
      return { id: t.id, name: t.name, count, pct: total > 0 ? (count / total) * 100 : 0 };
    }).sort((a, b) => b.count - a.count);

    const subMorphCounts: SubMorphStat[] = Object.entries(subMorphsRaw)
      .map(([id, count]) => ({
        id,
        name: MORPH_PROFILES.find((m) => m.id === id)?.name ?? id,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      recent7d:       Number(data.recent_7d   ?? 0),
      avgTimeMs:      data.avg_time_ms  != null ? Number(data.avg_time_ms)  : null,
      mobileRate:     Number(data.mobile_rate  ?? 0),
      avgRetakes:     data.avg_retakes   != null ? Number(data.avg_retakes)  : null,
      quizStarts:     Number(data.quiz_starts  ?? 0),
      completionRate: data.completion_rate != null ? Number(data.completion_rate) : null,
      shareRate:      Number(data.share_rate   ?? 0),
      ctaRate:        Number(data.cta_rate     ?? 0),
      purchaseRate:   Number(data.purchase_rate ?? 0),
      morphCounts,
      typeCounts,
      subMorphCounts,
      byShare:    data.by_share    ?? {},
      byCta:      data.by_cta      ?? {},
      byPurchase: data.by_purchase ?? {},
      byPageView: data.by_page_view ?? {},
    };
  } catch {
    return null;
  }
}
