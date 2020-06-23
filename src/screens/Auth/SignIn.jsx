import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { StyledButton } from './Index';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login</Text>
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
      <TouchableHighlight style={styles.button}>
        <StyledButton title='Login' />
      </TouchableHighlight>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 60,
  },
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 15,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'yellow',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});
