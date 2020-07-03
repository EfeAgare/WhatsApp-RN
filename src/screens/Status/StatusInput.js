import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const StatusInput = ({ navigation }) => {
  const [value, onChangeText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={value}
        multiline={true}
        style={styles.textInputStyle}
        enablesReturnKeyAutomatically={true}
        placeholder='Type a status'
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

export default StatusInput;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#59ABE3',
  },

  textInputStyle: {
    height: 42,
    borderColor: '#009688',
    width: '100%',
    height: 'auto',
    fontSize: 40,
    textAlign: 'center',
  },
});
