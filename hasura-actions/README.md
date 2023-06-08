# Hasura Actions

This projects demonstrates some capabilities of the [Hasura Actions](https://hasura.io/docs/latest/actions/overview/).

We use Hasura to build a GraphQL interface to the famous [Chuck Norris APIs](https://api.chucknorris.io/), giving strong types to the already strong Chuck's REST endpoints 😎.

Then, just for the fun of it, we re-expose those APIs a [REST endpoints as well](https://hasura.io/blog/adding-rest-endpoints-to-hasura-cloud/). Crazy uh?

## GraphQL Queries:

Try this:

```graphql
query getChuckNorrisJoke {
  chuck {
    value
  }
}
```

Open the "Actions" tab on Hasura's Console and explore the configuration of this simple project.

## REST APIs:

Try this:  
[https://localhost:8080/api/rest/chuck](https://localhost:8080/api/rest/chuck)

If you are running on GitPod or Codespaces, open your workspace public URL on port `8080` (Hasura GraphQL Engine).

