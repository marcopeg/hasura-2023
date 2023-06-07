-- Drop Triggers
DROP TRIGGER IF EXISTS badge_defs_audit_trail ON public.badge_defs CASCADE;
DROP TRIGGER IF EXISTS badge_reqs_audit_trail ON public.badge_reqs CASCADE;

-- Drop Function
DROP FUNCTION IF EXISTS public.track_table_changes() CASCADE;

-- Drop Table
DROP TABLE IF EXISTS public.audit_trail;
