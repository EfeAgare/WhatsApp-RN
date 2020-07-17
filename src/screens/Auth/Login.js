import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { request, PERMISSIONS } from 'react-native-permissions';
import { buttonStyle } from './form-component';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

const Login = ({ navigation }) => {
  const [formState, setState] = useState({
    isFocused: false,
  });

  const [loadedIOS, setLoadedIOS] = useState(false);
  const [loadedAndroid, setLoadedAndroid] = useState(false);

  const onChangeText = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    console.log('dialCode', dialCode);
    console.log('unmaskedPhoneNumber', unmaskedPhoneNumber);
    console.log('phoneNumber', phoneNumber);
    console.log('isVerified', isVerified);
  };


  useEffect(() => {
    if (!loadedAndroid) {
      request(PERMISSIONS.ANDROID.Contacts).then((result) => {
        setLoadedAndroid(true);
        console.log(result);
      });
    }
    if (!loadedIOS) {
      request(PERMISSIONS.IOS.Contacts).then((result) => {
        setLoadedIOS(true);
        console.log(result);
      });
    }
  }, [
    PERMISSIONS.ANDROID.Contacts,
    PERMISSIONS.IOS.Contacts,
    loadedIOS,
    loadedAndroid,
  ]);
  return (
    <SafeAreaView>
      <IntlPhoneInput
        onChangeText={(text) => onChangeText(text)}
        defaultCountry='NG'
        dialCodeTextStyle={styles.dialCodeTextStyle}
        containerStyle={styles.container}
        placeholder='phone number'
        inputProps={{
          keyboardType: 'phone-pad',
          textContentType: 'telephoneNumber',
          returnKeyType: 'done',
        }}
        phoneInputStyle={styles.phoneInputStyle}
      />

      <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={formState.isFocused ? BLUE : LIGHT_GRAY}
        blurOnSubmit
        placeholder='About me'
        clearTextOnFocus
        maxLength={140}
        style={styles.textInput}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('WhatsAppTab')}
      >
        <Text
          style={{ textAlignVertical: 'center', color: '#fff', fontSize: 20 }}
        >
          Login
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    paddingHorizontal: 30,
  },

  dialCodeTextStyle: {
    width: 0,
    height: 0,
  },

  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    marginRight: 30,
    marginTop: 20,
    marginLeft: 75,
  },

  phoneInputStyle: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
  button: buttonStyle,
});
export default Login;
