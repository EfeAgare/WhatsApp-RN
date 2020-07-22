import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

const makeApolloClient = () => {
  // create an apollo link instance, a network interface for apollo client
  const httpLink = new createUploadLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      // connectionParams: {
      //   token: credentials?.password,
      // },
    },
  });

  const middlewareLink = setContext(() => ({
    headers: {
      'x-token': `${credentials?.password}`,
    },
  }));

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};
export default makeApolloClient;
