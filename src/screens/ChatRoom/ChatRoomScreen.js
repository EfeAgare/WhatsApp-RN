import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { getChatQuery } from '../../graphQl/queries/chat.query';
import { addMessageMutation } from '../../graphQl/mutations/addMessage.mutation';
import { messageAddedSubscription } from '../../graphQl/subscriptions';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { CommonHeader } from '../Common/Header';

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
    return subscribeToMore({
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
  }, [subscribeToMore, chatId, messageAddedSubscription]);

  useEffect(() => {
    subscribe();
    return () => {};
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

  const ContactTitle = ({ name, picture, navigation }) => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 6, flexDirection: 'row', paddingRight: 120 }}>
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
              <Icon
                name='arrow-left-bold'
                size={24}
                type='material-community'
                color='#FFF'
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingRight: 10 }}>
            <Image
              source={{ uri: picture }}
              style={{ width: 50, height: 50, borderRadius: 25, paddingTop: 2 }}
            />
          </View>
          <View style={{ paddingBottom: 2 }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                paddingBottom: 3,
                fontWeight: 'bold',
              }}
            >
              {name}
            </Text>
            <Text style={{ color: '#FFF' }}>online</Text>
          </View>
        </View>
        <CommonHeader show={true} />
      </View>
    );
  };

  if (chat.name) {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#075e54',
        height: 110,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        padding: 10,
      },
      headerTruncatedBackTitle: '',
      headerLeft: (props) => (
        <ContactTitle
          {...props}
          name={chat.name}
          picture={chat.picture}
          navigation={navigation}
        />
      ),
    });
  }

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const ref1 = React.createRef();

  return (
    <Container source={require('../../images/assets/chat-background.jpg')}>
      {chat?.messages && (
        <MessagesList
          messages={chat.messages}
          chatId={chatId}
          subscribeToMore={subscribeToMore}
          onSendMessage={onSendMessage}
          setRef={ref1}
        />
      )}

      {/* <MessageInput onSendMessage={onSendMessage} /> */}
    </Container>
  );
};

export default ChatRoomScreen;
