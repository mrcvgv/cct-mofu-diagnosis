import { createClient } from "@supabase/supabase-js";
import { MORPH_PROFILES } from "@/data/morphProfiles";
import { TYPE_PROFILES } from "@/data/typeProfiles";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function trackDiagnosis(
  morphId: string,
  typeId: string,
  axisScores: Record<string, number>
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    await supabase
      .from("diagnosis_events")
      .insert({ morph_id: morphId, type_id: typeId, axis_scores: axisScores });
  } catch {
    // best-effort
  }
}

export interface MorphStat {
  id: string;
  name: string;
  count: number;
  pct: number;
}

export interface TypeStat {
  id: string;
  name: string;
  count: number;
  pct: number;
}

export interface StatsData {
  total: number;
  morphCounts: MorphStat[];
  typeCounts: TypeStat[];
}

export async function getStats(): Promise<StatsData | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("get_diagnosis_stats");
    if (error || !data) return null;

    const total: number = data.total ?? 0;
    const byMorph: Record<string, number> = data.by_morph ?? {};
    const byType: Record<string, number> = data.by_type ?? {};

    const morphCounts: MorphStat[] = MORPH_PROFILES.map((m) => {
      const count = byMorph[m.id] ?? 0;
      return { id: m.id, name: m.name, count, pct: total > 0 ? (count / total) * 100 : 0 };
    }).sort((a, b) => b.count - a.count);

    const typeCounts: TypeStat[] = TYPE_PROFILES.map((t) => {
      const count = byType[t.id] ?? 0;
      return { id: t.id, name: t.name, count, pct: total > 0 ? (count / total) * 100 : 0 };
    }).sort((a, b) => b.count - a.count);

    return { total, morphCounts, typeCounts };
  } catch {
    return null;
  }
}
