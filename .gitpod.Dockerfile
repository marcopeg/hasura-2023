FROM gitpod/workspace-full

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

#RUN npm install -g add @nestjs/cli expo-cli eas-cli @expo/ngrok@^4.1 nps

#RUN wget https://github.com/digitalocean/doctl/releases/download/v1.77.0/doctl-1.77.0-linux-amd64.tar.gz && \
#    tar xf ./doctl-1.77.0-linux-amd64.tar.gz && \
#    sudo mv ./doctl /usr/local/bin/doctl && \
#    rm doctl-1.77.0-linux-amd64.tar.gz

#RUN brew install kubectl kustomize tilt-dev/tap/tilt tilt-dev/tap/ctlptl kind doctl pulumi helm

#RUN helm repo add bitnami https://charts.bitnami.com/bitnami

#RUN wget https://github.com/stripe/stripe-cli/releases/download/v1.7.12/stripe_1.7.12_linux_x86_64.tar.gz && \
#    tar -xvf stripe_1.7.12_linux_x86_64.tar.gz && \
#    sudo mv stripe /usr/bin && \
#    rm -r stripe_1.7.12_linux_x86_64.tar.gz
