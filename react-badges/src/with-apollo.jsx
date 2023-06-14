import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/v1/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("hasura-token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const withApollo = (Component) => (props) =>
  (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );

export default withApollo;
