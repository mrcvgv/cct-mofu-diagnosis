import { AxisDefinition, AxisId } from "../types";

// ============================================================
// 11共通軸 — 定義一覧
// ============================================================

export const ALL_AXIS_IDS: AxisId[] = [
  "action",
  "social",
  "logic",
  "creativity",
  "stability",
  "empathy",
  "charisma",
  "curiosity",
  "purpose",
  "chaos",
  "competition",
];

export const AXIS_DEFINITIONS: AxisDefinition[] = [
  {
    id: "action",
    name: "行動力",
    lowLabel: "慎重・じっくり",
    highLabel: "即行動・どんどん進む",
  },
  {
    id: "social",
    name: "社交性",
    lowLabel: "1人が好き・単独行動",
    highLabel: "みんなと一緒が好き",
  },
  {
    id: "logic",
    name: "論理性",
    lowLabel: "感覚・フィーリング重視",
    highLabel: "データ・論理重視",
  },
  {
    id: "creativity",
    name: "創造性",
    lowLabel: "現実・既存の方法を活用",
    highLabel: "発想・新しいアイデア優先",
  },
  {
    id: "stability",
    name: "安定志向",
    lowLabel: "変化・新しい環境が好き",
    highLabel: "安定・慣れた環境が落ち着く",
  },
  {
    id: "empathy",
    name: "共感性",
    lowLabel: "ドライ・感情に左右されない",
    highLabel: "共感強め・他者の気持ちに敏感",
  },
  {
    id: "charisma",
    name: "影響力",
    lowLabel: "控えめ・目立ちたくない",
    highLabel: "カリスマ・存在感が強い",
  },
  {
    id: "curiosity",
    name: "好奇心",
    lowLabel: "保守・慣れたものが好き",
    highLabel: "探索・知らないことに飛び込む",
  },
  {
    id: "purpose",
    name: "幸福 ↔ 目的",
    lowLabel: "楽しさ・幸福を最優先",
    highLabel: "使命・目標達成を最優先",
  },
  {
    id: "chaos",
    name: "秩序 ↔ カオス",
    lowLabel: "秩序・ルール・計画重視",
    highLabel: "カオス・行き当たりばったりOK",
  },
  {
    id: "competition",
    name: "平和 ↔ 競争",
    lowLabel: "平和・争いを避ける",
    highLabel: "競争・勝負事が好き",
  },
];

/** 軸IDから定義を引く用のマップ */
export const AXIS_MAP: Record<AxisId, AxisDefinition> = Object.fromEntries(
  AXIS_DEFINITIONS.map((a) => [a.id, a])
) as Record<AxisId, AxisDefinition>;
