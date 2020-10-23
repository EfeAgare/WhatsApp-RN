import React from 'react';
import ShowStory from './ShowStory';
import {WHATSAPP_CONTACTS_API} from '../../db/api';

const StoryScreen = ({ navigation, route }) => {

  // const [contactData, setContactData] = useState([]);
  // const [loaded, setLoaded] = useState(false);

  // console.log("contactData", contactData)
  // const receiveData = () => {
  //   setContactData(WHATSAPP_CONTACTS_API);
  //   setLoaded(true);
  //   // console.log('response.data', response.data);
  // };

  // useEffect(() => {
  //   if (!loaded) {
  //     receiveData();
  //   }
  //   return () => {};
  // }, [receiveData, loaded]);

  // console.log("contactData", contactData)

  return (
    <ShowStory
      id={route.params.id}
      user={route.params.user}
      allUsers={route.params.allUsers || []}
      navigation={navigation}
    />
  );
};

export default StoryScreen;
