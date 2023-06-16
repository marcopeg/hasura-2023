# React Badges

This is a React app based on ViteJS.

## Quick Start

```bash
cd react-badges  && \
   yarn install && \
   yarn start
```

## Authentication

Use [jwt.io](https://jwt.io/) to generate valid tokens, then login by creating the `hasura-token` propery in LocalStorage.

payload:

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "backoffice",
    "x-hasura-allowed-roles": ["backoffice", "manager", "engineer"],
    "x-hasura-tenant-id": "5"
  }
}
```

token:

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImJhY2tvZmZpY2UiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImJhY2tvZmZpY2UiLCJtYW5hZ2VyIiwiZW5naW5lZXIiXSwieC1oYXN1cmEtdGVuYW50LWlkIjoiNSJ9fQ.lfjPCKOiE7dM8i7nikgQ8C3j123uPAtu2oDLSEYdLDg
```
