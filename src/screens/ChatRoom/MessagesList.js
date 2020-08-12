import moment from 'moment';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import deleteMessageSubscription from '../../graphQl/subscriptions/deleteMessage.subscription';
import { useMutation } from '@apollo/react-hooks';
import deleteMessageMutation from '../../graphQl/mutations/deleteMessage.mutation';
import { Text, StyleSheet,  View } from 'react-native';

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

const MessageList = ({ messages, chatId, subscribeToMore }) => {
  const classes = useStyles();
  const selfRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [messageId, setMessageId] = useState(null);

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

  useEffect(() => {
    if (!selfRef.current) return;

    messageDeleteSubscription(messageId);
    selfRef.current.scrollTo({
      x: messages.length,
      y: messages.length,
      animated: true,
    });

    return () => {};
  }, [messages.length, messageDeleteSubscription, messageId]);

  const DisplayMessageList = ({ message }) => {
    return (
      <React.Fragment>
        <Contents>
          <Text style={{fontSize: 16}}>{message.content}</Text>
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
    <ScrollView ref={selfRef}>
      {messages.map((message) => message.isMine ?

        <View
          key={message.id}
          style={styles.yoursContainer}
        >
          <DisplayMessageList message={message} />
        </View> : <View
          key={message.id}
          style={styles.container}
        >
          <DisplayMessageList message={message} />
        </View>
      )}
    </ScrollView>
  );
};

export default MessageList;

const  commonStyle =  {
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: "80%",
    flex: 1,
    position: 'relative',
    left: 75,
    backgroundColor: '#dcf8c6',
    ...commonStyle
  },
  yoursContainer: {
    flexDirection: 'row',
    flex: 1,
    width: "80%",
    justifyContent: 'flex-start',
    backgroundColor: '#FFFF',
    ...commonStyle
  }
});
