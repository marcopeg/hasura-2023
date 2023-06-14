FROM node:18

# NPM Install for building
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm install

# Basic entry point
WORKDIR /usr/src/app
ENTRYPOINT [ "npm", "run", "start" ]

EXPOSE 3000