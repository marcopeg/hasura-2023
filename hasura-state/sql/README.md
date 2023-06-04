# SQL Sciprs

Place in here any SQL script that you may need during your development session.

## Relevant Make Commands

```bash
# Run the default script:
make query

# Run a specific script:
make query from=file-name
```

You and also use [pg_bench]() to run performance analysis on your scripts:

```bash
# Run a benchmark on the default script:
make pgbench

# Run a benchmark on a specific script:
make pgbench from=file-name
```

## Relevant Parameters

[[ TODO ]]

```bash
# Select which Hasura data project to use
project=foobar

# Select Hasura connection to use
conn=foobar
```

