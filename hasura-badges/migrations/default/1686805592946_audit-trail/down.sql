DROP TRIGGER IF EXISTS "users_audit_trail_trg" ON "users";
DROP TRIGGER IF EXISTS "badges_definitions_audit_trail_trg" ON "badges_definitions";
DROP TRIGGER IF EXISTS "requirements_definitions_audit_trail_trg" ON "requirements_definitions";

DROP FUNCTION IF EXISTS "trigger_audit_trail"();

DROP TABLE IF EXISTS "audit_trails";

DROP EXTENSION IF EXISTS "uuid-ossp";
