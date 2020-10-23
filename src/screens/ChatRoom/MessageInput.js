import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactNative from 'react-native';
import {
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ActualInput = styled.TextInput`
  width: ${Dimensions.get('window').width - 70}px;
  border-radius: 999px;
  font-size: 18px;
  background-color: white;
  padding: 20px;
  margin-left: 10px;
`;

const MessageInput = ({ onSendMessage, setContentHeightWithKeys }) => {
  const [message, setMessage] = useState('');
  const [inputRef, setInputRef] = useState('');
  const setRef = useRef('');

  const onKeyPress = (e) => {
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

  // // console.log("ere", setRef)
  const scrollToInput = (reactNode) => {
    // Add a 'scroll' ref to your ScrollView
    console.log("efefefefe")
    setContentHeightWithKeys(reactNode);
    // console.log("reactNode", reactNode)
    // console.log('inputRef', inputRef.props);
    // inputRef.props.scrollToEnd(true);
  };

  return (
    <>
      {/* <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        innerRef={(ref) => {
          setInputRef(ref);
        }}
        extraScrollHeight={false}
        extraScrollHeight={0}
      > */}
      <KeyboardAvoidingView
        behavior='position'
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ActualInput
          type='text'
          placeholder='Type a message'
          value={message}
          // ref={inputRef}
          onKeyPress={(e) => onKeyPress(e)}
          onChangeText={(text) => onChangeText(text)}
          onFocus={(e) => scrollToInput(ReactNative.findNodeHandle(e.target))}
        />
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => submitMessage()}
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
      {/* </KeyboardAwareScrollView> */}
    </>
    /* </KeyboardAvoidingView> */
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flex: 0.24,
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
