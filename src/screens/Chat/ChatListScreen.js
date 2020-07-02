import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import moment from 'moment';
import { chats } from '../../db/db';
import FAB from '../Common/FAB';
import { Icon } from 'react-native-material-ui';

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
            <View style={styles.content}>
              <Icon
                name='done-all'
                color={true ? '#075e54' : '#777'}
                size={15}
                style={{ padding: 0 }}
              />
              <Text style={{ color: 'gray', paddingLeft: 10 }}>
                {item.lastMessage.content}
              </Text>
            </View>

            <Text style={styles.dateContainer}>
              {moment.utc(item.lastMessage.createdAt).local().format('HH:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const ChatListScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FlatListItem item={item} />}
      />
      <FAB navigation={navigation} route={route} color={false} />
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
    marginTop: 5,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateContainer: {
    color: 'gray',
    paddingTop: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});