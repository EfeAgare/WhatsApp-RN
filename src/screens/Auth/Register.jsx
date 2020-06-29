import React from 'react';
import {
  TextInput,
  View,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { StyledButton, styles, TouchableClick } from './form-component';
import AuthSreenBackground from './AuthScreenBackground';

const Register = ({ navigation }) => {
  return (
    <AuthSreenBackground>
      <View style={styles.container}>
        <TextInput
          placeholder='Enter your username'
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput
          placeholder='Enter your name'
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput
          placeholder='Enter your password'
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput
          placeholder='About you'
          placeholderTextColor='white'
          style={styles.input}
        />
        {Platform.OS == 'web' ? (
          <View style={styles.button}>
            <StyledButton title='Register' onPress={() => {}} />
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
          screen='Login'
          text='Already have an account? Login'
          navigation={navigation}
        />
      </View>
    </AuthSreenBackground>
  );
};

export default Register;
