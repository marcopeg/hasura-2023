import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { useAuth } from "./with-authorization";

const httpLink = createHttpLink({
  uri: "/v1/graphql"
});

const withApollo = (Component) => (props) => {
  // Gets the authentication token from the Authorization provider
  // and avoid
  const auth = useAuth();
  // if (auth.loading) return null;

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(auth.token ? { authorization: `Bearer ${auth.token}` } : {})
    }
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};
export default withApollo;
