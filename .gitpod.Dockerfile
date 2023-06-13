FROM gitpod/workspace-full

# Install PlantUML
RUN apt update
RUN apt install -y graphviz

# Install Hasura
RUN make hasura-install
RUN echo 'export DOCKER_COMPOSE_TARGET=gitpod' >> ~/.bashrc
RUN export DOCKER_COMPOSE_TARGET=gitpod