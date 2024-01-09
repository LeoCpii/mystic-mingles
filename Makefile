RUN:=yarn

# LIBS #
BUSINESS:=business

# WEB #
LAB:=lab

# E2E #

# STYLE #
ERROR=\x1b[41m
SUCCESS=\x1b[42m
RESET=\x1b[0m
WARN=\x1b[43m

# ------------------------------------------------------------------------------------ #

define run_in_workspace
	@echo ------------------------------------------------------------------------------;
	@printf "${WARN} RUNNING ${RESET}: $(1) - $(2) $(3)\n";
	@echo ; 
	@$(RUN) workspace @mingles/$(1) $(2) $(3)

	@if [ $$? -eq 0 ]; then \
		printf "${SUCCESS} SUCCESS ${RESET}: $(1) - $(2) $(3)\n"; \
		echo ------------------------------------------------------------------------------; \
	fi
endef

setup:
	make clean-all
	make install
	make build-dependencies

install:
	yarn

install-immutable:
	yarn install --immutable

# ------------------- DEV ------------------- #

## LAB
lab-prod:
	$(call run_in_workspace,$(LAB),start:prod)

lab-stg:
	$(call run_in_workspace,$(LAB),start:stg)

lab-local:
	$(call run_in_workspace,$(LAB),start:local)

lab-test:
	$(call run_in_workspace,$(LAB),start:test)

build-lab-prod:
	$(call run_in_workspace,$(LAB),build:prod)

build-lab-stg:
	$(call run_in_workspace,$(LAB),build:stg)

build-lab-mock:
	$(call run_in_workspace,$(LAB),build:mock)

## SERVICES

# ------------------ BUILD ------------------ #

build-business:
	$(call run_in_workspace,$(BUSINESS),build)

build-dependencies: build-business

# ---------------------- WATCH ----------------------- #

watch-business:
	$(call run_in_workspace,$(BUSINESS),build:watch)

# --------------------- CLEAR ---------------------- #

define delete_build
	@echo delete_build $(1)
	rm -Rf ./packages/$(1)/dist
endef

clean-builds:
	$(call delete_build,shared/$(BUSINESS))

define delete_dependencies
	@echo delete_dependencies $(1)
	rm -Rf ./packages/$(1)/node_modules
endef

clean-dependencies:
	rm -Rf ./node_modules
	$(call delete_dependencies,shared/$(BUSINESS))

clean-all: clean-dependencies clean-builds

# --------------------- TEST --------------------- #

## UNIT
test-business:
	$(call run_in_workspace,$(BUSINESS),test)

test-business-coverage:
	$(call run_in_workspace,$(BUSINESS),test:coverage)

## e2e

# -------------------- LINT -------------------- #

lint:
	$(call run_in_workspace,$(BUSINESS),lint)