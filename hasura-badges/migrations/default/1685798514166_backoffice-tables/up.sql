CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "roles" JSONB NOT NULL DEFAULT '{}',
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE VIEW "engineers" AS
SELECT id, name
FROM users
WHERE roles @> '["engineer"]'::jsonb;

CREATE VIEW "managers" AS
SELECT id, name
FROM users
WHERE roles @> '["manager"]'::jsonb;


CREATE TABLE public.users_relations (
  manager integer NOT NULL REFERENCES public.users(id),
  engineer integer NOT NULL REFERENCES public.users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  -- "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  -- "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  PRIMARY KEY (manager, engineer)
);

CREATE VIEW "engineering_teams" AS
SELECT 
    u.id AS manager_id, 
    u.name AS manager_name,
    json_agg(json_build_object('id', ur.engineer, 'name', e.name, 'created_at', ur.created_at)) AS items
FROM "users" u
JOIN "users_relations" ur ON u.id = ur.manager
JOIN "users" e ON ur.engineer = e.id
WHERE u.roles @> '["manager"]'::jsonb
GROUP BY u.id, u.name;

CREATE TABLE "badges_definitions" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT
);

CREATE TABLE "requirements_definitions" (
  "id" SERIAL PRIMARY KEY,
  "badge_id" INTEGER REFERENCES "badges_definitions"("id") ON DELETE RESTRICT,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "users"("id") ON DELETE RESTRICT
);
