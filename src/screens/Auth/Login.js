import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useMutation } from '@apollo/react-hooks';
import { buttonStyle } from './form-component';
import Countries from './Countries';
import signInMutation from '../../graphQl/mutations/signIn.mutation';
import * as Keychain from 'react-native-keychain';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [phoneNumberIsVerified, setPhoneNumberIsVerified] = useState(null);

  const [loadedIOS, setLoadedIOS] = useState(false);
  const [loadedAndroid, setLoadedAndroid] = useState(false);

  const onChangeText = ({ dialCode, unmaskedPhoneNumber, isVerified }) => {
    setPhoneNumber(unmaskedPhoneNumber);
    setPhoneNumberIsVerified(isVerified);
    setDialCode(dialCode);
  };

  setToken = async (token, user) => {
    const username = user.phonenumber;
    const password = token;
    console.log('user', user);
    await Keychain.setGenericPassword(username, password);
  };

  const [signIn] = useMutation(signInMutation, {
    onCompleted({ signIn: { token, user } }) {
      Keychain.resetGenericPassword();
      setToken(token, user);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const maySignIn = useCallback(() => {
    return !!(username && aboutMe && phoneNumber);
  }, [username, aboutMe, phoneNumber]);

  const handleSubmit = useCallback(() => {
    if (phoneNumber.length == 0) {
      return;
    }

    if (!phoneNumberIsVerified) {
      const flag =
        Countries.filter((country) => country.dialCode === dialCode)[0] ||
        Countries.filter((obj) => obj.code === 'NG')[0];
      Alert.alert(
        'Wrong Phone Number for',
        `${flag.en}`,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
      return;
    }

    if (
      phoneNumber.length < 11 ||
      aboutMe.length == 0 ||
      username.length == 0
    ) {
      return;
    }
    signIn({ variables: { username, aboutMe, phoneNumber } });
  }, [username, aboutMe, phoneNumber, signIn, phoneNumberIsVerified]);

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
        blurOnSubmit
        placeholder='Username'
        maxLength={50}
        name='userName'
        onChangeText={(text) => setUsername(text)}
        style={styles.textInput}
      />

      <TextInput
        blurOnSubmit
        placeholder='About me'
        maxLength={140}
        name='aboutMe'
        onChangeText={(text) => setAboutMe(text)}
        style={styles.textInput}
      />
      {console.log(!maySignIn())}
      <TouchableHighlight
        style={!maySignIn() ? styles.disableButton : styles.button}
        disabled={!maySignIn()}
        onPress={() => handleSubmit()}
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
    marginTop: 150,
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
  disableButton: {
    height: 40,
    width: '50%',
    borderRadius: 10,
    backgroundColor: '#808080',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
