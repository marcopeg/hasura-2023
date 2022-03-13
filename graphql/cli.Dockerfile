FROM ubuntu:20.04

RUN apt-get update -y
RUN apt-get install -y curl socat
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash