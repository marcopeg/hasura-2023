SELECT
  bd.id,
  bd.description,
  COALESCE(
    json_agg(
      json_build_object(
        'id', br.id,
        'description', br.description
      )
    ),
    '[]'::json
  ) AS badge_reqs
FROM
  badge_defs bd
LEFT JOIN
  badge_reqs br ON bd.id = br.badge_defs_id
GROUP BY
  bd.id, bd.description;
  