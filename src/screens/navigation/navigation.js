import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import SignIn from '../Auth/SignIn';
import Register from '../Auth/Register';
import { View, Text, Platform } from 'react-native';
import ChatListScreen from '../Chat/ChatListScreen';
import ChatCameraScreen from '../Camera/ChatCameraScreen';
import CallScreen from '../Calls/CallScreen';
import StatusScreen from '../Status/StatusScreen';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};

const Tab = createMaterialTopTabNavigator();

function WhatsAppTab() {
  return (
    <Tab.Navigator
      initialRouteName='ChatList'
      animationEnabled
      swipeEnabled
      backBehavior
      tabBarOptions={{
        activeTintColor: '#FFF',
        labelStyle: { fontSize: 14, fontWeight: 'bold', margin: 0, padding: 0 },
        style: {
          backgroundColor: 'rgb(34, 65, 67), rgb(17, 48, 50)',
          paddingTop: 10,
          paddingBottom: 0,
          padding: 0,
        },
        labelPosition: 'below-icon',
        tabStyle: {
          padding: 0,
          width: 100,
          margin: 0, //Padding 0 here
        },
        showIcon: true,
        iconStyle: {
          width: 30,
          height: 30,
          padding: 0, //Padding 0 here
        },
        tabBarPosition: 'top',
      }}
    >
      <Tab.Screen
        name='Camera'
        component={ChatCameraScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={Platform.OS == 'android' ? 'md-camera' : 'ios-camera'}
                size={30}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='ChatList'
        component={ChatListScreen}
        options={{ tabBarLabel: 'Chats' }}
      />
      <Tab.Screen
        name='Status'
        component={StatusScreen}
        options={{ tabBarLabel: 'Status' }}
      />
      <Tab.Screen
        name='Calls'
        component={CallScreen}
        options={{ tabBarLabel: 'Calls' }}
      />
    </Tab.Navigator>
  );
}
export const MainNavigation = () => {
  const state = false;
  return (
    <NavigationContainer theme={MyTheme}>
      {state ? (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={SignIn} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      ) : (
        <WhatsAppTab />
      )}
    </NavigationContainer>
  );
};
