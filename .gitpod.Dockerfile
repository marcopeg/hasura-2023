FROM gitpod/workspace-full

# Install PlantUML
# Install Graphviz
RUN sudo apt-get update
RUN sudo apt-get -y install graphviz

# Install Hasura
RUN make hasura-install
RUN echo 'export DOCKER_COMPOSE_TARGET=gitpod' >> ~/.bashrc
RUN export DOCKER_COMPOSE_TARGET=gitpod