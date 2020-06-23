import styled from 'styled-components/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import SignIn from './SignIn';
import { LinearGradient } from 'expo-linear-gradient';


const Icon = styled.Image`
  width: 120px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  padding: 70px;
`;

const Intro = styled.View`
  height: 300px;
  margin-top: 0px;
`;

const Container = styled.View`
  flex: 1;
`;

export const StyledButton = styled.Button`
  color: white;
`;

const AuthSreen = () => {
  return (
    <Container>
      <LinearGradient
        colors={['rgb(34, 65, 67)', 'rgb(17, 48, 50)']}
        start={[0.1, 0.1]}
        style={styles.linearGradient}
      >
        <Intro>
          <Icon source={require('../../../assets/assets/whatsapp-icon.png')} />
        </Intro>
        <SignIn />
      </LinearGradient>
    </Container>
  );
};

export default AuthSreen;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
