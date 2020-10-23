import moment from 'moment';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import deleteMessageSubscription from '../../graphQl/subscriptions/deleteMessage.subscription';
import { useMutation } from '@apollo/react-hooks';
import deleteMessageMutation from '../../graphQl/mutations/deleteMessage.mutation';
import { Text, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReactNative, { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { NativeModules } from 'react-native';
import MessageInput from './MessageInput';

const { width, height } = Dimensions.get('window');
const ScrollView = styled.ScrollView`
  flex: 2;
  padding: 0 15px;
`;

const MessageItem = styled.View`
  display: flex;
  max-width: 80%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  padding-top: 10px;
  line-height: 20px;
  padding-bottom: 10px;
  background-color: #ffff;
`;

const Contents = styled.View`
  padding: 5px 7px;
`;

const Timestamp = styled.View`
  position: absolute;
  right: 7px;
  color: gray;
  padding-bottom: 5px;
  bottom: 0px;
  font-size: 12px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'unset',
    backgroundColor: 'unset',
  },
  header: {
    padding: 'unset',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },
  time: {
    justifyContent: 'flex-end',
    padding: 'unset',
  },
  listItem: {
    width: '30%',
    position: 'absolute',
    top: '2px',
    zIndex: '10',
    left: ' 63%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ScrollViewManager = NativeModules.ScrollViewManager;

const MessageList = ({ messages, chatId, subscribeToMore, onSendMessage }) => {
  const classes = useStyles();
  const setRef = useRef(null);
  const inputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [contentHeight, setContentHeight] = useState(null);
  const [contentHeightWithKeys, setContentHeightWithKeys] = useState(null);

  const handleSelect = (id) => {
    setOpenModal(!openModal);
    setMessageId(id);
  };

  const [deleteMessage] = useMutation(deleteMessageMutation);

  const handleDelete = useCallback(() => {
    if (messageId === null) return null;
    deleteMessage({
      variables: { chatId, messageId },
    });
  }, [deleteMessage, chatId, messageId]);

  const messageDeleteSubscription = useCallback(
    (messageId) => {
      subscribeToMore({
        document: deleteMessageSubscription,
        variables: { chatId: chatId, messageId: messageId },

        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data.deleteMessage) return prev.chat;
          const messages = prev.chat.messages.filter(
            (item) => item.id !== messageId
          );

          return {
            chat: {
              ...prev.chat,
              messages: messages,
            },
          };
        },
      });
    },
    [subscribeToMore, chatId]
  );

  const scrollToInput = () => {
    const scrollResponder = this.refs.myScrollView.getScrollResponder();
    const inputHandle = React.findNodeHandle(this.refs.myInput);

    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      inputHandle, // The TextInput node handle
      0, // The scroll view's bottom "contentInset" (default 0)
      true // Prevent negative scrolling
    );
  };

  useEffect(() => {
    if (!setRef.current) return;

    ScrollViewManager.getContentSize(
      ReactNative.findNodeHandle(setRef.current),
      (contentSize) => {
        // const height = Integer.parse()
        setContentHeight(
          contentSize.height * 2 + contentSize.width + +contentHeightWithKeys
        );
        console.log(contentSize);
      }
    );

    console.log('+ contentHeightWithKeys', contentHeightWithKeys);

    console.log('+ contentHeight ', contentHeight);
    console.log(
      'contentHeight + height + contentHeightWithKeys',
      contentHeight + height + contentHeightWithKeys
    );
    setRef.current.scrollTo({
      x: 0,
      y: contentHeight + contentHeightWithKeys,
      animated: true,
    });

    return () => {};
  }, [
    setRef.current,
    messageDeleteSubscription,
    messageId,
    ScrollViewManager.getContentSize,
    contentHeightWithKeys,
  ]);

  const DisplayMessageList = ({ message }) => {
    return (
      <React.Fragment>
        <Contents>
          <Text style={{ fontSize: 16 }}>{message.content}</Text>
        </Contents>
        <Timestamp>
          <Text> {moment(message.createdAt).format('LT')}</Text>
        </Timestamp>
        {openModal && message.id === messageId && (
          <List
            onClick={() => setOpenModal(false)}
            component='nav'
            className={classes.listItem}
            aria-label='mailbox folders'
          >
            <ListItem button>
              <ListItemText
                primary='Delete'
                onClick={() => handleDelete(messageId)}
              />
            </ListItem>
          </List>
        )}
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <ScrollView
        ref={setRef}
        contentInset={{
          bottom: 10,
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setContentHeight((contentHeight + contentWidth) * 2);
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 1,
          autoscrollToTopThreshold: contentHeightWithKeys,
        }}
        keyboardShouldPersistTaps='always'
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          // scrollEnabled={false}
           
        >
          {messages.map((message) =>
            !message.isMine ? (
              <View key={message.id} style={styles.yoursContainer}>
                <DisplayMessageList message={message} />
              </View>
            ) : (
              <View key={message.id} style={styles.container}>
                <DisplayMessageList message={message} />
              </View>
            )
          )}
        </KeyboardAwareScrollView>
      </ScrollView>
      <MessageInput
        onSendMessage={onSendMessage}
        setContentHeightWithKeys={setContentHeightWithKeys}
      />
    </React.Fragment>
  );
};

export default MessageList;

const commonStyle = {
  marginTop: 5,
  marginBottom: 5,
  padding: 20,
  paddingTop: 10,
  paddingLeft: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    flex: 1,
    position: 'relative',
    left: 75,
    backgroundColor: '#dcf8c6',
    ...commonStyle,
  },
  yoursContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '80%',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFF',
    ...commonStyle,
  },
});
