import React from 'react';
import {  TextInput, View } from 'react-native';
import { StyledButton , styles} from './form-component';
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
        <View style={styles.button}>
          <StyledButton
            title='Login'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </AuthSreenBackground>
  );
};

export default Register;
