CREATE TABLE "public"."users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL
    -- Any additional fields...
);

CREATE TABLE "public"."events"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "happened_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE
);