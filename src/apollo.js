import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import * as Keychain from 'react-native-keychain';

const makeApolloClient = async () => {
  // Create an http link:
  const httpLink = new createUploadLink({
    uri: 'http://localhost:4000/graphql',
  });
  
    // Retrieve the credentials
   let credentials = await Keychain.getGenericPassword();
  

  const middlewareLink = setContext((req, previousContext) => {
    if (credentials) {
      return {
        headers: {
          'x-token': `${credentials?.token}`,
        },
      };
    }

    return previousContext;
  });

  const afterwareLink = new ApolloLink(async (operation, forward) => {
    const { headers } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');

      if (token) {
        // Store the credentials
        await Keychain.setGenericPassword(token);
      }
    }

    return forward(operation);
  });

  const httpLinkWithMiddleware = afterwareLink.concat(
    middlewareLink.concat(httpLink)
  );

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        token: credentials?.token,
      },
    },
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
    httpLinkWithMiddleware
  );
  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  return client;
};

export default makeApolloClient;
