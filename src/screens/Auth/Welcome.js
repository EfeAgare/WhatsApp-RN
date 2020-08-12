import React from 'react';
import { Text, View, TouchableHighlight, Platform } from 'react-native';
import { StyledButton, styles } from './form-component';
import AuthScreenBackground from './AuthScreenBackground';

const Welcome = ({ navigation }) => {
  return (
    <AuthScreenBackground>
      <View style={styles.container}>
        <View style={styles.agreementContainer}>
          <View>
            <Text style={{ color: '#FFF', padding: 10 }}>
              Welcome to WhatsApp{' '}
            </Text>
          </View>
          <View style={styles.policyText}>
            <View>
              <Text style={{ color: '#FFF', padding: 4 }}>
                Read our <Text>Private Policy</Text>
              </Text>
            </View>
            <View>
              <Text style={{ color: '#FFF', padding: 10 }}>
                Tap {`"Agree & continue"`} to accept our terms of service.
              </Text>
            </View>
          </View>
        </View>
        {Platform.OS == 'web' ? (
          <View style={styles.button}>
            <StyledButton title={`Agree & Continue`} onPress={() => {}} />
          </View>
        ) : (
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text
              style={{ textAlignVertical: 'center', color: '#fff' }}
            >{`Agree & Continue`}</Text>
          </TouchableHighlight>
        )}
      </View>
    </AuthScreenBackground>
  );
};

export default Welcome;
