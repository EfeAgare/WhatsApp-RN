import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import SignIn from '../Auth/SignIn';
import Register from '../Auth/Register';
import { View, Text } from 'react-native';
import ChatListScreen from '../Chat/ChatListScreen';

const Stack = createStackNavigator();

function CameraScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>Camera!</Text>
    </View>
  );
}

function StatusScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>Status!</Text>
    </View>
  );
}

function CallsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>Calls!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='ChatList'
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue', marginTop: 60 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          console.log('route.name', route.name);
          if (route.name === 'Camera') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={12} color={'#e91e63'} />;
        },
      })}
    >
      <Tab.Screen
        name='Camera'
        component={CameraScreen}
        options={{ tabBarLabel: 'Camera' }}
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
        name='Call'
        component={CallsScreen}
        options={{ tabBarLabel: 'Calls' }}
      />
    </Tab.Navigator>
  );
}
export const MainNavigation = () => {
  const state = false;
  return (
    <NavigationContainer>
      {state ? (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={SignIn} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      ) : (
        <MyTabs />
      )}
    </NavigationContainer>
  );
};
