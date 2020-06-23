import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../Auth/SignIn';
import Register from '../Auth/Register';

const Stack = createStackNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={SignIn} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
