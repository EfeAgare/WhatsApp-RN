import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/37.jpg',
  'https://randomuser.me/api/portraits/women/13.jpg',
];

const StatusUpload = () => {
  const renderPage = (image, index) => {
    return (
      <View key={index}>
        <Image
          style={{
            width: 400,
            height: 400,
            borderRadius: 400,
          }}
          source={{ uri: image }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}
      >
        {images.map((image, index) => renderPage(image, index))}
      </Carousel>
    </View>
  );
};

export default StatusUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
