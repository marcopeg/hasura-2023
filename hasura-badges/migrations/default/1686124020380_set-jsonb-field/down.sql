ALTER TABLE public.badges
    DROP COLUMN data;

ALTER TABLE public.badges
    ADD COLUMN data text;
