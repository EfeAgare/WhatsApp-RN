import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const FAB = ({ navigation, route, color, navigateTo }) => {
  const RenderFAB = () => {
    if (route.name == 'ChatList') {
      return <Icon name='message' size={23} color='white' />;
    } else if (route.name == 'Status') {
      return <Icon name='camera' size={23} color='white' />;
    } else if (route.name == 'Calls') {
      return <Icon name='call' size={23} color='white' />;
    }
  };
  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <RenderFAB />
      </TouchableOpacity>
      {color && (
        <TouchableOpacity
          style={styles.TouchableOpacityStyleStatus}
          onPress={() => navigation.navigate(navigateTo)}
        >
          <Icon name='pencil' size={23} color='black' type='octicon' />
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

export default FAB;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70,
    borderRadius: 100 / 2,
    backgroundColor: '#27eb1e',
  },
  TouchableOpacityStyleStatus: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 140,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
  },
});
