#!/bin/bash

gh codespace ports visibility 8080:public -c ${CODESPACE_NAME}
gh codespace ports visibility 9693:public -c ${CODESPACE_NAME}

make hasura-install
make boot
