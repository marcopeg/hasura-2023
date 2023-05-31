# Configuration & Defaults
#

passwd?=hasura
project?=hasura-state
endpoint?=http://localhost:5000
db?=default
schema?=public
from?=default
steps?=1
name?=new-migration
q?=select now();

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
	@echo " 5) make export"
	@echo ""
	@echo " 6) make status"
	@echo " 7) make migrate"
	@echo " 8) make migrate-up"
	@echo " 9) make migrate-down"
	@echo "10) make migrate-redo"
	@echo "11) make migrate-rebuild"
	@echo "12) make migrate-destroy"
	@echo "13) make migrate-create"
	@echo "14) make migrate-export"
	@echo ""
	@echo "15) make seed"
	@echo ""
	@echo "16) make pagila-init"
	@echo "17) make pagila-destroy"
	@echo "18) make pagila-reset"
	@echo ""
	@echo "19) make ports"
	@echo ""
	@echo "98) make clean"
	@echo "99) make reset"
	@echo ""

#
# High Level APIs
#

start:
	@docker compose up -d
	@docker compose logs -f

logs:
	@docker compose logs -f

stop:
	@docker compose down

init: migrate-rebuild apply seed

export: migrate-export metadata-export

#
# Hasura Migrations Utilities
#

status:
	@hasura migrate status \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(db)

migrate:
	@hasura migrate apply \
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
	@hasura metadata apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)




#
# Postgres Utilities
#

psql:
	@docker compose exec postgres psql -U postgres postgres

psql-exec:
	@docker compose exec -T postgres psql -U postgres postgres < $(from)



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
	@docker compose exec postgres psql -U postgres postgres -c 'drop schema public cascade;'
	@docker compose exec postgres psql -U postgres postgres -c 'create schema public;'

pagila-reset: pagila-destroy pagila-init

clean:
	@docker compose down -v

reset:
	@docker compose down -v
	@docker compose pull
	@docker compose build --no-cache
	@docker compose up -d
	@docker compose logs -f

#
# GitPod Utilities
#

ports:
	@gp ports list


#
# Numeric API
#

1: start
2: stop
3: logs
4: init
5: export
6: status
7: migrate
8: migrate-up
9: migrate-down
10: migrate-redo
11: migrate-rebuild
12: migrate-destroy
13: migrate-create
14: migrate-export
15: seed
16: pagila-init
17: pagila-destroy
18: pagila-reset
19: ports
99: reset