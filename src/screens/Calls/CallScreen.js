import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FAB from '../Common/FAB';

const CallScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>CallScreen</Text>
      <FAB navigation={navigation} route={route}  color={false}/>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({});
