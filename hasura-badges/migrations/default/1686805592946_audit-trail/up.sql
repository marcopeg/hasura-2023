CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "audit_trails" (
  "id" SERIAL PRIMARY KEY,
  "uuid" UUID DEFAULT uuid_generate_v4() UNIQUE,
  "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  "created_by" TEXT DEFAULT CURRENT_USER,
  "schema_name" TEXT,
  "table_name" TEXT,
  "op_name" TEXT,
  "value_old" JSONB,
  "value_new" JSONB,
  "info" JSONB
);

CREATE OR REPLACE FUNCTION "trigger_audit_trail"() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "audit_trails"(
    schema_name,
    table_name,
    op_name,
    value_old,
    value_new,
    info
  ) VALUES(
    TG_TABLE_SCHEMA,
    TG_TABLE_NAME,
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
    json_build_object('active_connections', (SELECT COUNT(*) FROM pg_stat_activity), 'current_database', current_database(), 'client_ip', inet_client_addr())
  );
  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER "users_audit_trail_trg"
AFTER INSERT OR UPDATE OR DELETE ON "users"
FOR EACH ROW EXECUTE PROCEDURE "trigger_audit_trail"();

CREATE TRIGGER "badges_definitions_audit_trail_trg"
AFTER INSERT OR UPDATE OR DELETE ON "badges_definitions"
FOR EACH ROW EXECUTE PROCEDURE "trigger_audit_trail"();

CREATE TRIGGER "requirements_definitions_audit_trail_trg"
AFTER INSERT OR UPDATE OR DELETE ON "requirements_definitions"
FOR EACH ROW EXECUTE PROCEDURE "trigger_audit_trail"();
