-- Read from the current table
SELECT COUNT(*) FROM "public"."fake_demo_events";

-- Transactions are wonderful to play around
-- without actually modifying the state of the db!
BEGIN;
TRUNCATE "public"."fake_demo_events";
SELECT data ->> 'corners' as corners 
FROM "public"."fake_demo_events" 
ROLLBACK;

-- Double check that no data was delete
-- SELECT corners FROM "public"."fake_demo_events";