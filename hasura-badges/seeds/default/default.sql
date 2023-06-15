-- Insert data into users

TRUNCATE users RESTART IDENTITY CASCADE;
ALTER SEQUENCE users_id_seq RESTART WITH 4;
INSERT INTO "users" ("id", "name", "roles", "created_at", "modified_at") VALUES
(1, 'Luke Skywalker', ARRAY['engineer', 'backoffice'], NOW(), NOW()),
(2, 'Ian', ARRAY['engineer', 'manager'], NOW(), NOW()),
(3, 'Darth Vader', ARRAY['backoffice'], NOW(), NOW());


-- Insert data into badges_definitions
TRUNCATE badges_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE badges_definitions_id_seq RESTART WITH 3;
INSERT INTO badges_definitions (id, title, description, created_by, modified_by)
VALUES 
(1, 'Laser Swordmanship', 'You can light a saber on and off real fast.', 1, 1), 
(2, 'Gunmanship', 'Unlike stormtroopers, you can hit your target', 3, 3);


-- Insert data into requirements_definitions
TRUNCATE requirements_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE requirements_definitions_id_seq RESTART WITH 5;
INSERT INTO requirements_definitions (id, badge_id, title, description, created_by, modified_by)
VALUES 
(1, 1, 'Gain a title', 'You have gained a certificate from a laser sword accademy', 1, 1), 
(2, 1, 'Make experience', 'You participated and survived at least 3 battles', 1, 1), 
(3, 2, 'Gain a title', 'You have gained a certificate from a laser gun accademy', 1, 1), 
(4, 2, 'Make experience', 'You participated and survived at least 3 battles', 1, 1);


-- Produce the first version of the badges
TRUNCATE badges_versions RESTART IDENTITY CASCADE;
SELECT * FROM create_badge_version('{"x-hasura-user-id":"1"}', 1);
SELECT * FROM create_badge_version('{"x-hasura-user-id":"1"}', 2);
SELECT * FROM _create_badge_version(1, 1, (SELECT now() AT TIME ZONE 'UTC' + '1ms'::interval));
