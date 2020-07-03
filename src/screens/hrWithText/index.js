import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const HrWithText = (props) => {
  return (
    <View style={[styles.container, props.style && { ...props.style }]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default HrWithText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',

    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    paddingVertical: 7,
    paddingLeft: 20,
  },
});
