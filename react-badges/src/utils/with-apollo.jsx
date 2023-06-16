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
  const { token } = useAuth();

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
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
