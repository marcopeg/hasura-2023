ALTER TABLE ONLY public.proposals
    DROP CONSTRAINT proposals_candidate_id_fkey;

ALTER TABLE ONLY public.proposals
    DROP CONSTRAINT proposals_badge_id_fkey;

ALTER TABLE ONLY public.evidences
    DROP CONSTRAINT evidences_proposal_id_fkey;

ALTER TABLE ONLY public.badges
    DROP CONSTRAINT badges_badge_defs_id_fkey;

ALTER TABLE ONLY public.badge_reqs
    DROP CONSTRAINT badge_reqs_badge_defs_id_fkey;

ALTER TABLE ONLY public.proposals
    DROP CONSTRAINT proposals_pkey;

ALTER TABLE ONLY public.evidences
    DROP CONSTRAINT evidences_pkey;

ALTER TABLE ONLY public.candidates
    DROP CONSTRAINT candidates_pkey;

ALTER TABLE ONLY public.badges
    DROP CONSTRAINT badges_pkey;

ALTER TABLE ONLY public.badge_reqs
    DROP CONSTRAINT badge_reqs_pkey;

ALTER TABLE ONLY public.badge_defs
    DROP CONSTRAINT badge_defs_pkey;

ALTER TABLE ONLY public.proposals
    ALTER COLUMN id SET DEFAULT nextval('public.proposals_id_seq'::regclass);

ALTER TABLE ONLY public.evidences
    ALTER COLUMN id SET DEFAULT nextval('public.evidences_id_seq'::regclass);

ALTER TABLE ONLY public.candidates
    ALTER COLUMN id SET DEFAULT nextval('public.candidates_id_seq'::regclass);

ALTER TABLE ONLY public.badges
    ALTER COLUMN id SET DEFAULT nextval('public.badges_id_seq'::regclass);

ALTER TABLE ONLY public.badge_reqs
    ALTER COLUMN id SET DEFAULT nextval('public.badge_reqs_id_seq'::regclass);

ALTER TABLE ONLY public.badge_defs
    ALTER COLUMN id SET DEFAULT nextval('public.badge_defs_id_seq'::regclass);

ALTER SEQUENCE public.proposals_id_seq OWNED BY NONE;

ALTER SEQUENCE public.evidences_id_seq OWNED BY NONE;

ALTER SEQUENCE public.candidates_id_seq OWNED BY NONE;

ALTER SEQUENCE public.badges_id_seq OWNED BY NONE;

ALTER SEQUENCE public.badge_reqs_id_seq OWNED BY NONE;

ALTER SEQUENCE public.badge_defs_id_seq OWNED BY NONE;

DROP TABLE public.proposals;

DROP TABLE public.evidences;

DROP TABLE public.candidates;

DROP TABLE public.badges;

DROP TABLE public.badge_reqs;

DROP TABLE public.badge_defs;
