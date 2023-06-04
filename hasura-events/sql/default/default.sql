-- Read from the current table
SELECT COUNT(*) FROM "public"."events";

-- Transactions are wonderful to play around
-- without actually modifying the state of the db!
BEGIN;
TRUNCATE "public"."events";
SELECT COUNT(*) FROM "public"."events";
ROLLBACK;

-- Double check that no data was delete
SELECT COUNT(*) FROM "public"."events";