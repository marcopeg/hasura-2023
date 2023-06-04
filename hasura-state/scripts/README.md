# Python Scripts

This folder exists more or less as an experiment because I totally lack the experience to work with Python and I found myself in plain disbelief when I saw ChatGPT producing a functioning program out of a request like:

> Build me a script to seed the "users" table given the following schema.  
> (I pasted the `CREATE TABLE` instruction)

I thought it could be funny to test the limits, so in this folder you can place your Python scripts that will be executed inside a Docker container (yes, you don't need to install Python).

> **NOTE:** Files in this folder are NOT divided by connection because the main goal is to simply target the Hasura APIs and run either GraphQL queries or Admin calls.

```bash
# List the available scripts:
make py

# Run a script:
make py from=script-name

# Run a script passing additional Docker parameters:
# (TODO: test if this could also use volumes)
make py from=script-name env="FOO=BAR -e FAA=123"
```