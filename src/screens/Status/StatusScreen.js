import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FAB from '../Common/FAB';


const StatusScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>Status Screen</Text>
      <FAB navigation={navigation} route={route} color={true}/>
      <FAB navigation={navigation} route={route} color={false}/>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({});
