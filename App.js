import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
// import { MainNavigation } from './src/screens/Navigation/Navigation';
import MainAuthNavigation from './src/screens/Auth/MainAuthNavigation';


const client = makeApolloClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainAuthNavigation />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(17, 48, 50)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 20,
  },
});

AppRegistry.registerComponent('MyApplication', () => App);
