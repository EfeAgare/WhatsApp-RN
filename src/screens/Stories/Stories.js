import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import MyStory from './MyStory';
import HrWithText from '../hrWithText/index';
import OtherUsersStory from './OtherUsersStories';
import Axios from 'axios';
import { dateIsWithIin24Hours, dateFormatter } from '../Common//Helper';
import { WHATSAPP_CONTACTS_API } from '../../db/api';

const StoriesPage = (props) => {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUser] = useState([]);
  const [filterUsers, setFilterUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const receiveData = () => {
    Axios.get(WHATSAPP_CONTACTS_API)
      .then((response) => {
        let tempUser = response.data;
        const user = tempUser.find((user) => user.id === 1);
        const allUsers = tempUser.filter((user) => user.id !== 1);
        const filterUsers = allUsers.filter((user) =>
          dateIsWithIin24Hours(user.date)
        );
        setFilterUser(filterUsers);
        setUser(user);
        setAllUser(allUsers);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoaded) {
      receiveData();
    }

    return () => {};
  }, [receiveData, isLoaded]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerWithPadding}>
          {Object.entries(user).length !== 0 && (
            <MyStory
              key={user.id}
              hasStories={dateIsWithIin24Hours(user.date)}
              user={user}
              allUsers={allUsers}
              navigation={props.navigation}
            />
          )}
        </View>
        <HrWithText text={`Recent updates`} />
        <View style={styles.containerWithPadding}>
          {filterUsers &&
            filterUsers.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() =>
                  props.navigation.navigate('StoryScreen', {
                    uid: user.id,
                    user,
                  })
                }
              >
                <OtherUsersStory key={user.id} user={user} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default StoriesPage;

const styles = StyleSheet.create({
  containerWithPadding: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
