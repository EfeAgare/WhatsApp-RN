import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { WHATSAPP_CONTACTS_API } from '../../db/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FlatListItem = ({ person }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 20 }}>
          <Image
            source={{ uri: person.image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
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
              <Text style={styles.name}>{person.first_name}</Text>
              <View style={styles.content}>
                <Text style={{ color: 'gray' }}>{person.message}</Text>
              </View>
              <Icon
                name='phone'
                color='#075e54'
                size={23}
                style={styles.dateContainer}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContactScreen = ({ route, navigation }) => {
  const [contactData, setContactData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const receiveData = () => {
    setContactData(WHATSAPP_CONTACTS_API);
    setLoaded(true);
    // console.log('response.data', response.data);
  };

  useEffect(() => {
    if (!loaded) {
      receiveData();
    }
    return () => {};
  }, [receiveData, loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Retrieving Contacts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contactData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FlatListItem person={item} route={route} />}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
    paddingTop: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
