DROP TRIGGER IF EXISTS "users_audit_trail_trg" ON "users";

DROP FUNCTION IF EXISTS "append_audit_trail"();

DROP TABLE IF EXISTS "audit_trails";

DROP EXTENSION IF EXISTS "uuid-ossp";
