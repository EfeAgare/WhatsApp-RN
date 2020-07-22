import React, { useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavigation, MyTheme } from '../Navigation/Navigation';

import Login from './Login';
import Welcome from './Welcome';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthStack.Navigator>
        <AuthStack.Screen name='Welcome' component={Welcome} />
        <AuthStack.Screen name='Login' component={Login} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

const MainAuthNavigation = () => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials.password) {
      setToken(credentials.password);
    }
  };

  useEffect(() => {
    if (!token) {
      getToken();
    }
  }, [token, getToken]);

  return (
    <React.Fragment>
      {!token ? <AuthNavigation /> : <MainNavigation />}
    </React.Fragment>
  );
};

export default MainAuthNavigation;
