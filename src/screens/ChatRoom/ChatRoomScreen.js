import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import MessagesList from './MesagesList';
// import ChatRoomNavBar from './ChatRoomNavbar';
import MessageInput from './MessageInput';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getChatQuery } from '../../graphQl/queries/chat.query';
import { addMessageMutation } from '../../graphQl/mutations/addMessage.mutation';
import { messageAddedSubscription } from '../../graphQl/subscriptions';

const Container = styled.ImageBackground`
  height: 100%;
`;

const ChatRoomScreen = ({
  route: {
    params: { chatId },
  },
  navigation,
}) => {

  const { data, loading, subscribeToMore } = useQuery(getChatQuery, {
    variables: { chatId: chatId },
    fetchPolicy: 'cache-and-network',
  });

  const subscribe = useCallback(() => {
    subscribeToMore({
      document: messageAddedSubscription,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.messageAdded) return prev.chat;
        const addedMessage = {
          ...subscriptionData.data.messageAdded,
          chat: {
            id: chatId,
            __typename: 'Chat',
          },
        };
        return {
          chat: {
            ...prev.chat,
            messages: [...prev.chat.messages, addedMessage],
          },
        };
      },
    });
  }, [subscribeToMore, chatId]);

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

  const [addMessage] = useMutation(addMessageMutation);

  const onSendMessage = useCallback(
    (content) => {
      if (data === undefined) {
        return null;
      }
      const chat = data.chat;
      if (chat === null) return null;
      addMessage({
        variables: { chatId: chatId, content },
        optimisticResponse: {
          __typename: 'Mutation',
          addMessage: {
            __typename: 'Message',
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            isMine: true,
            content,
            chat: {
              id: chatId,
              __typename: 'Chat',
            },
          },
        },
      });
    },
    [data, chatId, addMessage]
  );

  if (data === undefined) {
    return null;
  }
  const chat = data.chat;
  const loadingChat = loading;

  if (loadingChat) return null;
  if (chat === null) return null;


  return (
    <Container source={require('../../images/assets/chat-background.jpg')}>
      {chat?.messages && (
        <MessagesList
          messages={chat.messages}
          chatId={chatId}
          subscribeToMore={subscribeToMore}
        />
      )}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
