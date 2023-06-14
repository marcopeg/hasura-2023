CREATE TABLE "badges_versions" (
  "id" INTEGER,
  "title" VARCHAR(255),
  "description" TEXT,
  "requirements" JSON,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT
);

CREATE OR REPLACE FUNCTION "save_badge"(
  "hasura_session" JSON,
  "badge_def_id" INTEGER
)
RETURNS SETOF "badges_versions" AS $$
DECLARE
  user_id integer := (hasura_session ->> 'x-hasura-user-id')::integer;
BEGIN
  RETURN QUERY
  INSERT INTO "badges_versions"(
    "id", 
    "title", 
    "description", 
    "requirements", 
    "created_at",
    "created_by"
  )
  SELECT 
    "bd"."id", 
    "bd"."title", 
    "bd"."description", 
    coalesce(
        json_agg(
            json_build_object(
                'id', "rd"."id", 
                'title', "rd"."title", 
                'description', "rd"."description"
            ) 
            ORDER BY "rd"."id"
        ) FILTER (WHERE "rd"."id" IS NOT NULL),
        '[]'::json
    ) AS "requirements",
    now(), 
    user_id
  FROM "badges_definitions" "bd"
  LEFT JOIN "requirements_definitions" "rd" ON "bd"."id" = "rd"."badge_id"
  WHERE "bd"."id" = "badge_def_id"
  GROUP BY "bd"."id", "bd"."title", "bd"."description"
  RETURNING *;
END; $$ LANGUAGE plpgsql;
