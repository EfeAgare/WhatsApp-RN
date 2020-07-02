import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import moment from 'moment';
import { chats } from '../../db/db';

const FlatListItem = ({ item }) => {
  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flexDirection: 'row', flex: 1, marginBottom: 20 }}>
        <Image
          source={{ uri: item.picture }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100 / 2,
            margin: 5,
            paddingTop: 10,
          }}
        ></Image>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#C0C0C0',
            paddingRight: 10,
          }}
        >
          <View style={styles.chatInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.content}>{item.lastMessage.content}</Text>

            <Text style={styles.dateContainer}>
              {moment.utc(item.lastMessage.createdAt).local().format('HH:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const ChatListScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FlatListItem item={item} />}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  chatInfo: {
    flexDirection: 'column',
    fontSize: 20,
    padding: 10,
    flex: 1,
  },
  name: {
    marginTop: -5,
    fontSize: 20,
  },
  content: {
    color: 'gray',
    fontSize: 20,
    marginTop: 5,
    overflow: 'hidden',
  },
  dateContainer: {
    color: 'gray',
    paddingTop: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
