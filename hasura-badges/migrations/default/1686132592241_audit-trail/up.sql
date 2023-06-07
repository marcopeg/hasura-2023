CREATE TABLE public.audit_trail (
    id serial PRIMARY KEY,
    created_at timestamp without time zone DEFAULT now(),
    pg_user text,
    tenant_id integer,
    data jsonb
);


CREATE OR REPLACE FUNCTION public.track_table_changes() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_trail (pg_user, data)
  VALUES (
    current_user,
    jsonb_build_object(
      'database', current_database(),
      'schema', current_schema(),
      'table', TG_TABLE_NAME,
      'action', TG_OP,
      'old_data', row_to_json(OLD),
      'new_data', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER badge_defs_audit_trail
AFTER INSERT OR UPDATE OR DELETE ON public.badge_defs
FOR EACH ROW EXECUTE PROCEDURE public.track_table_changes();

CREATE TRIGGER badge_defs_audit_trail
AFTER INSERT OR UPDATE OR DELETE ON public.badge_reqs
FOR EACH ROW EXECUTE PROCEDURE public.track_table_changes();