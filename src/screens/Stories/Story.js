import React, { Component } from 'react';
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
import Axios from 'axios';
import Carousel from 'react-native-banner-carousel';
import OtherUserStories from './OtherUsersStories';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height * 0.8;

class Story extends Component {
  state = {
    currentIndex: -1,
    noOfStories: 10,
    stories: [],
    isLoading: true,
    modalVisible: false,
    storiesViewedBy: [],
  };
  setModalVisible = () => {
    this.setState((pre) => ({ ...pre, modalVisible: !pre.modalVisible }));
    // if (this.state.modalVisible) {
    const { allUsers } = this.props;
    const { currentIndex } = this.state;
    const activeStory = this.state.stories[currentIndex].viewedBy;
    console.log('TCL: Story -> renderViewedBy -> allUsers', allUsers);
    const viewedUsers = allUsers.filter((user) =>
      activeStory.includes(user.id)
    );
    this.setState({ storiesViewedBy: viewedUsers });
    // }
  };

  renderPage = (story, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState((pre) => ({
            ...pre,
            currentIndex:
              pre.currentIndex === pre.noOfStories ? 0 : pre.currentIndex + 1,
          }));
          this._carousel.gotoPage(this.state.currentIndex);
          this.interval();
        }}
      >
        <View key={index} style={[story.title && { position: 'relative' }]}>
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
                {story.title}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  componentDidMount = async () => {
    this.setState((pre) => ({ ...pre, currentIndex: pre.currentIndex + 1 }));

    try {
      if (this.setState.isLoading) {
        Axios.get(WHATSAPP_CONTACTS_API).then((response) => {
          let stories = response.data;
          this.setState({
            noOfStories: stories.size,
            stories,
            isLoading: false,
          });
          this.interval();
        });
      }
    } catch (error) {
      console.log('TCL: Story -> componentDidMount -> error', error);
    }
  };

  interval = () => {
    if (this.clearTimeOut) clearTimeout(this.clearTimeOut);
    this.clearTimeOut = setTimeout(() => {
      const { currentIndex, noOfStories } = this.state;
      console.log('firing ===>', currentIndex);
      if (Number(currentIndex) === Number(noOfStories) - 1) {
        console.log('clearing Timeout');
        clearTimeout(this.clearTimeOut);
      } else {
        this.setState((pre) => ({
          ...pre,
          currentIndex: pre.currentIndex + 1,
        }));
        if (this._carousel) {
          this._carousel.gotoPage(this.state.currentIndex);
        }
        console.log(
          'TCL: Story -> clearTimeOut -> this.state.currentIndex',
          this.state.currentIndex
        );
      }
    }, 6000);
  };
  pauseSlider = () => {
    clearTimeout(this.clearTimeOut);
  };

  onPageChanged = async (index) => {
    const activeStory = this.state.stories[index];
    this.setState({ currentIndex: index });
    this.interval();
    const alreadyViewed = activeStory.viewedBy.filter(
      (userId) => userId === this.props.userId
    );
    console.log('TCL: Story -> alreadyViewed', alreadyViewed);
    if (alreadyViewed.length) {
      console.log('Already Viewd');
      return;
    }
    // try {
    //   console.log('adding user id to viewdBy');
    //   await firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(this.props.id)
    //     .collection('stories')
    //     .doc(activeStory.id)
    //     .set(
    //       {
    //         viewedBy: [...activeStory.viewedBy, this.props.userId],
    //       },
    //       { merge: true }
    //     );
    // } catch (error) {
    //   console.log('TCL: Story -> error', error);
    // }
  };

  render() {
    const imageURL = 'https://picsum.photos/200/300?random=';
    const { currentIndex, noOfStories, isLoading, stories } = this.state;
    if (isLoading)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      );

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TopBar
              index={currentIndex}
              totalStories={noOfStories}
              isLast={currentIndex === noOfStories - 1}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Carousel
              ref={(ref) => (this._carousel = ref)}
              autoplay={false}
              // autoplayTimeout={10000}
              loop={false}
              // index={0}
              pageSize={BannerWidth}
              onPageChanged={this.onPageChanged}
              index={currentIndex === -1 ? 0 : currentIndex}
              showsPageIndicator={false}
            >
              {stories &&
                stories.map((story, index) => this.renderPage(story, index))}
            </Carousel>
          </View>
        </View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
            this.interval();
          }}
        >
          <ScrollView>
            <View style={styles.viewedBy}>
              <Text style={{ fontSize: 18 }}>Viewed By</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.interval();
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
            {this.state.storiesViewedBy.map((user) => (
              <OtherUserStories user={{ ...user }} />
            ))}
          </ScrollView>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Story;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#000',
  },
  topContainer: {
    height: height * 0.18,
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
    marginTop: StatusBar.currentHeight,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
