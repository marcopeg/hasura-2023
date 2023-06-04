CREATE TABLE "public"."users" (
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

CREATE TABLE "public"."events" (
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "user_id" integer not null REFERENCES "public"."users" ("id") ON DELETE RESTRICT,
    "data" JSONB NOT NULL,
    PRIMARY KEY ("created_at")
);
