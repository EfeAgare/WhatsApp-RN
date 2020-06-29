import React from 'react';
import {
  TextInput,
  View,
  TouchableHighlight,
  Platform,
  Text,
} from 'react-native';
import { StyledButton, styles, TouchableClick } from './form-component';
import AuthSreenBackground from './AuthScreenBackground';

const SignIn = ({ navigation }) => {
  return (
    <AuthSreenBackground>
      <View style={styles.container}>
        <TextInput
          placeholder='Enter your username'
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput
          placeholder='Enter your password'
          placeholderTextColor='white'
          style={styles.input}
        />
        {Platform.OS == 'web' ? (
          <View style={styles.button}>
            <StyledButton title='Login' onPress={() => {}} />
          </View>
        ) : (
          <TouchableHighlight style={styles.button}>
            <StyledButton
              title='Login'
              onPress={() => navigation.navigate('Register')}
            />
          </TouchableHighlight>
        )}
        <TouchableClick
          screen='Register'
          text="Don't have an account? Register"
          navigation={navigation}
        />
      </View>
    </AuthSreenBackground>
  );
};

export default SignIn;
