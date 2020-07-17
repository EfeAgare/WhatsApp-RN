import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ProgressBarAndroid,
} from 'react-native';
import FAB from '../Common/FAB';
import Axios from 'axios';
import { WHATSAPP_CALLS_API } from '../../db/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FlatListItem = ({ person }) => {
  return (
    // <TouchableOpacity onPress={() => {}}>
    //   <View
    //     style={{
    //       flexDirection: 'column',
    //       flex: 1,
    //       paddingHorizontal: 10,
    //     }}
    //   >
    //     <View style={{ flexDirection: 'row', flex: 1, marginBottom: 20 }}>
    //       <Image
    //         source={{ uri: person.image }}
    //         style={{
    //           width: 50,
    //           height: 50,
    //           borderRadius: 100 / 2,
    //           margin: 5,
    //           paddingTop: 10,
    //         }}
    //       ></Image>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           flex: 1,
    //           borderBottomWidth: 1,
    //           borderBottomColor: '#C0C0C0',
    //           paddingRight: 10,
    //         }}
    //       >
    //         <View style={styles.chatInfo}>
    //           <Text style={styles.name}>{person.first_name}</Text>
    //           <View style={styles.content}>
    //             <Icon
    //               name={person.missed ? 'call-missed' : 'call-received'}
    //               size={15}
    //               color={person.missed ? '#ed788b' : '#075e54'}
    //             />
    //             <Text style={{ color: 'gray', paddingLeft: 10 }}>
    //               {person.date} {person.time}
    //             </Text>
    //           </View>

    //           <Icon
    //             name='phone'
    //             color='#075e54'
    //             size={23}
    //             style={styles.dateContainer}
    //           />
    //         </View>
    //       </View>
    //     </View>
    <ProgressBarAndroid
    styleAttr="Horizontal"
    progress={0.5}
  />
      /* </View>
    </TouchableOpacity> */
  );
};

const CallScreen = ({ navigation, route }) => {
  const [callData, setCallData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const receiveData = () => {
    setCallData(WHATSAPP_CALLS_API);
    setLoaded(true);
    // console.log(response.data);
  };

  useEffect(() => {
    if (!loaded) {
      receiveData();
    }
    return () => {};
  }, [receiveData, loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Retrieving Contacts...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={callData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FlatListItem person={item} />}
      />
      <FAB
        navigation={navigation}
        route={route}
        color={false}
        navigateTo='Contact'
      />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInfo: {
    flexDirection: 'column',
    fontSize: 20,
    padding: 10,
    flex: 1,
  },
  name: {
    marginTop: -5,
    fontSize: 20,
  },
  content: {
    color: 'gray',
    marginTop: 5,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateContainer: {
    paddingTop: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
