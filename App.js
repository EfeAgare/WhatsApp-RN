import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
import { MainNavigation } from './src/screens/navigation/navigation';

const client = makeApolloClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainNavigation />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);

