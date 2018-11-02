include .env

CANVAS_SKETCH := $(PWD)/node_modules/.bin/canvas-sketch

.PHONY: deps
deps: node_modules ## Install/Update dependencies

node_modules: package.json yarn.lock
	@yarn install
	@touch $@

.DEFAULT_GOAL := serve
.PHONY: serve
LATEST := $(shell ls src -Art | tail -n 1)
serve: deps ## Serve latest src/*.js with livereload on localhost:9966
	@$(CANVAS_SKETCH) src/$(LATEST)

SRC_FILES := $(wildcard src/*.js)
OBJ_FILES := $(patsubst src/%,dist/%,$(SRC_FILES))
build: deps $(OBJ_FILES) ## Build every src/*.js to dist/

dist/%.js: src/%.js
	@$(CANVAS_SKETCH) $< --dir dist --build

deploy: build ## Build and deploy ./dist to codevember.davidauthier.wearemd.com/2018/11/
	@rsync -avz ./dist/ $(USER)@$(SERVER):$(SERVER_DEST)
	@# @rsync index.html $(USER)@$(SERVER):$(SERVER_DEST)

.PHONY: help
help: ## Print this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
