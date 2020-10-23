import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import MenuDropdown from './MenuDropdown';

export const CommonHeader = (props) => {
  return (
    <View style={styles.headerIcons}>
      {props?.show && (
        <View style={{ paddingRight: 30 }}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name='video' size={23} color='white' type='foundation' />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ paddingRight: 30 }}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name='search' size={23} color='white' />
        </TouchableOpacity>
      </View>

      <View>
        <MenuDropdown />
      </View>
    </View>
  );
};
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 2 }}>
        <Text style={styles.logoText}>WhatsApp</Text>
      </View>
      <CommonHeader />
    </View>
  );
};

export default Header;

const headerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgb(17, 48, 50)',
  color: '#fff',
  paddingHorizontal: 10,
  paddingTop: 60,
  paddingBottom: 20,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    ...headerStyle,
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
