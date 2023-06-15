CREATE OR REPLACE FUNCTION "trigger_prevent_changes"()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletes are not allowed on this table';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "badges_versions_immutable"
BEFORE UPDATE OR DELETE ON "badges_versions"
FOR EACH ROW EXECUTE PROCEDURE "trigger_prevent_changes"();

CREATE TRIGGER "audit_trails_immutable"
BEFORE UPDATE OR DELETE ON "audit_trails"
FOR EACH ROW EXECUTE PROCEDURE "trigger_prevent_changes"();
