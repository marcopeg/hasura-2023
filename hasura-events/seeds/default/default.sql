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
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Football',
    jsonb_build_object('score', (random() * 10)::int, 'stadium', 'Stadium ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);

-- Baseball events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT 
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Baseball',
    jsonb_build_object('runs', (random() * 10)::int, 'stadium', 'Stadium ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);

-- Golf events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT 
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Golf',
    jsonb_build_object('strokes', (random() * 72)::int, 'course', 'Course ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);