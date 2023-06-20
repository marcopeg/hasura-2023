import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { useAuth } from "./with-auth";

const httpLink = createHttpLink({
  uri: "/v1/graphql"
});

const withApollo = (Component) => (props) => {
  // Gets the authentication token from the Authorization provider
  // and avoid
  const auth = useAuth();

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      // Send the full JWT as auth, but specify the selected role for the multi-app scenario.
      ...(auth.token ? { authorization: `Bearer ${auth.token}` } : {}),
      ...(auth.role ? { "x-hasura-role": auth.role } : {})
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
