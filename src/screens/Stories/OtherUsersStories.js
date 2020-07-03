import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/style';

const OtherUserStories = (props) => {
  const {
    user: { image, first_name, time, id, date },
  } = props;
  const isHideBottom = props.isHideBottom || false;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.avatar, props.ImageStyle && { ...props.ImageStyle }]}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, props.TitleStyle && { ...props.TitleStyle }]}
          numberOfLines={1}
        >
          {first_name}
        </Text>
        <Text style={[styles.time, props.TimeStyle && { ...props.TimeStyle }]}>
        {date} {time}
        </Text>
      </View>
      {!isHideBottom && <View style={styles.bottomBorder} />}
    </View>
  );
};

export default OtherUserStories;
