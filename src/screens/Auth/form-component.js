import styled from 'styled-components/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const StyledButton = styled.Button`
  color: white;
`;

export const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 60,
  },
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 15,
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
    backgroundColor: Platform.OS == 'web' ? 'rgb(33, 150, 243)' : 'yellow',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});

export const MyButton = (props) => {
  return (
    <View style={{ marginTop: 50 }}>
      <StyledButton title='Login' />
    </View>
  );
};
