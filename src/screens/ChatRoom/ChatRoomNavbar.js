import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { chatRemovedSubscription } from '../../graphQl/subscriptions/index';
import { Container } from '../common/ContainerStyle';
import { ScrollView } from 'react-native';

const Picture = styled.Image`
  height: 40px;
  width: 40px;
  margin-top: 3px;
  margin-left: -22px;
  object-fit: cover;
  padding: 5px;
  border-radius: 50%;
`;

const Name = styled.View`
  line-height: 56px;
`;

const Rest = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled(Button)`
  color: white !important;
`;

export const removeChatMutation = gql`
  mutation RemoveChat($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`;

const ChatRoomNavBar = ({ chat, history, subscribeToMore }) => {
  const [removeChat] = useMutation(removeChatMutation);

  const handleRemoveChat = useCallback(() => {
    removeChat({
      variables: {
        chatId: chat.id,
      },
    }).then(() => {
      history.replace('/chats');
    });
  }, [removeChat, history, chat.id]);

  const subscribe = useCallback(() => {
    subscribeToMore({
      document: chatRemovedSubscription,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.chatRemoved) return prev.chat;
        return {
          chat: {
            ...prev.chat,
          },
        };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    let unsubscribe;

    if (!unsubscribe) {
      unsubscribe = subscribe();
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribe]);

  const navBack = useCallback(() => {
    history.replace('/chats');
  }, [history]);

  return (
    <Container>
      {chat && chat.picture && chat.name && (
        <React.Fragment>
          <Picture data-testid='chat-picture' src={chat.picture} />
          <Name data-testid='chat-name'>{chat.name}</Name>
        </React.Fragment>
      )}
    </Container>
  );
};

export default ChatRoomNavBar;
