TRUNCATE "public"."users", "public"."events" RESTART IDENTITY CASCADE;

SELECT setval(pg_get_serial_sequence('"public"."users"', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('"public"."events"', 'id'), 1, false);

INSERT INTO "public"."users" ("username")
VALUES 
('HappyGoalie'),
('ScoringStriker'),
('DefensiveDribbler'),
('JollyKeeper'),
('DashingDefender');

-- Football events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Football',
  jsonb_build_object(
    'teamA', 'Team ' || (random() * 100)::integer,
    'teamB', 'Team ' || (random() * 100)::integer,
    'scoreA', (random() * 5)::integer,
    'scoreB', (random() * 5)::integer,
    'fouls', (random() * 50)::integer,
    'corners', (random() * 15)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;

-- Baseball events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Baseball',
  jsonb_build_object(
    'teamA', 'Team ' || (random() * 100)::integer,
    'teamB', 'Team ' || (random() * 100)::integer,
    'scoreA', (random() * 10)::integer,
    'scoreB', (random() * 10)::integer,
    'hits', (random() * 30)::integer,
    'errors', (random() * 5)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;


-- Golf events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Golf',
  jsonb_build_object(
    'player', 'Player ' || (random() * 100)::integer,
    'course', 'Course ' || (random() * 50)::integer,
    'par', (random() * 72)::integer,
    'score', ((random() * 20) + 52)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;
