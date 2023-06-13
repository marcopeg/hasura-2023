-- Insert data into backoffice_users

TRUNCATE backoffice_users RESTART IDENTITY CASCADE;
ALTER SEQUENCE backoffice_users_id_seq RESTART WITH 3;
INSERT INTO backoffice_users (id, name)
VALUES 
(1, 'Luke'), 
(2, 'Darth');



-- Insert data into badges_definitions
TRUNCATE badges_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE badges_definitions_id_seq RESTART WITH 3;
INSERT INTO badges_definitions (id, title, description, created_by, modified_by)
VALUES 
(1, 'Laser Swordmanship', 'You can light a saber on and off real fast.', 1, 1), 
(2, 'Gunmanship', 'Unlike stormtroopers, you can hit your target', 2, 2);

-- Insert data into requirements_definitions
TRUNCATE requirements_definitions RESTART IDENTITY CASCADE;
ALTER SEQUENCE requirements_definitions_id_seq RESTART WITH 5;
INSERT INTO requirements_definitions (id, badge_id, title, description, created_by, modified_by)
VALUES 
(1, 1, 'Gain a title', 'You have gained a certificate from a laser sword accademy', 1, 1), 
(2, 1, 'Make experience', 'You participated and survived at least 3 battles', 1, 1), 
(3, 2, 'Gain a title', 'You have gained a certificate from a laser gun accademy', 1, 1), 
(4, 2, 'Make experience', 'You participated and survived at least 3 battles', 1, 1);


