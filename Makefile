#
# Configuration & Defaults
#

endpoint?=http://localhost:8080
passwd?=hasura
project?=hasura-state
conn?=default
db=postgres
schema?=public
from?=default
steps?=1
name?=new-migration
q?=select now();

# -- Optional --
# overrides of the variables using a gitignored file
-include ./Makefile.env

# Compose the docker-compose file chain based on an environmental variable.
# On GitPod and Codespaces the $DOCKER_COMPOSE_TARGET is set at workspace boot time.
# It is ignored for local development as the console runs with the Hasura CLI installed natively.
ifdef DOCKER_COMPOSE_TARGET
    DOCKER_COMPOSE_CHAIN := -f docker-compose.yml -f docker-compose.${DOCKER_COMPOSE_TARGET}.yml
else
    DOCKER_COMPOSE_CHAIN := -f docker-compose.yml
endif


#
# Default Action
#

help:
	@clear
	@echo ""
	@echo "---------------------"
	@echo "Hasura 2023 Make APIs"
	@echo "---------------------"
	@echo ""
	@echo " 1) make boot ................. Starts the services and seeds the state from a Project"
	@echo " 2) make reboot ............... Destroys the state, then boot again"
	@echo " 3) make start ................ Starts the services without applying the state"
	@echo " 4) make stop ................. Stop the services"
	@echo " 5) make clean ................ Stop the services and destroys the App state"
	@echo " 6) make logs ................. Connects to the Docker Compose logs"
	@echo ""
	@echo " 7) make init ................. Initializes the App state from a Project"
	@echo " 8) make exports .............. Exports the current App state into a Project"
	@echo ""
	@echo "20) make migrate"
	@echo "21) make migrate-status"
	@echo "22) make migrate-up"
	@echo "23) make migrate-down"
	@echo "24) make migrate-redo"
	@echo "25) make migrate-rebuild"
	@echo "26) make migrate-destroy"
	@echo "27) make migrate-create"
	@echo "28) make migrate-export"
	@echo ""
	@echo "30) make seed"
	@echo ""
	@echo "40) make apply"
	@echo "41) make metadata-export"
	@echo ""
	@echo "60) make psql"
	@echo "61) make psql-exec"
	@echo "62) make pgbench"
	@echo ""
	@echo "70) make pagila-init"
	@echo "71) make pagila-destroy"
	@echo "72) make pagila-reset"
	@echo ""
	@echo "80) make pgtap"
	@echo "81) make pgtap-run"
	@echo "82) make pgtap-schema"
	@echo "83) make pgtap-build"
	@echo ""
	@echo "90) make hasura-install"
	@echo "91) make hasura-console"
	@echo "91) make py"
	@echo ""
	@echo "99) make reset"
	@echo ""

info:
	@clear
	@echo "\n# Hasura 2023\n============================\n"
	@echo "Docker Compose:    $(DOCKER_COMPOSE_CHAIN)"
	@echo "Project:           $(project)"
	@echo "Connection:        $(conn)"
	@echo "Default schema:    $(schema)"
	@echo "Default seed:      $(from)"
	@echo "Default query:     $(from)"
	@echo "\n"

#
# High Level APIs
#

_boot:
	@docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@sleep 5
	@$(MAKE) -f Makefile _init
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f
boot:
	@clear
	@echo "\n# Booting Docker Project with Hasura State from:\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -f Makefile _boot
reboot:
	@clear
	@echo "\n# Rebooting Docker Project with Hasura State from:\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -f Makefile _clean
	@$(MAKE) -f Makefile _boot

start:
	@clear
	@echo "\n# Starting Docker Project:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

stop:
	@clear
	@echo "\n# Stopping Docker Project:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) down

logs:
	@clear
	@echo "\n# Attaching to Docker Project logs:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

_init:
	@$(MAKE) -f Makefile _migrate
	@$(MAKE) -f Makefile _apply
	@$(MAKE) -f Makefile _seed
init:
	@clear
	@echo "\n# Initializing Hasura State from:\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -f Makefile _init

exports: 
	@clear
	@echo "\n# Exporting Hasura State to:\n> project=$(project); conn=$(conn) schema=$(schema)\n"
	@$(MAKE) -f Makefile _migrate-export
	@$(MAKE) -f Makefile _metadata-export





#
# Hasura Migrations Utilities
#

_migrate:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)
migrate:
	@clear
	@echo "\n# Running migrations from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -f Makefile _migrate

_migrate-status:
	@hasura migrate status \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)
migrate-status:
	@clear
	@echo "\n# Checking migrations status on:\n> project=$(project); conn=$(conn)"
	@$(MAKE) -f Makefile _migrate-status

_migrate-up:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--up $(steps)
migrate-up:
	@clear
	@echo "\n# Migrate $(steps) UP from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -f Makefile _migrate-up

_migrate-down:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--down $(steps)
migrate-down:
	@clear
	@echo "\n# Migrate $(steps) DOWN from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -f Makefile _migrate-down

_migrate-destroy:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--down all
migrate-destroy:
	@clear
	@echo "\n# Destroy migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -f Makefile _migrate-destroy

migrate-redo: 
	@clear
	@echo "\n# Replaying last $(steps) migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -f Makefile _migrate-down
	@$(MAKE) -f Makefile _migrate-up

migrate-rebuild: 
	@clear
	@echo "\n# Rebuilding migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -f Makefile _migrate-destroy
	@$(MAKE) -f Makefile _migrate

migrate-create:
	@clear
	@echo "\n# Scaffolding a new migration on:\n> project=$(project); conn=$(conn); name=$(name)\n"
	@hasura migrate create \
		"$(name)" \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--up-sql "SELECT NOW();" \
		--down-sql "SELECT NOW();"
	@hasura migrate apply \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)

_migrate-export:
	@hasura migrate create \
		"__full-export___" \
		--endpoint $(endpoint) \
  	--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
  	--schema $(schema) \
  	--from-server \
		--down-sql "SELECT NOW();"
migrate-export:
	@clear
	@echo "\n# Dumping database to a migration:\n> project=$(project); conn=$(conn); schema=$(schema)\n"
	@$(MAKE) -f Makefile _migrate-export




#
# Hasura seeding utilities
#

_seed:
	@hasura seed apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--file $(from).sql
seed:
	@clear
	@echo "\n# Seeding on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -f Makefile _seed





#
# Hasura Metadata Utilities
#

_apply:
	@hasura metadata apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)
apply:
	@clear
	@echo "\n# Apply Hasura Metadata on:\n> project=$(project)\n"
	@$(MAKE) -f Makefile _apply

_metadata-export:
	@hasura metadata export \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)
metadata-export:
	@clear
	@echo "\n# Exporting Hasura metadata to:\n> project=$(project)\n"
	@$(MAKE) -f Makefile _metadata-export




#
# Postgres Utilities
#

psql:
	@clear
	@echo "\n# Attaching SQL Client to:\n> db=$(db)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres $(db)

query:
	@clear
	@echo "\n# Running a SQL script to DB \"$(db)\":\n>$(project)/sql/$(conn)/$(from).sql\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/$(from).sql


# https://www.postgresql.org/docs/current/pgbench.html
numClients?=10
numThreads?=10
numTransactions?=10
pgbench:
	@clear
	@echo "\n# Running PgBench to:\n> db=$(db); query=$(project)/sql/$(conn).sql\n"
	@docker run --rm \
		-e $(env) \
		-e PGPASSWORD=postgres \
		-v $(CURDIR)/$(project)/sql/$(conn):/sql:ro \
		--network=hasura_2023 \
		postgres:15 \
		pgbench -h postgres -p 5432 -U postgres -d $(db) \
			-c $(numClients) -j $(numThreads) -t $(numTransactions) \
			-f /sql/$(from).sql




#
# Pagila Demo DB
# https://github.com/devrimgunduz/pagila
#

_pagila-init:
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | docker compose exec -T postgres psql -U postgres $(db)
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | docker compose exec -T postgres psql -U postgres $(db)
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema-jsonb.sql | docker compose exec -T postgres psql -U postgres $(db)
	@curl -k -L -s --compressed https://github.com/devrimgunduz/pagila/raw/master/pagila-data-yum-jsonb.sql | docker compose exec -T postgres pg_restore -U postgres -d $(db)
	@curl -k -L -s --compressed https://github.com/devrimgunduz/pagila/raw/master/pagila-data-apt-jsonb.sql | docker compose exec -T postgres pg_restore -U postgres -d $(db)
pagila-init:
	@clear
	@echo "\n# Initializing Pagila Demo DB to \"$(db)\"\n"
	@$(MAKE) -f Makefile _pagila-init

_pagila-destroy:
	@$(MAKE) -f Makefile _migrate-destroy
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres $(db) -c 'drop schema public cascade;'
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres $(db) -c 'create schema public;'
	@$(MAKE) -f Makefile _migrate
pagila-destroy:
	@clear
	@echo "\n# Destroying Pagila Demo DB to \"$(db)\"\n"
	@$(MAKE) -f Makefile _pagila-destroy

pagila-reset:
	@clear
	@echo "\n# Resetting Pagila Demo DB to \"$(db)\"\n"
	@$(MAKE) -f Makefile _pagila-destroy
	@$(MAKE) -f Makefile _pagila-init





#
# General Utilities
#

hasura-install:
	@curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

hasura-console:
	hasura console \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \

_clean:
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v
clean:
	@clear
	@echo "\n# Tearing down the Docker Compose Project (with volumes)\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@$(MAKE) -f Makefile _clean

reset:
	@clear
	@echo "\n# Resetting the Docker Compose Project\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v
	@docker compose $(DOCKER_COMPOSE_CHAIN) pull
	@docker compose $(DOCKER_COMPOSE_CHAIN) build
	@$(MAKE) -f Makefile _boot

# Experimental
# takes a full dump to copy/paste into ChatGPT
dump:
	@rm -f $(project)/dump.txt
	@echo "Given the following Hasura metadata and related Postgres schema," > $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "please create some SQL instruction to seed the database with a randomic amount of rows" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "and also randomize the data that you insert.\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "Then, also give me a GraphQL example to fetch an event and update it using Apollo Client in React." >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "\n\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "=================\nHASURA METADATA\n=================" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@hasura metadata export \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--output json >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "\n\n\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "=================\nPOSTGRES SCHEMA\n=================\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@hasura migrate create \
		"__full-export___" \
		--endpoint $(endpoint) \
  	--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
  	--schema $(schema) \
  	--from-server
	@latest_folder=$$(ls -dt $(CURDIR)/$(project)/migrations/$(conn)/*/ | head -1); \
		latest_folder=$${latest_folder%/}; \
		latest_folder=$${latest_folder##*/}; \
		cat $(CURDIR)/$(project)/migrations/$(conn)/$$latest_folder/up.sql >> $(CURDIR)/dump-$(project)-$(conn).txt
	@latest_folder=$$(ls -dt $(CURDIR)/$(project)/migrations/$(conn)/*/ | head -1); \
		latest_folder=$${latest_folder%/}; \
		latest_folder=$${latest_folder##*/}; \
		rm -rf $(CURDIR)/$(project)/migrations/$(conn)/$$latest_folder

#
# Python Utilities
#

# Run a script from the project's scripts folder
env?="F=F"
py:
	@docker images -q hasura-2023-py | grep -q . || docker build -t hasura-2023-py ./docker-images/python
	@docker run --rm \
		-e $(env) \
		-e HASURA_GRAPHQL_ENDPOINT=http://hasura-engine:8080/v1/graphql \
		-e HASURA_GRAPHQL_ADMIN_SECRET=$(passwd) \
		-v $(CURDIR)/$(project)/scripts:/scripts \
		--network=hasura_2023 \
		hasura-2023-py \
		sh -c "python /scripts/$(from).py"

py-build:
	docker build --no-cache -t hasura-2023-py ./docker-images/python



#
# SQL Testing Utilities
#

case?=*
pgtap-reset:
	@docker exec -i hasura-pg psql -U postgres < $(project)/tests/reset-test-db.sql
	
pgtap-schema: $(CURDIR)/$(project)/migrations/$(conn)/*
	@for file in $(shell find $(CURDIR)/$(project)/migrations/$(conn) -name 'up.sql' | sort ) ; do \
		echo "---> Apply:" $${file}; \
		docker exec -i hasura-pg psql -U postgres test-db < $${file};	\
	done

pgtap-build:
	docker build --no-cache -t hasura-2023-pgtap ./docker-images/pg-tap

pgtap-run:
	@docker images -q hasura-2023-pgtap | grep -q . || docker build -t hasura-2023-pgtap ./docker-images/pg-tap
	clear
	@echo "Running Unit Tests ..."
	@docker run --rm \
		--name pgtap \
		--network=hasura_2023 \
		--link hasura-pg:db \
		-v $(CURDIR)/$(project)/tests/$(conn)/:/tests \
		hasura-2023-pgtap \
    	-h db -u postgres -w postgres -d test-db -t '/tests/$(case).sql'

pgtap: pgtap-reset pgtap-schema pgtap-run



#
# Numeric API
#

1: boot
2: reboot
3: start
4: stop
5: clean
6: logs
7: init
8: exports
20: migrate
21: migrate-status
22: migrate-up
23: migrate-down
24: migrate-redo
25: migrate-rebuild
26: migrate-destroy
27: migrate-create
28: migrate-export
30: seed
40: metadata
41: metadata-export
60: psql
61: psql-exec
62: pgbench
70: pagila-init
71: pagila-destroy
72: pagila-reset
80: pgtap
81: pgtap-run
82: pgtap-schema
83: pgtap-build
90: hasura-install
91: hasura-console
92: py
99: reset