#!/bin/bash

# Set public ports:
gh codespace ports visibility 8080:public -c ${CODESPACE_NAME}
gh codespace ports visibility 8081:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9693:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9695:public -c ${CODESPACE_NAME}

# Runs the project:
make hasura-install
make boot
