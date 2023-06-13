#!/bin/bash

# Set public ports:
gh codespace ports visibility 8080:public -c ${CODESPACE_NAME}
gh codespace ports visibility 8081:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9693:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9695:public -c ${CODESPACE_NAME}

# Install Worspace Dependencies
# PlantUML
sudo apt update
sudo apt install -y graphviz
# HasuraCLI
make hasura-install

# Run the project:
make start
