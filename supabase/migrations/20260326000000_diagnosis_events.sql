-- diagnosis_events: 診断結果ログ
-- 誰がどのモフになったか + 11軸スコアを保存する

CREATE TABLE IF NOT EXISTS diagnosis_events (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  morph_id    text        NOT NULL,
  type_id     text        NOT NULL,
  axis_scores jsonb       NOT NULL DEFAULT '{}',
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_de_morph_id    ON diagnosis_events(morph_id);
CREATE INDEX IF NOT EXISTS idx_de_type_id     ON diagnosis_events(type_id);
CREATE INDEX IF NOT EXISTS idx_de_created_at  ON diagnosis_events(created_at);

-- stats用RPC: 1回のコールでmorph別・type別カウントを返す
CREATE OR REPLACE FUNCTION get_diagnosis_stats()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT json_build_object(
    'total',    COUNT(*),
    'by_morph', (
      SELECT COALESCE(json_object_agg(morph_id, cnt), '{}')
      FROM (SELECT morph_id, COUNT(*) AS cnt FROM diagnosis_events GROUP BY morph_id) t
    ),
    'by_type',  (
      SELECT COALESCE(json_object_agg(type_id, cnt), '{}')
      FROM (SELECT type_id, COUNT(*) AS cnt FROM diagnosis_events GROUP BY type_id) t
    )
  )
  FROM diagnosis_events;
$$;
