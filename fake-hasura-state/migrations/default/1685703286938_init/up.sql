CREATE TABLE "public"."fake_demo_events" (
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "data" JSONB NOT NULL,
    PRIMARY KEY ("created_at")
);
