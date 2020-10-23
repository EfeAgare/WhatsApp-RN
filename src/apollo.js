import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import * as Keychain from 'react-native-keychain';

const makeApolloClient = () => {
  // create an apollo link instance, a network interface for apollo client
  const httpLink = new createUploadLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      connectionParams: async () => {
        const token = await Keychain.getGenericPassword();
        return { token: token?.password ? `${token?.password}` : '' };
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await Keychain.getGenericPassword();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        'x-token': token?.password ? `${token?.password}` : '',
      },
    };
  });
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
    authLink.concat(httpLink)
  );

  // create an in memory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};
export default makeApolloClient;
