# Configuration & Defaults
#

endpoint?=http://localhost:8080
passwd?=hasura
project?=hasura-state
db?=default
schema?=public
from?=default
steps?=1
name?=new-migration
q?=select now();

# Compose the docker-compose file chain based on an environmental variable
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
	@echo " 1) make start"
	@echo " 2) make stop"
	@echo " 3) make logs"
	@echo ""
	@echo " 4) make init"
	@echo " 5) make exports"
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
	@echo "40) make metadata"
	@echo "41) make metadata-export"
	@echo ""
	@echo "60) make psql"
	@echo "61) make psql-exec"
	@echo ""
	@echo "70) make pagila-init"
	@echo "71) make pagila-destroy"
	@echo "72) make pagila-reset"
	@echo ""
	@echo "90) make hasura-install"
	@echo "91) make hasura-console"
	@echo "91) make py"
	@echo ""
	@echo "98) make clean"
	@echo "99) make reset"
	@echo ""

#
# High Level APIs
#

start:
	@docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

stop:
	@docker compose $(DOCKER_COMPOSE_CHAIN) down

logs:
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

init: migrate metadata seed

exports: migrate-export metadata-export




#
# Hasura Migrations Utilities
#

migrate:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db)

migrate-status:
	@hasura migrate status \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db)

migrate-up:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
		--up $(steps)

migrate-down:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
		--down $(steps)

migrate-destroy:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
		--down all

migrate-redo: migrate-down migrate-up
migrate-rebuild: migrate-destroy migrate

migrate-create:
	@hasura migrate create \
		"$(name)" \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
		--up-sql "SELECT NOW();" \
		--down-sql "SELECT NOW();"
	@hasura migrate apply \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db)

migrate-export:
	@hasura migrate create \
		"__full-export___" \
		--endpoint $(endpoint) \
  	--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
  	--schema $(schema) \
  	--from-server \
		--down-sql "SELECT NOW();"




#
# Hasura seeding utilities
#

seed:
	@hasura seed apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db) \
		--file $(from).sql





#
# Hasura Metadata Utilities
#

apply:
	@hasura metadata apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)

metadata-export:
	@hasura metadata export \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)




#
# Postgres Utilities
#

psql:
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres postgres

query:
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres postgres < $(project)/sql/$(db)/$(from).sql



#
# Pagila Demo DB
# https://github.com/devrimgunduz/pagila
#

pagila-init:
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | docker compose exec -T postgres psql -U postgres postgres
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | docker compose exec -T postgres psql -U postgres postgres
	@curl -vs https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema-jsonb.sql | docker compose exec -T postgres psql -U postgres postgres
	@curl -k -L -s --compressed https://github.com/devrimgunduz/pagila/raw/master/pagila-data-yum-jsonb.sql | docker compose exec -T postgres pg_restore -U postgres -d postgres
	@curl -k -L -s --compressed https://github.com/devrimgunduz/pagila/raw/master/pagila-data-apt-jsonb.sql | docker compose exec -T postgres pg_restore -U postgres -d postgres

pagila-destroy:
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres postgres -c 'drop schema public cascade;'
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres postgres -c 'create schema public;'

pagila-reset: pagila-destroy pagila-init





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

clean:
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v

reset:
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v
	@docker compose $(DOCKER_COMPOSE_CHAIN) pull
	@docker compose $(DOCKER_COMPOSE_CHAIN) build
	@docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f



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
		-v $(CURDIR)/$(project)/scripts/$(db):/scripts:ro \
		--network=hasura_2023 \
		hasura-2023-py \
		sh -c "python /scripts/$(from).py"

py-build:
	docker build --no-cache -t hasura-2023-py ./docker-images/python


	

#
# Numeric API
#

1: start
2: stop
3: logs
4: init
5: exports
20: migrate
21: mifrate-status
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
70: pagila-init
71: pagila-destroy
72: pagila-reset
90: hasura-install
91: hasura-console
92: py
98: clean
99: reset