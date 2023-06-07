CREATE TABLE public.badge_defs (
    id serial PRIMARY KEY,
    description text
);

CREATE TABLE public.badge_reqs (
    id serial PRIMARY KEY,
    badge_defs_id integer,
    description text,
    FOREIGN KEY (badge_defs_id) REFERENCES public.badge_defs(id)
);

CREATE TABLE public.badges (
    id serial PRIMARY KEY,
    badge_defs_id integer,
    version timestamp without time zone default now(),
    data text,
    FOREIGN KEY (badge_defs_id) REFERENCES public.badge_defs(id)
);

CREATE TABLE public.candidates (
    id serial PRIMARY KEY,
    name text
);

CREATE TABLE public.proposals (
    id serial PRIMARY KEY,
    created_at timestamp without time zone DEFAULT now(),
    notes text,
    badge_id integer,
    candidate_id integer,
    FOREIGN KEY (badge_id) REFERENCES public.badges(id),
    FOREIGN KEY (candidate_id) REFERENCES public.candidates(id)
);

CREATE TABLE public.evidences (
    id serial PRIMARY KEY,
    requirement_id integer,
    proposal_id integer,
    FOREIGN KEY (proposal_id) REFERENCES public.proposals(id)
);
