CREATE TABLE "public"."todos" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "title" text NOT NULL, PRIMARY KEY ("id") );
