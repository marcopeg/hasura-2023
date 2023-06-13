CREATE TABLE "backoffice_users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "badges_definitions" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "backoffice_users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "backoffice_users"("id") ON DELETE RESTRICT
);

CREATE TABLE "requirements_definitions" (
  "id" SERIAL PRIMARY KEY,
  "badge_id" INTEGER REFERENCES "badges_definitions"("id") ON DELETE RESTRICT,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "created_by" INTEGER REFERENCES "backoffice_users"("id") ON DELETE RESTRICT,
  "modified_at" TIMESTAMP NOT NULL DEFAULT now(),
  "modified_by" INTEGER REFERENCES "backoffice_users"("id") ON DELETE RESTRICT
);
