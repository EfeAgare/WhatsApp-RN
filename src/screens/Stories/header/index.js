import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import OtherUserStories from '../OtherUsersStories';

const StoriesHeader = (props) => {
  const { user, views, viewsOnPress } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.goBack} style={styles.backContainer}>
        <Ionicons name='md-arrow-back' size={32} color='#fff' />
      </TouchableOpacity>
      <View style={styles.center}>
        <OtherUserStories
          user={user}
          isHideBottom={true}
          ImageStyle={styles.avatarImage}
          TitleStyle={styles.avatarTitle}
          TimeStyle={styles.avatarTime}
          disabled={true}
        />
      </View>
      {user.id === 1 && (
        <TouchableOpacity
          onPress={() => viewsOnPress()}
          style={styles.moreOption}
        >
          <Text style={{ color: '#fff', marginRight: 5 }}>{views}</Text>
          <Ionicons name='md-eye' size={18} color='#fff' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StoriesHeader;
