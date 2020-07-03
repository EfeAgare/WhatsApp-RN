import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FAB from '../Common/FAB';


const StatusScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Text>Status Screen</Text>
      <FAB navigation={navigation} route={route} color={true} navigateTo="WriteStatus"/>
      <FAB navigation={navigation} route={route} color={false} navigateTo="UploadStatus"/>
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