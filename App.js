import React from 'react';
import { AppRegistry, View, Text, StyleSheet, StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
import { MainNavigation } from './src/screens/navigation/navigation';
import Header from './src/screens/Common/Header';

const client = makeApolloClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' backgroundColor='rgb(34, 65, 67)' />
        <Header/>
        <MainNavigation />
      </View>
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
