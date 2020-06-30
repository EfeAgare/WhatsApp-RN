import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import SignIn from '../Auth/SignIn';
import Register from '../Auth/Register';
import { View, Text, Platform } from 'react-native';
import ChatListScreen from '../Chat/ChatListScreen';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};

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
      animationEnabled
      swipeEnabled
      backBehavior
      tabBarOptions={{
        activeTintColor: '#FFF',
        labelStyle: { fontSize: 14, fontWeight: 'bold', margin: 0, padding: 0 },
        style: {
          backgroundColor: 'rgb(34, 65, 67), rgb(17, 48, 50)',
          paddingTop: Constants.statusBarHeight,
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
        component={CameraScreen}
        options={{
          tabBarLabel: '',

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={Platform.OS == 'android' ? 'and-camera' : 'ios-camera'}
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
        name='Home'
        component={StatusScreen}
        options={{ tabBarLabel: 'Status' }}
      />
      <Tab.Screen
        name='Profile'
        component={CallsScreen}
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
        <MyTabs />
      )}
    </NavigationContainer>
  );
};
