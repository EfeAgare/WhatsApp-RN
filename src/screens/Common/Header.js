import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 2 }}>
        <Text style={styles.logoText}>WhatsApp</Text>
      </View>
      <View style={styles.headerIcons}>
        <View style={{ paddingRight: 30 }}>
          <Icon name='search' size={23} color='white' />
        </View>
        <View>
          <Icon name='more-vert' size={23} color='white' />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(17, 48, 50)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoText: {
    color: '#fff',
    fontWeight: '500',
    paddingLeft: 10,
    fontSize: 20,
  },
  headerIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
