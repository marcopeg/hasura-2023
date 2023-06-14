SELECT * FROM save_badge('{"x-hasura-user-id":"1"}', 1);

select * from badges_versions;

-- SELECT 
--     bd.id, 
--     bd.title, 
--     bd.description, 
--     coalesce(
--         json_agg(
--             json_build_object(
--                 'id', rd.id, 
--                 'title', rd.title, 
--                 'description', rd.description
--             ) 
--             ORDER BY rd.id
--         ) FILTER (WHERE rd.id IS NOT NULL),
--         '[]'::json
--     ) AS requirements
-- FROM badges_definitions bd
-- LEFT JOIN requirements_definitions rd ON bd.id = rd.badge_id
-- WHERE bd.id = 1
-- GROUP BY bd.id, bd.title, bd.description;
