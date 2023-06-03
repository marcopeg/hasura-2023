INSERT INTO "public"."todos" ("created_at", "title")
SELECT
  (now() - random() * INTERVAL '7 days') AS created_at,
  'Event ' || ROW_NUMBER() OVER () AS title
FROM generate_series(1, 1000);
