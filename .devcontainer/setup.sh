#!/bin/bash

# Set public ports:
gh codespace ports visibility 8080:public -c ${CODESPACE_NAME}
gh codespace ports visibility 8081:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9693:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9695:public -c ${CODESPACE_NAME}
gh codespace ports visibility 5173:public -c ${CODESPACE_NAME}

# Install Worspace Dependencies
# PlantUML
if ! command -v dot &> /dev/null
then
  sudo apt update
  sudo apt install -y graphviz
fi
# HasuraCLI
if ! command -v hasura &> /dev/null
then
  make hasura-install
fi

# Run the project:
make start
