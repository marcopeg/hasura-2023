CREATE OR REPLACE FUNCTION commit_badge(
    "hasura_session" JSON,
    "badge_id" INTEGER
)
RETURNS SETOF badges AS $$
BEGIN
    RETURN QUERY
    INSERT INTO badges (badge_defs_id, data)
    SELECT
        bd.id AS badge_defs_id,
        jsonb_build_object(
            'description', bd.description,
            'badge_reqs', COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'id', br.id,
                        'description', br.description
                    )
                ),
                '[]'::jsonb
            )
        ) AS data
    FROM
        badge_defs bd
    LEFT JOIN
        badge_reqs br ON bd.id = br.badge_defs_id
    WHERE
        bd.id = badge_id
    GROUP BY
        bd.id, bd.description
    RETURNING *;
END;
$$ LANGUAGE plpgsql;
