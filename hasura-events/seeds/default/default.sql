-- Insert 10 users
INSERT INTO "public"."users" ("name")
VALUES
    ('User 1'),
    ('User 2'),
    ('User 3'),
    ('User 4'),
    ('User 5'),
    ('User 6'),
    ('User 7'),
    ('User 8'),
    ('User 9'),
    ('User 10')
ON CONFLICT DO NOTHING;

-- Generate 10,000 events for football matches with random data
INSERT INTO "public"."events" ("created_at", "user_id", "data")
SELECT
    now() - INTERVAL '2 years' + (floor(random() * 730) || ' days')::interval,
    floor(random() * 10) + 1,
    jsonb_build_object(
        'goals', floor(random() * 5) + 1,
        'corners', floor(random() * 10) + 1,
        'fouls', floor(random() * 20) + 1
    )
FROM generate_series(1, 10000)
ON CONFLICT DO NOTHING;

-- Generate 10,000 personal journal annotations with random data
INSERT INTO "public"."events" ("created_at", "user_id", "data")
SELECT
    now() - INTERVAL '2 years' + (floor(random() * 730) || ' days')::interval,
    floor(random() * 10) + 1,
    jsonb_build_object(
        'entry', 'Annotation ' || generate_series,
        'mood', floor(random() * 10) + 1,
        'note', 'Some random note for Annotation ' || generate_series
    )
FROM generate_series(1, 10000)
ON CONFLICT DO NOTHING;

-- Generate 10,000 bank transactions with random data
INSERT INTO "public"."events" ("created_at", "user_id", "data")
SELECT
    now() - INTERVAL '2 years' + (floor(random() * 730) || ' days')::interval,
    floor(random() * 10) + 1,
    jsonb_build_object(
        'type', 'Transaction',
        'amount', floor(random() * 1000) + 1,
        'description', 'Random transaction ' || generate_series
    )
FROM generate_series(1, 10000)
ON CONFLICT DO NOTHING;
