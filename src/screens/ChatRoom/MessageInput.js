import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

const ActualInput = styled.TextInput`
  width: ${Dimensions.get('window').width - 60}px;
  border-radius: 999px;
  font-size: 18px;
  background-color: white;
  padding: 20px;
`;

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onKeyPress = (e) => {
    console.log("efefefe")
    if (e.charCode === 13) {
      submitMessage();
    }
  };

  const onChangeText = (text) => {
    setMessage(text);
  };

  const submitMessage = () => {
    if (!message) return;

    setMessage('');

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='position'
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <ActualInput
        type='text'
        placeholder='Type a message'
        value={message}
        onKeyPress={(e)=> onKeyPress(e)}
        onChangeText={(text) => onChangeText(text)}
      />
      <TouchableOpacity
        style={styles.TouchableOpacityStyle}
        onPress={() => submitMessage}
      >
        {!message ? (
          <Icon
            name='mic'
            size={24}
            type='material-icons'
            reverse
            color='#128c7e'
          />
        ) : (
          <Icon
            name='send'
            size={24}
            type='material-icons'
            reverse
            color='#128c7e'
          />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
});
