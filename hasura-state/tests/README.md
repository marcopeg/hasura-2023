## SQL Unit Tests

Use [PgTap]() to perform your tests.

## Relevant Make Commands

```bash
# Rebuilds the schema and runs all the tests
make pgtap

# Runs the test without rebuilding the schema
make pgtap-run
```

## Relevant Parameters

[[ TODO ]]

```bash
# Provide a regular expression to isolate the tests that you want to run
# Default: * (runs all sql tests)
# Example: file-name
# Example: folder/*
case=test-name
```

