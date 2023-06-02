FROM alpine:latest

ARG USER_NAME
ARG USER_ID
ARG GROUP_ID

# Create a working directory
WORKDIR /app

# Copy a script file into the container
COPY script.sh /app/script.sh

# Set execute permissions for the script
RUN chmod +x /app/script.sh

# Create a new user and group inside the container
RUN addgroup -g $GROUP_ID $USER_NAME \
    && adduser -u $USER_ID -G $USER_NAME -D $USER_NAME

# Switch to the newly created user
USER $USER_NAME

# Set the entrypoint command to the script
ENTRYPOINT ["/app/script.sh"]
