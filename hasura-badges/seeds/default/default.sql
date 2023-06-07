-- Truncate the tables in the correct order
TRUNCATE TABLE public.evidences CASCADE;
TRUNCATE TABLE public.proposals CASCADE;
TRUNCATE TABLE public.badges CASCADE;
TRUNCATE TABLE public.candidates CASCADE;
TRUNCATE TABLE public.badge_reqs CASCADE;
TRUNCATE TABLE public.badge_defs CASCADE;

-- Reset the sequences
ALTER SEQUENCE public.evidences_id_seq RESTART WITH 1;
ALTER SEQUENCE public.proposals_id_seq RESTART WITH 1;
ALTER SEQUENCE public.badges_id_seq RESTART WITH 1;
ALTER SEQUENCE public.candidates_id_seq RESTART WITH 1;
ALTER SEQUENCE public.badge_reqs_id_seq RESTART WITH 1;
ALTER SEQUENCE public.badge_defs_id_seq RESTART WITH 1;




-- Insert data into badge_defs table
INSERT INTO public.badge_defs (id, description) VALUES
(1, 'Software Engineering'),
(2, 'Data Science'),
(3, 'Cybersecurity'),
(4, 'Artificial Intelligence'),
(5, 'Database Management');

-- Insert data into badge_reqs table
INSERT INTO public.badge_reqs (id, badge_defs_id, description) VALUES
(1, 1, 'Strong knowledge of programming languages like Java and Python'),
(2, 1, 'Experience with software development methodologies'),
(3, 2, 'Proficiency in statistical analysis and machine learning algorithms'),
(4, 2, 'Familiarity with data manipulation and visualization tools'),
(5, 3, 'Understanding of network security principles'),
(6, 3, 'Knowledge of secure coding practices'),
(7, 4, 'Expertise in machine learning and deep learning algorithms'),
(8, 4, 'Experience with natural language processing'),
(9, 5, 'Proficiency in database query languages like SQL'),
(10, 5, 'Experience with database design and optimization');

-- Insert data into candidates table
INSERT INTO public.candidates (id, name) VALUES
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Robert Johnson');

-- Insert data into badges table
SELECT * from commit_badge('{}', 1);
SELECT * from commit_badge('{}', 2);
SELECT * from commit_badge('{}', 3);


-- Insert data into proposals table
INSERT INTO public.proposals (id, created_at, notes, badge_id, candidate_id) VALUES
(1, NOW(), 'Proposal 1', 1, 1),
(2, NOW(), 'Proposal 2', 2, 1),
(3, NOW(), 'Proposal 3', 1, 2),
(4, NOW(), 'Proposal 4', 3, 3);

-- Insert data into evidences table
INSERT INTO public.evidences (id, requirement_id, proposal_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 3),
(5, 1, 4);




SELECT setval('public.badges_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.badges));