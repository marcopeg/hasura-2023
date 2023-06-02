# Hasura Project Setup - March 2023

This is a step by step guide to running an [Hasura-based project](https://hasura.io) on your development machine. 

> 👉 I'm working this out on a Mac and will assume that you do the very same. Windows users... 😬🫣🤗

The only requirements for running this project are:

- [Docker](https://docker.com)
- [Make](https://www.gnu.org/software/make/manual/make.html)

> 💡 For simplicity sake I'm also testing this tutorial on [GitPod.io](https://gitpod.io), and you can easily run this project by > clicking the button below:
>
[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/marcopeg/hasura-2303)

## Table of Contents

- [Quick Start](#quick-start)
- [create `docker-compose.yml`](#create-docker-compose-project)
  - [create Postgres container](#create-postgres-container)
  - [create Adminer container](#create-adminer-container)
  - [create Hasura container](#create-hasura-container)
- [create `.gitpod.yml`](#create-gitpod-file)
- [Install Hasura CLI](#install-hasuracli)
- [Create the Hasura State Project](#create-the-hasura-state-project)
- [Apply the Hasura Project](#apply-the-hasura-project)
- [The Makefile Interface](#the-makefile-interface)
- [Work With Pagila Demo DB](#work-with-pagila-demo-db)

## Quick Start

The project's API are based on a [Makefile](https://www.gnu.org/software/make/manual/make.html); you can run the following commands in a terminal:

```bash
# Show the help menu
make

# Start Hasura, Postgres, and Adminer
make start

# Apply the Hasura migrations project
make init

# Apply the Pagila demo dataset
make pagila-init

# Stop your project
make stop
```

The following services will soon be available:

- Postgres on port `5432`
- [Adminer on port `8081`](http://localhost:8081)
- [Hasura Console on port `8080`](http://localhost:8080)

## Create Docker Compose project

```yml
version: "3.8"

services:
  postgres:
  hasura:

volumes:
  postgres:
```

Main commands interface:

```bash
# Start the project:
# (Ctrl+c) to stop
docker compose up

# Start the project (in background):
docker compose up -d

# Stop a running background project:
docker compose down

# Remove the data volumes associated with the project:
docker compose down -v
```

## Create Postgres Container

Image:  
https://hub.docker.com/_/postgres

👉 Always check for the latest available version under "tags"

```yml
postgres:
  image: postgres:15-alpine
  ports:
    - "${POSTGRES_PORT:-5432}:5432"
  volumes:
    - postgres:/var/lib/postgresql/data
  environment:
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
  restart: unless-stopped
  healthcheck:
    test: timeout 1s bash -c ':> /dev/tcp/127.0.0.1/8080' || exit 1
    interval: 2s
    timeout: 1s
    retries: 20
```

We use [volumes](https://docs.docker.com/storage/volumes/) to persist the Postgres container data. This choice makes it easy to persist data across different executions of the project.

👉 Use `docker compose down -v` to perform a full cleanup of your project.

## Create Adminer Container

Adminer is a muti-database web client that allows you to connect to a Postgres instance and extensively utilize your server.

Image:  
https://hub.docker.com/_/adminer

👉 Always check for the latest available version under "tags"

```yml
adminer:
  image: adminer:4.8.1
  ports:
    - "${ADMINER_PORT:-8081}:8080"
  links:
    - postgres:db
  restart: unless-stopped
```

Todo:

- setup default credentials
- choose a good theme

## Create Hasura Container

Image:  
https://hub.docker.com/r/hasura/graphql-engine

👉 Always check for the latest available version under "tags"

```yml
hasura:
  image: hasura/graphql-engine:v2.25.1.cli-migrations-v3
  ports:
    - "${HASURA_PORT:-8080}:8080"
  environment:
    HASURA_GRAPHQL_DEV_MODE: "true"
    HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
    HASURA_GRAPHQL_ADMIN_SECRET: "${HASURA_ADMIN_SECRET:-hasura}"
    HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD:-postgres}@postgres:5432/postgres
    HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
    HASURA_GRAPHQL_ENABLE_TELEMETRY: "false"
    HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS: "false"
  depends_on:
    postgres:
      condition: service_healthy
  restart: unless-stopped
  healthcheck:
    test: timeout 1s bash -c ':> /dev/tcp/127.0.0.1/8080' || exit 1
    interval: 2s
    timeout: 1s
    retries: 20
```

The healthcheck is inpired by [this thread](https://github.com/hasura/graphql-engine/issues/1532#issuecomment-1161637925).

## Create GitPod File

I often use [GitPod.io](https://gitpod.io) to work in isolated, stateless, and fully automated discardable environments.

The cool thing about it is that most of the automation is just a _YAML_ file away:

```yml
# Workspace automation at startup:
tasks:
  - name: Boot
    command: docker compose up

# Exposed services:
ports:
  - name: Postgres
    port: 5432
    onOpen: ignore
  - name: Hasura
    port: 8080
    onOpen: open-preview
```

> If you run this project from your local VSCode you may find this command useful:
>
> ```
> gp ports list
> ```
>
> It shows the project's ports and you can easily `Ctrl + Click` to open one in your browser.

## Install HasuraCLI

[Hasura ships a CLI](https://hasura.io/docs/latest/hasura-cli/overview/) utility that we will use to automate the state management of the project.

Stuff like:

- running migrations
- applying metadata
- running the Development Console

> 👉 Read the setup documentation [here](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/).

```bash
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```

> 🔥 If you are running the project in GitPod this has already been done at the first boot of the environment 😎.

## Create the Hasura State Project

Create an Hasura State project in which we can store SQL migrations and the Hasura metadata:

```bash
hasura init hasura-state
```

Now take a screenshot of the current state of the Hasura server. That needs to produce the initial migration file and the initial metadata state.

SQL Migrations:

```bash
hasura migrate create "init" \
  --admin-secret hasura \
  --project hasura-state \
  --database-name default \
  --from-server \
  --schema public
```

> 😫 Hasura lacks some love with the migrations support. In this case, it doesn't create the file `down.sql` to revert this first migration.
>
> I suggest you create it with an idempotent SQL instruction in it:  
> `SELECT now()`
>
> (Hasura migrations fail in case of an empty sql file 🧐)

Hasura metadata:

```bash
hasura metadata export \
  --admin-secret hasura \
  --project hasura-state
```

## Apply the Hasura Project

Now that we have a local Hasura Project in which we can describe the desired state of our server as code, let's see the commands that you can use to migrate informations from the source-code to the server.

Check the status of the SQL migrations:

```bash
hasura migrate status \
  --admin-secret hasura \
  --project hasura-state \
  --database-name default
```

Apply any missing migration:

```bash
hasura migrate apply \
  --admin-secret hasura \
  --project hasura-state \
  --database-name default
```

Then you can apply the Hasura metadata:

```bash
hasura metadata apply \
  --admin-secret hasura \
  --project hasura-state
```

## The Makefile Interface

From now on, we are going to issue HasuraCLI commands that need some configuration. It may become quite a pain to remember everything. 

A simple solution is to create a `Makefile` and document our **Project's APIs** in there:

```make
project?=hasura-state
passwd?=hasura

status:
  @hasura migrate status \
    --admin-secret hasura \
    --project hasura-state \
    --database-name default
```

From now on, you can open the [`Makefile`](./Makefile) and read through its comments to find meaningfull commands for your day-to-day activities.

I've added a few commands that make woring with the Hasura state a bit easier:

```bash
# Init the project
make

# Take a full screenshot of the current state
# (you may want to remove previous migrations though)
make export
```

## Work With Pagila Demo DB

[Pagila](https://github.com/devrimgunduz/pagila) is a **demo database** that provides schema and data for running a DVD rental business.

You can use it to practice how to work with Hasura in exposing data via GraphQL APIs.

```bash
# Creates the Pagila public schema and load default data into it
make pagila-init

# Optional, adds a bunch of JSONB data
make pagila-init-jsonb

# Destroy and recreate the "public" schema
# -> this is disruptive, you will loose anything you have in the public schema!
make pagila-destroy
```

---


TODO: SQL Migrations

You can then checkout the state of your SQL migrations:



TODO: run the console:  
https://github.com/ephemerecreative/hasura-cli-gitpod-example
https://www.youtube.com/watch?v=47V40_r1VQo