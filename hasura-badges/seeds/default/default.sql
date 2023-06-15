-- Insert data into users

TRUNCATE users RESTART IDENTITY CASCADE;
ALTER SEQUENCE users_id_seq RESTART WITH 4;
INSERT INTO "users" ("id", "name", "roles", "created_at", "modified_at") VALUES
(1, 'Luke Skywalker', ARRAY['engineer', 'backoffice'], NOW(), NOW()),
(2, 'Ian', ARRAY['engineer', 'manager'], NOW(), NOW()),
(3, 'Darth Vader', ARRAY['backoffice'], NOW(), NOW());


-- Insert data into badges_definitions
TRUNCATE badges_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE badges_definitions_id_seq RESTART WITH 4;
INSERT INTO badges_definitions (id, title, description, created_by, modified_by)
VALUES 
(1, 'Jedi Mindset Expert', 'This badge represents a deep grasp of the Jedi way of thinking and the principles that govern their code. The holder showcases an understanding of Jedi philosophy, masterful use of the light side of the Force, and a commitment to peace, justice, and self-discipline. Possession of this badge signifies the individual''s mental acuity and devotion to the values of the Jedi Order.', 1, 1), 
(2, 'Dark Side Evangelist', 'This badge signifies a comprehensive understanding of the dark side of the Force. The holder demonstrates in-depth knowledge of Sith lore, mastery over dark side-focused Force abilities, and a profound understanding of the dark side philosophy. This individual may not necessarily embody the dark side''s malevolent aspects, instead leveraging this knowledge for a more nuanced understanding of the Force.', 3, 3),
(3, 'Droid Whisperer', 'This badge is bestowed upon those who have demonstrated a unique knack for understanding, repairing, and manipulating droid technology. The holder showcases not only technical prowess but also an uncanny ability to ''connect'' with droids on an almost emotional level. Possession of this badge signifies the individual''s masterful blend of engineering expertise and empathy towards our mechanical companions.', 3, 3);


-- Insert data into requirements_definitions
TRUNCATE requirements_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE requirements_definitions_id_seq RESTART WITH 22;

INSERT INTO "requirements_definitions" 
("id", "badge_id", "title", "description", "created_by", "modified_by") 
VALUES 
(1, 1, 'Understanding the Force', 'The aspirant must develop a deep understanding and connection with the Force.', 1, 1),
(2, 1, 'Mastery of Meditation', 'The aspirant should be able to demonstrate their ability to meditate under various circumstances and for extended periods.', 1, 1),
(3, 1, 'Discipline and Self-Control', 'The aspirant should exhibit high levels of discipline and self-control in thoughts and actions.', 1, 1),
(4, 1, 'Empathy and Compassion', 'The aspirant must demonstrate empathy and compassion towards all living beings.', 1, 1),
(5, 1, 'Ability to Let Go', 'The aspirant should exhibit the ability to let go of personal desires and material attachments.', 1, 1),
(6, 1, 'Resistance to the Dark Side', 'The aspirant must demonstrate strong resistance to the temptations of the dark side of the Force.', 1, 1),
(7, 1, 'Proficiency in Light Saber Combat', 'The aspirant must display proficiency in the art of light saber combat.', 1, 1),
(8, 1, 'Telekinesis Mastery', 'The aspirant should demonstrate mastery in telekinesis, one of the many aspects of the Force.', 1, 1),
(9, 1, 'Precognition Abilities', 'The aspirant should have developed precognition abilities, a Force-related skill that allows seeing the future.', 1, 1),
(10, 1, 'Interconnection with All Living Things', 'The aspirant should demonstrate the ability to connect with all living things through the Force.', 1, 1);

INSERT INTO "requirements_definitions"
("id","badge_id", "title", "description", "created_by", "modified_by")
VALUES
(11, 2, 'Understanding the Dark Side', 'Knowledge and understanding of the dark side of the force is a must. This could be demonstrated by successfully passing an examination or through a series of lessons.', 1, 1),
(12, 2, 'Dark Side Meditation', 'Regular practice of dark side meditation techniques to gain a deeper understanding and control over the force.', 1, 1),
(13, 2, 'Dark Side Philosophy', 'Understanding and being able to articulate the philosophies and motivations of the Sith and other dark side practitioners.', 1, 1),
(14, 2, 'Power in Anger', 'Demonstrating the ability to draw power from emotions such as anger, fear and hate, as the dark side encourages.', 1, 1),
(15, 2, 'Sith Lore', 'Knowledge of the Siths history, key figures, and their influence on the galaxy.', 1, 1),
(16, 2, 'Force Skills', 'Mastery over certain dark side specific Force skills such as Force Choke, Force Lightning, and Mind Domination.', 1, 1);

INSERT INTO "requirements_definitions"
("id","badge_id", "title", "description", "created_by", "modified_by")
VALUES
(17, 3, 'Astro-mechanical Mastery', 'Demonstrate an exceptional understanding of astro-mechanical droid systems.', 1, 1),
(18, 3, 'Protocol Proficiency', 'Able to fluently communicate with protocol droids in multiple galactic languages.', 1, 1),
(19, 3, 'Binary Literacy', 'Display proficiency in binary language to communicate with droids.', 1, 1),
(20, 3, 'Hardware Repair', 'Show capability to repair and optimize droid hardware effectively and efficiently.', 1, 1),
(21, 3, 'Droid Empathy', 'Successfully mediate a conflict between droids.', 1, 1);


-- Produce the first version of the badges
TRUNCATE badges_versions RESTART IDENTITY CASCADE;
SELECT * FROM create_badge_version('{"x-hasura-user-id":"1"}', 1);
SELECT * FROM create_badge_version('{"x-hasura-user-id":"1"}', 2);
SELECT * FROM _create_badge_version(1, 1, (SELECT now() AT TIME ZONE 'UTC' + '1ms'::interval));



-- Modify a User as test for generating an update in the audit trail
UPDATE "users" 
SET "name" = 'Han Solo', "modified_at" = NOW() 
WHERE "id" = 2;
