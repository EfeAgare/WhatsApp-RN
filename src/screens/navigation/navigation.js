import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from '../Auth/Login';
import Welcome from '../Auth/Welcome';
import { Platform, StatusBar, View, Text } from 'react-native';
import ChatListScreen from '../Chat/ChatListScreen';
import ChatCameraScreen from '../Camera/ChatCameraScreen';
import CallScreen from '../Calls/CallScreen';
import StatusScreen from '../Status/StatusScreen';
import ContactScreen from '../Contacts/ContactScreen';
import Header from '../Common/Header';
import StatusInput from '../Status/StatusInput';
import StatusUpload from '../Status/StatusUpload';
import StoryScreen from '../Stories/StoryScreen';

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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor='rgb(34, 65, 67)' />
      <Header />
      <Tab.Navigator
        initialRouteName='ChatList'
        animationEnabled
        swipeEnabled
        backBehavior
        tabBarOptions={{
          activeTintColor: '#FFF',
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            margin: 0,
            padding: 0,
          },
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
    </View>
  );
}

const ContactTitle = () => {
  return (
    <View style={{ paddingBottom: 0 }}>
      <Text style={{ color: '#FFF', fontSize: 15 }}>Select Contact</Text>
      <Text style={{ color: '#FFF' }}>150 contact</Text>
    </View>
  );
};

export const MainNavigation = () => {
  const state = true;
  return (
    <NavigationContainer theme={MyTheme}>
      {state ? (
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='WhatsAppTab'
            component={WhatsAppTab}
            options={{
              headerTransparent: true,
              title: '',
            }}
          />
          <Stack.Screen
            name='Contact'
            component={ContactScreen}
            options={{
              title: 'Contact',
              headerStyle: {
                backgroundColor: 'rgb(34, 65, 67), rgb(17, 48, 50)',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerTitle: (props) => <ContactTitle {...props} />,
            }}
          />
          <Stack.Screen
            name='StatusInput'
            component={StatusInput}
            options={{
              title: '',
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name='StatusUpload'
            component={StatusUpload}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'rgb(34, 65, 67), rgb(17, 48, 50)',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerBackTitle: '',
            }}
          />

          <Stack.Screen
            name='StoryScreen'
            component={StoryScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'rgb(34, 65, 67), rgb(17, 48, 50)',
              },
              headerTitleStyle: {
                color: '#fff',
              },
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
