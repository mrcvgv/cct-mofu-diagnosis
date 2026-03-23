import {
  DiagnosisInput,
  DiagnosisOptions,
  DiagnosisResult,
  DiagnosisResultItem,
  MorphProfile,
  Question,
  TypeProfile,
} from "../types";
import { calculateAxisScores } from "./scoreCalculator";
import { rankMorphs } from "./morphMatcher";
import { rankTypes } from "./typeMatcher";

// ============================================================
// 診断エンジン — メインエントリポイント
// ============================================================
//
// 処理フロー:
//   1. calculateAxisScores: 質問回答 → 11軸スコア
//   2. rankMorphs:          11軸スコア → 20モフのランキング
//   3. rankTypes:           11軸スコア → 5系のランキング
//   4. 組み合わせ:           モフ×系 → メイン結果 + サブ候補
//
// サブ候補の生成ルール:
//   - sub[0]: 2位モフ × 1位系  （モフが違うバージョン）
//   - sub[1]: 1位モフ × 2位系  （系が違うバージョン）
//   - sub[2以降]: 3位モフ × 1位系, 2位モフ × 2位系, ... と広げる
//
// ============================================================

function buildFullName(type: TypeProfile, morph: MorphProfile): string {
  return `${type.name}${morph.name}`;
}

/**
 * CCTモフ診断を実行する
 *
 * @param input    ユーザーの回答
 * @param questions 質問データ
 * @param morphProfiles 20モフのプロフィール
 * @param typeProfiles  5系のプロフィール
 * @param options  オプション（サブ数・軸重みなど）
 */
export function diagnose(
  input: DiagnosisInput,
  questions: Question[],
  morphProfiles: MorphProfile[],
  typeProfiles: TypeProfile[],
  options: DiagnosisOptions = {}
): DiagnosisResult {
  const { subResultCount = 2, morphAxisWeights = {} } = options;

  // Step 1: 軸スコア算出
  const axisScores = calculateAxisScores(input.answers, questions);

  // Step 2: モフランキング
  const morphRanking = rankMorphs(axisScores, morphProfiles, {
    axisWeights: morphAxisWeights,
  });

  // Step 3: 系ランキング
  const typeRanking = rankTypes(axisScores, typeProfiles);

  // Step 4: メイン結果（1位モフ × 1位系）
  const mainMorph = morphRanking[0].morph;
  const mainType = typeRanking[0].type;
  const main: DiagnosisResultItem = {
    morph: mainMorph,
    type: mainType,
    fullName: buildFullName(mainType, mainMorph),
  };

  // Step 5: サブ候補を生成
  // sub[i] = i+1 位のモフ × 1位系、または 1位モフ × i+1 位系を交互に
  const sub: DiagnosisResultItem[] = [];
  for (let i = 0; i < subResultCount; i++) {
    let subMorph: MorphProfile;
    let subType: TypeProfile;

    if (i % 2 === 0) {
      // 偶数インデックス: モフを変える
      const morphIdx = Math.floor(i / 2) + 1;
      subMorph = morphRanking[Math.min(morphIdx, morphRanking.length - 1)].morph;
      subType = mainType;
    } else {
      // 奇数インデックス: 系を変える
      const typeIdx = Math.floor(i / 2) + 1;
      subMorph = mainMorph;
      subType = typeRanking[Math.min(typeIdx, typeRanking.length - 1)].type;
    }

    sub.push({
      morph: subMorph,
      type: subType,
      fullName: buildFullName(subType, subMorph),
    });
  }

  return {
    axisScores,
    main,
    sub,
    details: {
      morphRanking,
      typeRanking,
    },
  };
}
