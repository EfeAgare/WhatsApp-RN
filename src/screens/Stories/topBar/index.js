import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  ProgressBarAndroid,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const TopBar = ({ index, totalStories, isLast }) => {
  const [noOfProgress, setNoOfProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      updateNoOfProgress();
      setLoaded(true)
    }
    return () => {};
  }, [loaded, index, totalStories, isLast]);

  const updateNoOfProgress = () => {
    const duration = 60;
    setNoOfProgress(0);
    const interVal = setInterval(() => {
      if (noOfProgress === 100) {
        clearInterval(interVal);
      } else {
        setNoOfProgress(noOfProgress + 1);
      }
    }, duration);
  };

  return (
    <View style={styles.container}>
      {[...Array(totalStories).keys()].map((story, index) => (
        <View
          style={[
            styles.single,
            { width: Math.floor(width / totalStories) - totalStories },
          ]}
          key={index}
        >
          <ProgressBarAndroid
            styleAttr='Horizontal'
            indeterminate={false}
            // progress={
            //   !(index >= currentIndex)
            //     ? 1
            //     : index === currentIndex
            //     ? noOfProgress / 100
            //     : 0
            // }
            // style={styles.bar}
            color='#FFF'
          />
        </View>
      ))}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    width,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  bar: { transform: [{ scaleX: 1.0 }, { scaleY: 1 }], height: height * 0.02 },
  single: { marginLeft: 1 },
});
