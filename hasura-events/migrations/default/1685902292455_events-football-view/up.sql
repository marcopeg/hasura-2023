CREATE VIEW "public"."events_football" AS
SELECT 
  "id",
  "user_id",
  "type",
  "happened_at",
  "created_at",
  ("data"->>'teamA')::text AS "teamA",
  ("data"->>'teamB')::text AS "teamB",
  ("data"->>'scoreA')::integer AS "scoreA",
  ("data"->>'scoreB')::integer AS "scoreB",
  ("data"->>'fouls')::integer AS "fouls",
  ("data"->>'corners')::integer AS "corners"
FROM 
  "public"."events"
WHERE 
  "type" = 'Football';