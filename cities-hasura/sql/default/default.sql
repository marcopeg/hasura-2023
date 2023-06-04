-- Read from the current table
SELECT name, area / population AS population_density 
FROM "public"."cities";

-- Transactions are wonderful to play around
-- without actually modifying the state of the db!
BEGIN;
TRUNCATE "public"."cities";
SELECT name, area / population AS population_density 
FROM "public"."cities";
ROLLBACK;

-- Double check that no data was delete
SELECT name, area / population AS population_density 
FROM "public"."cities";