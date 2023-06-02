-- Read from the current table
SELECT COUNT(*) FROM "public"."demo_events";

-- Transactions are wonderful to play around
-- without actually modifying the state of the db!
BEGIN;
TRUNCATE "public"."demo_events";
SELECT COUNT(*) FROM "public"."demo_events";
ROLLBACK;

-- Double check that no data was delete
SELECT COUNT(*) FROM "public"."demo_events";