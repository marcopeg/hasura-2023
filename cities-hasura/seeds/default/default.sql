-- Enable the pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Generate random data and insert into the cities table
INSERT INTO public.cities (name, country, population, area)
SELECT
  substr(gen_random_uuid()::text, 1, 10) AS name,
  substr(gen_random_uuid()::text, 1, 10) AS country,
  FLOOR(RANDOM() * 1000000) AS population,
  FLOOR(RANDOM() * 1000) AS area
FROM generate_series(1, 1000);
