import React from 'react';
import { TextInput, View, TouchableHighlight, Platform } from 'react-native';
import { StyledButton, styles } from './form-component';
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
      </View>
    </AuthSreenBackground>
  );
};

export default SignIn;
