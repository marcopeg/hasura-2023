# Hasura Events

Simple events logging app:

```bash
make boot project=hasura-events
```

Or by setting `project=hasura-events` in your `Makefile.env` file:

```make
# Makefile.env

project=hasura-events
```

## Building the SQL Schema with ChatGPT

### 🙍‍♂️ Me

```Markdown
Build the schema of a multi tenant event logging system based on Postgres.
I need the following tables:

- users
- events

Here are some other requirements:

Each event belong to a user
Deleting a user should also delete all the related data
Each event should have a string based type
Each event should have a jsonb column called "data"
```

### 🤖 ChatGPT

```sql
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    tenant_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    -- Any additional fields...
);

CREATE TABLE events
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    -- ON DELETE CASCADE ensures that deleting a user deletes all related events
);
```

### 🙍‍♂️ Me

```Markdown
Remove the tenant_id column, wrap each column and table name with double quotes, also specify the schema wrapping it with double quotes. You also forgot a created_at colump for tracking the event. Add also an "happened_at" column to trak the real pot of the event.
```

### 🤖 ChatGPT

```sql
CREATE TABLE "public"."users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
    -- Any additional fields...
);

CREATE TABLE "public"."events"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "happened_at" TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE
);
```

### 🙍‍♂️ Me

```Markdown
No need for a password for now. The "happened_at" should default to "create_at" in case is left empty.
```

### 🤖 ChatGPT

```sql
CREATE TABLE "public"."users"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL
    -- Any additional fields...
);

CREATE TABLE "public"."events"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "happened_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE
);
```

### 🙍‍♂️ Me

I'm quite satisfied with this schema, so I try to apply it as initial migration... It works, my schema is being correctly created!

Now it's time to produce some seed into it:

```Markdown
Create 5 users giving them funny CamelCased names.
Then seed 10000 events that should represent some football games with randomic data of your choiche.
Then seed 10000 events that should represent some baseball games with randomic data of your choiche.
Then seed 10000 events that should represent some golf games with randomic data of your choiche.
Ditribute the events randomly among the existing users.
```

### 🤖 ChatGPT

It gives me this query for the users, which I like.

```sql
INSERT INTO "public"."users" ("username")
VALUES 
('HappyGoalie'),
('ScoringStriker'),
('DefensiveDribbler'),
('JollyKeeper'),
('DashingDefender');
```

But then it starts proposing me a Python script for the randomized data. So I stop the bot.

### 🙍‍♂️ Me

I prefer to keep the seeding in pure sql and I know you can use `generate_series` to generate large amounts of data, so I decide to give him some help:

```Markdown
Ok with the users, but for the rest I'd prefer to keep SQL as the only language.
You can use "generate_series" to generate large amounts of data.
Please randomize the "happened_at" with a random point in time (to the second) within the last two years.
```

### 🤖 ChatGPT

```sql
-- Football events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT 
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Football',
    jsonb_build_object('score', (random() * 10)::int, 'stadium', 'Stadium ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);

-- Baseball events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT 
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Baseball',
    jsonb_build_object('runs', (random() * 10)::int, 'stadium', 'Stadium ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);

-- Golf events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT 
    (random() * 4 + 1)::int, -- Random user_id between 1 and 5
    'Golf',
    jsonb_build_object('strokes', (random() * 72)::int, 'course', 'Course ' || (random() * 10 + 1)::int),
    NOW() - (random() * interval '2 years')
FROM generate_series(1,10000);
```

### 🙍‍♂️ Me

I like what I see, and I decide to try it out in my default seed... And it works!

The problem is that if I re-seed it, it will duplicate data and ids.

I'd like my seeds to be pure!

```Markdown
Please give me the truncate instructions and also the instructions to reset the related number series. 
I want to be able to repeat the seeding and obtain the very same result each time.
```

### 🤖 ChatGPT

```sql
TRUNCATE "public"."users", "public"."events" RESTART IDENTITY CASCADE;

SELECT setval(pg_get_serial_sequence('"public"."users"', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('"public"."events"', 'id'), 1, false);
```

### 🙍‍♂️ Me

This looks promising... And it works. Fantastic. So far, zero errors!

Last step is to get the down migration:

```Markdown
Giveme the code to drop the tables in the correct order so that it doesn't break any constraint.
```

### 🤖 ChatGPT

```sql
DROP TABLE IF EXISTS "public"."events";
DROP TABLE IF EXISTS "public"."users";
```

### 🙍‍♂️ Me

Ok, this was rather simple, but it's missing the `CASCADE` parameter:

```Markdown
Are you sure this will remove any related or dependent object? Aren't you missing a small clause?
```

### 🤖 ChatGPT

And I get the correct stuff, it even apologizes to me!

```sql
DROP TABLE IF EXISTS "public"."events" CASCADE;
DROP TABLE IF EXISTS "public"."users" CASCADE;
```

### 🙍‍♂️ Me

I decided now to go bold, very bold:

```Markdown
Please generate the XML for an SVG that shows the sql schema and its relations
```

### 🤖 ChatGPT

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600">
    <rect x="50" y="50" width="200" height="100" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="100" y="90" font-family="Verdana" font-size="20" fill="black">users</text>

    <rect x="550" y="50" width="200" height="100" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="600" y="90" font-family="Verdana" font-size="20" fill="black">events</text>

    <line x1="250" y1="100" x2="550" y2="100" style="stroke:black;stroke-width:2" />
    <text x="400" y="90" font-family="Verdana" font-size="15" fill="black">user_id</text>
</svg>
```

![sql-schema-v1](./sql-schema-v1.svg)

### 🙍‍♂️ Me

This doesn't work.

```Markdown
Give me the full source that I should put into an SVG file so that I can show it in my README.
```
### 🤖 ChatGPT

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600">
    <!-- Users Table -->
    <rect x="50" y="50" width="200" height="150" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="70" y="80" font-family="Verdana" font-size="20" fill="black">users</text>
    <line x1="50" y1="90" x2="250" y2="90" style="stroke:black;stroke-width:1" />
    <text x="70" y="120" font-family="Verdana" font-size="15" fill="black">id: integer</text>
    <text x="70" y="150" font-family="Verdana" font-size="15" fill="black">username: string</text>

    <!-- Events Table -->
    <rect x="550" y="50" width="200" height="200" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="600" y="80" font-family="Verdana" font-size="20" fill="black">events</text>
    <line x1="550" y1="90" x2="750" y2="90" style="stroke:black;stroke-width:1" />
    <text x="570" y="120" font-family="Verdana" font-size="15" fill="black">id: integer</text>
    <text x="570" y="150" font-family="Verdana" font-size="15" fill="black">user_id: integer (FK)</text>
    <text x="570" y="180" font-family="Verdana" font-size="15" fill="black">type: string</text>
    <text x="570" y="210" font-family="Verdana" font-size="15" fill="black">data: jsonb</text>

    <!-- Relationship Line -->
    <line x1="250" y1="120" x2="550" y2="150" style="stroke:black;stroke-width:2" />
</svg>
```

![sql-schema-v2](./sql-schema-v2.svg)

### 🙍‍♂️ Me

Almost there!

```Markdown
Enforce a white background, and add the one-to-many information to the relation between the two tables.
Also, the events table is missing the two dates.
```

### 🤖 ChatGPT

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="700">
    <!-- Background -->
    <rect width="100%" height="100%" fill="white" />

    <!-- Users Table -->
    <rect x="50" y="50" width="200" height="150" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="70" y="80" font-family="Verdana" font-size="20" fill="black">users</text>
    <line x1="50" y1="90" x2="250" y2="90" style="stroke:black;stroke-width:1" />
    <text x="70" y="120" font-family="Verdana" font-size="15" fill="black">id: integer</text>
    <text x="70" y="150" font-family="Verdana" font-size="15" fill="black">username: string</text>

    <!-- Events Table -->
    <rect x="550" y="50" width="200" height="250" stroke="black" fill="transparent" stroke-width="2"/>
    <text x="600" y="80" font-family="Verdana" font-size="20" fill="black">events</text>
    <line x1="550" y1="90" x2="750" y2="90" style="stroke:black;stroke-width:1" />
    <text x="570" y="120" font-family="Verdana" font-size="15" fill="black">id: integer</text>
    <text x="570" y="150" font-family="Verdana" font-size="15" fill="black">user_id: integer (FK)</text>
    <text x="570" y="180" font-family="Verdana" font-size="15" fill="black">type: string</text>
    <text x="570" y="210" font-family="Verdana" font-size="15" fill="black">data: jsonb</text>
    <text x="570" y="240" font-family="Verdana" font-size="15" fill="black">created_at: timestamp</text>
    <text x="570" y="270" font-family="Verdana" font-size="15" fill="black">happened_at: timestamp</text>

    <!-- Relationship Line -->
    <line x1="250" y1="120" x2="550" y2="150" style="stroke:black;stroke-width:2" />
    <text x="400" y="135" font-family="Verdana" font-size="15" fill="black">1..*</text>
</svg>
```

![sql-schema-v3](./sql-schema-v3.svg)

### 🙍‍♂️ Me

Enough with SVGs

Now we get into the serious stuff. I want to build the Hasura metadata so to expose this schema as an API.

I am not yet sure how to proceed. Let's give it a go.

```Markdown
Prepare the Hasura metadata to expose the schema we prepared.

The role "user" should be able to read and modify only its own row in the users table.

The role "user" should be able to insert new events and to list all its events with max pagination number of 10.

Here is the meta I have so far:

{
  "version": 3,
  "sources": [
    {
      "name": "default",
      "kind": "postgres",
      "tables": [],
      "configuration": {
        "connection_info": {
          "database_url": {
            "from_env": "HASURA_GRAPHQL_DATABASE_URL"
          },
          "isolation_level": "read-committed",
          "pool_settings": {
            "connection_lifetime": 600,
            "idle_timeout": 180,
            "max_connections": 50,
            "retries": 1
          },
          "use_prepared_statements": true
        }
      }
    }
  ]
}
```

**NOTE:** I used the `make dump` to take a snapshot to my current metadata.

### 🤖 ChatGPT

```json
{
  "version": 3,
  "sources": [
    {
      "name": "default",
      "kind": "postgres",
      "tables": [
        {
          "table": {
            "schema": "public",
            "name": "users"
          },
          "insert_permissions": [
            {
              "role": "user",
              "permission": {
                "check": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "allow_upsert": false
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 1
              }
            }
          ]
        },
        {
          "table": {
            "schema": "public",
            "name": "events"
          },
          "insert_permissions": [
            {
              "role": "user",
              "permission": {
                "check": {},
                "allow_upsert": false,
                "set": {
                  "user_id": "X-Hasura-User-Id"
                }
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "user_id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 10
              }
            }
          ]
        }
      ],
      "configuration": {
        "connection_info": {
          "database_url": {
            "from_env": "HASURA_GRAPHQL_DATABASE_URL"
          },
          "isolation_level": "read-committed",
          "pool_settings": {
            "connection_lifetime": 600,
            "idle_timeout": 180,
            "max_connections": 50,
            "retries": 1
          },
          "use_prepared_statements": true
        }
      }
    }
  ]
}
```

### 🙍‍♂️ Me

Looks like the events are properly set, but the users have an insert permission, I asked for an update.

```Markdown
Looks like you used the "insert" permission for the users. Can you change it with the "update" instead?
```

### 🤖 ChatGPT

```json
{
  "version": 3,
  "sources": [
    {
      "name": "default",
      "kind": "postgres",
      "tables": [
        {
          "table": {
            "schema": "public",
            "name": "users"
          },
          "update_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": [
                  "username"
                ],
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                }
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 1
              }
            }
          ]
        },
        {
          "table": {
            "schema": "public",
            "name": "events"
          },
          "insert_permissions": [
            {
              "role": "user",
              "permission": {
                "check": {},
                "allow_upsert": false,
                "set": {
                  "user_id": "X-Hasura-User-Id"
                }
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "user_id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 10
              }
            }
          ]
        }
      ],
      "configuration": {
        "connection_info": {
          "database_url": {
            "from_env": "HASURA_GRAPHQL_DATABASE_URL"
          },
          "isolation_level": "read-committed",
          "pool_settings": {
            "connection_lifetime": 600,
            "idle_timeout": 180,
            "max_connections": 50,
            "retries": 1
          },
          "use_prepared_statements": true
        }
      }
    }
  ]
}
```

### 🙍‍♂️ Me

Looks solid to me. I will save it a JSON file and manually import it into Hasura.

F**k me it works. For all I see the metadata are correct and now I can use `make metadata-export` to sync it with my Hasura Project.

Now I want to spice up things a bit with the querying.

```Markdown
Please give me an SQL query to fetch only the first 10 football events of a given user.
```

### 🤖 ChatGPT

```sql
SELECT * 
FROM "public"."events"
WHERE "user_id" = :userId AND "type" = 'Football'
ORDER BY "created_at" DESC
LIMIT 10;
```

### 🙍‍♂️ Me

This is quite good. But I see that the data that I get back is a bit dull. Let's spice things up:

```Markdown
Rebuild the seeding query for the football events, but add more details for every event. Proper stats from a football event.
```

### 🤖 ChatGPT

```sql
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Football',
  jsonb_build_object(
    'teamA', 'Team ' || (random() * 100)::integer,
    'teamB', 'Team ' || (random() * 100)::integer,
    'scoreA', (random() * 5)::integer,
    'scoreB', (random() * 5)::integer,
    'fouls', (random() * 50)::integer,
    'corners', (random() * 15)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;
```

### 🙍‍♂️ Me

This is definetly a better dataset, and it rembered all the context... even if the code now looks quite different.

```Markdown
Please do the same for the other seeds.
```

### 🤖 ChatGPT

```sql
-- Baseball events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Baseball',
  jsonb_build_object(
    'teamA', 'Team ' || (random() * 100)::integer,
    'teamB', 'Team ' || (random() * 100)::integer,
    'scoreA', (random() * 10)::integer,
    'scoreB', (random() * 10)::integer,
    'hits', (random() * 30)::integer,
    'errors', (random() * 5)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;


-- Golf events
INSERT INTO "public"."events" ("user_id", "type", "data", "happened_at")
SELECT
  "public"."users"."id",
  'Golf',
  jsonb_build_object(
    'player', 'Player ' || (random() * 100)::integer,
    'course', 'Course ' || (random() * 50)::integer,
    'par', (random() * 72)::integer,
    'score', ((random() * 20) + 52)::integer
  ),
  NOW() - (random() * (365 * 2)) * interval '1 day' - (random() * 24 * 60 * 60) * interval '1 second'
FROM
  "public"."users",
  generate_series(1, 10000)
LIMIT 10000;
```

### 🙍‍♂️ Me

Fantastic, even if the Basball events are a bit boring still.

Now let's try to focus on some queries through Hasura Graphql API.

```Markdown
Create the GraphQL query for the role "user" to get all the football events with fouls between 10 and 20.
```

### 🤖 ChatGPT

```graphql
query {
  events(where: {type: {_eq: "Football"}, data: {fouls: {_gte: 10, _lte: 20}}}) {
    id
    user_id
    type
    data
    happened_at
    created_at
  }
}
```

### 🙍‍♂️ Me

Here we have troubles. The query doesn't work. I paste the error back in Hasura and it honesly tell me that his knowledge stops at September 2021 and that at that point in time it wasn't possible to achieve this.

Instead, it proposes me to achieve the same result using an SQL function:

```sql
CREATE OR REPLACE FUNCTION "public"."football_events_with_fouls_range"(min_fouls integer, max_fouls integer)
RETURNS SETOF "public"."events" AS $$
SELECT *
FROM "public"."events"
WHERE "type" = 'Football' AND ("data"->>'fouls')::integer BETWEEN min_fouls AND max_fouls;
$$ LANGUAGE sql STABLE;
```

But I choose a different approach. My idea is to build a view that extracts the fouls into a colum and then I will be able to filter it via Hasura.

```Markdown
Build an SQL view named events_football that shows only football events, each property in the data field should become a column in the resulting dataset.
```

### 🤖 ChatGPT

```sql
CREATE VIEW "public"."events_football" AS
SELECT 
  "id",
  "user_id",
  "type",
  "happened_at",
  "created_at",
  ("data"->>'teamA')::text AS "teamA",
  ("data"->>'teamB')::text AS "teamB",
  ("data"->>'scoreA')::integer AS "scoreA",
  ("data"->>'scoreB')::integer AS "scoreB",
  ("data"->>'fouls')::integer AS "fouls",
  ("data"->>'corners')::integer AS "corners"
FROM 
  "public"."events"
WHERE 
  "type" = 'Football';
```

### 🙍‍♂️ Me

This works, now I can add it as a migration with:

```bash
make migrate-create name="events-football-view"
```

I have the code for the UP migration... I wonder...

```Makefile
Give me the down migration for this
```

### 🤖 ChatGPT

```sql
DROP VIEW IF EXISTS "public"."events_football";
```

### 🙍‍♂️ Me

Wow. Just wow.

Now I need an updated version of my metadata. To avoid any confusion, I take a dump (`make dump`) and work out in there my next request:

```Markdown
Given the following Hasura metadata and related Postgres schema,
please track the events_football view so that a role "user" can see its own events.



=================
HASURA METADATA
=================
{
  "version": 3,
  "sources": [
    {
      "name": "default",
      "kind": "postgres",
      "tables": [
        {
          "table": {
            "name": "events",
            "schema": "public"
          },
          "insert_permissions": [
            {
              "role": "user",
              "permission": {
                "check": {},
                "set": {
                  "user_id": "X-Hasura-User-Id"
                }
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "user_id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 10
              }
            }
          ]
        },
        {
          "table": {
            "name": "users",
            "schema": "public"
          },
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 1
              }
            }
          ],
          "update_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": [
                  "username"
                ],
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "check": null
              }
            }
          ]
        }
      ],
      "configuration": {
        "connection_info": {
          "database_url": {
            "from_env": "HASURA_GRAPHQL_DATABASE_URL"
          },
          "isolation_level": "read-committed",
          "pool_settings": {
            "connection_lifetime": 600,
            "idle_timeout": 180,
            "max_connections": 50,
            "retries": 1
          },
          "use_prepared_statements": true
        }
      }
    }
  ]
}



=================
POSTGRES SCHEMA
=================

SET check_function_bodies = false;
CREATE TABLE public.events (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type character varying(255) NOT NULL,
    data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    happened_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE VIEW public.events_football AS
 SELECT events.id,
    events.user_id,
    events.type,
    events.happened_at,
    events.created_at,
    (events.data ->> 'teamA'::text) AS "teamA",
    (events.data ->> 'teamB'::text) AS "teamB",
    ((events.data ->> 'scoreA'::text))::integer AS "scoreA",
    ((events.data ->> 'scoreB'::text))::integer AS "scoreB",
    ((events.data ->> 'fouls'::text))::integer AS fouls,
    ((events.data ->> 'corners'::text))::integer AS corners
   FROM public.events
  WHERE ((events.type)::text = 'Football'::text);
CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL
);
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
```

### 🤖 ChatGPT

```json
{
  "table": {
    "name": "events_football",
    "schema": "public"
  },
  "is_enum": false,
  "configuration": {
    "custom_root_fields": {},
    "custom_column_names": {}
  },
  "object_relationships": [],
  "array_relationships": [],
  "computed_fields": [],
  "select_permissions": [
    {
      "role": "user",
      "permission": {
        "columns": "*",
        "filter": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    }
  ]
}
```

### 🙍‍♂️ Me

Once again, I try to save this to a temporary file and manually import... But this time it doesn't work because this is just a fragment of a schema.

```Markdown
Give me the full metadata
```

### 🤖 ChatGPT

```json
{
  "version": 3,
  "sources": [
    {
      "name": "default",
      "kind": "postgres",
      "tables": [
        {
          "table": {
            "name": "events",
            "schema": "public"
          },
          "insert_permissions": [
            {
              "role": "user",
              "permission": {
                "check": {},
                "set": {
                  "user_id": "X-Hasura-User-Id"
                }
              }
            }
          ],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "user_id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 10
              }
            }
          ]
        },
        {
          "table": {
            "name": "users",
            "schema": "public"
          },
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "limit": 1
              }
            }
          ],
          "update_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": [
                  "username"
                ],
                "filter": {
                  "id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                },
                "check": null
              }
            }
          ]
        },
        {
          "table": {
            "name": "events_football",
            "schema": "public"
          },
          "is_enum": false,
          "configuration": {
            "custom_root_fields": {},
            "custom_column_names": {}
          },
          "object_relationships": [],
          "array_relationships": [],
          "computed_fields": [],
          "select_permissions": [
            {
              "role": "user",
              "permission": {
                "columns": "*",
                "filter": {
                  "user_id": {
                    "_eq": "X-Hasura-User-Id"
                  }
                }
              }
            }
          ]
        }
      ],
      "configuration": {
        "connection_info": {
          "database_url": {
            "from_env": "HASURA_GRAPHQL_DATABASE_URL"
          },
          "isolation_level": "read-committed",
          "pool_settings": {
            "connection_lifetime": 600,
            "idle_timeout": 180,
            "max_connections": 50,
            "retries": 1
          },
          "use_prepared_statements": true
        }
      }
    }
  ]
}
```

### 🙍‍♂️ Me

And now all worked just fine. Again I can sync this schema to my local project with `make metadata-export`.

Lets try to get the results in between 10 and 20 fouls:

```Markdown
Give me a graphql query for the role user to get football games with fouls in between of 10 and 20.
```

### 🤖 ChatGPT

```graphql
query GetFootballEventsWithFoulsBetween10And20 {
  events_football(where: {fouls: {_gte: 10, _lte: 20}}) {
    id
    user_id
    happened_at
    created_at
    teamA
    teamB
    scoreA
    scoreB
    fouls
    corners
  }
}
```

### 🙍‍♂️ Me

And finally I have the result I want 😎:

## Conclusions

This was a nice experiment that gave me a jump start on a simple event logging system.

It is simple, but it was completely coded by the AI.  
Of course, I knew what I wanted in the end.

Here is the link to the ChatGPT thread:  
https://chat.openai.com/share/0c8ae87d-b6b5-4341-8118-28f4bf633800
