import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FAB from '../Common/FAB';
import StoriesPage from '../Stories/Stories';

const StatusScreen = ({ navigation, route }) => {
  return (
    <View>
       
      <StoriesPage navigation={navigation} />
      <FAB
        navigation={navigation}
        route={route}
        color={true}
        navigateTo='StatusInput'
      />
      <FAB
        navigation={navigation}
        route={route}
        color={false}
        navigateTo='StatusUpload'
      />
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({});

// function HomeScreen({ navigation }) {
//   const [count, setCount] = React.useState(0);

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={() => setCount((c) => c + 1)} title='Update count' />
//       ),
//     });
//   }, [navigation]);

//   return <Text>Count: {count}</Text>;
// }

// export default HomeScreen;
