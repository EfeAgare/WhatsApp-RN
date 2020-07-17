import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
} from 'react-native';

import TopBar from './topBar';
import Carousel from 'react-native-banner-carousel';
import OtherUserStories from './OtherUsersStories';
import StoriesHeader from './header/index';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height * 0.8;

const { width, height } = Dimensions.get('window');

const ShowStory = (props) => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noOfStories, setNoOfStories] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [storiesViewedBy, setStoriesViewedBy] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { allUsers, navigation } = props;

  const receiveData = () => {
    const userStories = allUsers.map((user) => user.stories);
    setStories(userStories.flat().slice(0, 10));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      receiveData();
    }
    return () => {
      if (Number(currentIndex) === Number(stories.length) - 1) {
        navigation.navigate('Status');
        setStories([]);
        return;
      }
    };
  }, [receiveData, loaded, setStories, navigation, stories, currentIndex]);

  const userModalShow = () => {
    setModalVisible(!modalVisible);

    const activeStory = stories[currentIndex].viewedBy;

    const viewedUsers = allUsers.filter((user) =>
      activeStory.includes(user.id)
    );
    setStoriesViewedBy(viewedUsers);
  };

  goBackAndClearStore = () => {
    navigation.navigate('Status');
    setStories([]);
  };

  const renderPage = (story, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setCurrentIndex({
            currentIndex: currentIndex === noOfStories ? 0 : currentIndex + 1,
          });
          carousel.gotoPage(currentIndex);
        }}
      >
        <View
          key={index}
          style={[story.first_name && { position: 'relative', paddingTop: 40 }]}
        >
          <Image
            style={{
              width: BannerWidth,
              height: BannerHeight,
              resizeMode: 'contain',
            }}
            source={{ uri: story.image }}
          />
          {story.title && (
            <View
              style={[
                styles.overlayContainer,
                {
                  width: BannerWidth,
                  height: BannerHeight,
                },
              ]}
            >
              <Text style={styles.overlayText} numberOfLines={3}>
                {story.message}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const onPageChanged = async (index) => {
    const activeStory = stories[index];
    setCurrentIndex(index);

    const alreadyViewed = activeStory?.viewedBy.filter((userId) => userId === 1);
    console.log('TCL: Story -> alreadyViewed', alreadyViewed);
    console.log('index', index);

    if (alreadyViewed.length) {
      console.log('Already Viewed');
      return;
    }
  };

  if (!loaded)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    );

  return (
    <React.Fragment>
      <View style={styles.container}>
      <TopBar
            index={currentIndex}
            totalStories={stories.length}
            isLast={currentIndex === stories.length - 1}
          />
        <View style={styles.topContainer}>
          <StoriesHeader
            goBack={() => goBackAndClearStore()}
            user={props.user}
            views={
              stories[currentIndex] &&
              stories[currentIndex].viewedBy &&
              stories[currentIndex].viewedBy.length
            }
            viewsOnPress={userModalShow}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Carousel
            ref={(ref) => (carousel = ref)}
            pageSize={BannerWidth}
            onPageChanged={onPageChanged}
            index={currentIndex === 0 ? 0 : currentIndex}
            showsPageIndicator={false}
          >
            {stories && stories.map((story, index) => renderPage(story, index))}
          </Carousel>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ScrollView>
          <View style={styles.viewedBy}>
            <Text style={{ fontSize: 18 }}>Viewed By</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          {storiesViewedBy.map((user) => (
            <OtherUserStories user={{ ...user }} key={user.id} />
          ))}
        </ScrollView>
      </Modal>
    </React.Fragment>
  );
};

export default ShowStory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  topContainer: {
    height: 100,
  },
  bottomContainer: {
    width,
    height: height * 0.92,
  },
  loading: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
  },
  viewedBy: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});
