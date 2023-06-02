.PHONY: build

export USER_NAME=$(shell whoami)
export USER_ID=$(shell id -u)
export GROUP_ID=$(shell id -g)

go:
	@rm -rf ./output
	@mkdir ./output
	@docker-compose build --no-cache
	@docker-compose up
	@ls -la ./output
