FROM gitpod/workspace-full

# Install PlantUML
# Install Graphviz
RUN sudo apt-get update
RUN sudo apt-get -y install graphviz

# Install Hasura
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
RUN echo 'export DOCKER_COMPOSE_TARGET=gitpod' >> ~/.bashrc
RUN export DOCKER_COMPOSE_TARGET=gitpod