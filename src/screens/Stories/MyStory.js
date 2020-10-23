import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const MyStory = (props) => {

  
  const { user, hasStories, allUsers } = props;

  const { image, first_name, time, id, date } = user;

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('StoryScreen', {
          id: id,
          user,
          allUsers,
        })
      }
    >
      <View style={styles.container}>
        <View
          style={[
            styles.imageContainer,
            hasStories && styles.imageContainerActive,
          ]}
        >
          <Image
            source={{
              uri: image,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {first_name}
          </Text>
          <Text style={styles.time}>
            {date} {time}
          </Text>
        </View>
        <View style={styles.icon}>
          <Ionicons name='md-more' size={32} color='#c31432' />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyStory;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imageContainer: {
    padding: 2.5,
    borderRadius: 100,
    marginRight: 5,
  },
  imageContainerActive: {
    borderWidth: 2,
    borderColor: '#ccc',
  },
  avatar: {
    width: width * 0.2,
    height: width * 0.2,
    maxWidth: 70,
    maxHeight: 70,
    borderRadius: 100,
  },
  titleContainer: {
    flexGrow: 1,
    paddingLeft: 5,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  time: {
    fontSize: width * 0.04,
    color: 'gray',
    paddingTop: 10,
  },
  icon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
});
