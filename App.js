import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
import AuthSreen from './src/screens/Auth/Index';

const client = makeApolloClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthSreen />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);