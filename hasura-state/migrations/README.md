# Hasura Migrations

This folder collects the SQL migrations that should be applied to each database.

## Relevant Make Commands

```bash
# Code > DB
make apply

# DB > Code
# (full schema export)
make migrate-export schema=public

# Check migration status
make migrate-status

# Scaffold a new migration
make migrate-create name=foobar
```

## Relevant Parameters

```bash
# Select which Hasura data project to use
project=foobar

# Select Hasura connection to use
conn=foobar
```