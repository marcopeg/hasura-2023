-- Read from the current table
SELECT COUNT(*) FROM "public"."cities";

-- Transactions are wonderful to play around
-- without actually modifying the state of the db!
BEGIN;
TRUNCATE "public"."fake_cities";
SELECT COUNT(*) FROM "public"."fake_cities";
ROLLBACK;

-- Double check that no data was delete
SELECT COUNT(*) FROM "public"."fake_cities";