FROM gitpod/workspace-full

# Install PlantUML
RUN sudo apt update
RUN sudo apt install graphviz

# Install Hasura
RUN make hasura-install
RUN echo 'export DOCKER_COMPOSE_TARGET=gitpod' >> ~/.bashrc
RUN export DOCKER_COMPOSE_TARGET=gitpod