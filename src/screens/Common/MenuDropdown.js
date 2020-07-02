import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon } from 'react-native-elements';

const MenuDropdown = () => {
  // const route = useRoute();

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  // console.log(route);

  return (
    <View style={styles.container}>
      <Menu
        ref={menu}
        button={
          <Icon name='more-vert' size={23} color='white' onPress={showMenu} />
        }
      >
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem onPress={hideMenu} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
};

export default MenuDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
