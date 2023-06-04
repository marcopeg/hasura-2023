# Hasura Metadata Ad Code

In this folder Hasura Console keeps track of the entire configuration of your Hasura instance.

## Running Hasura Console

### Local Development

```bash
make hasura-console
```

Then go to [http://localhost:9596](http://localhost:9596)

### GitPod / GitHub Codespaces

The console is already running, just open your project's `9695` port url.

## Relevant Make Commands

```bash
# Code > Hasura
make apply

# Hasura > Code
make metadata-export
```