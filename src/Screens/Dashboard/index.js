import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Buyer from './componnet/Buyer';
import Vendor from './componnet/Vendor';
import {styles} from './styles';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {TabView,SceneMap} from 'react-native-tab-view';

const Dashboard = ({navigation}) => {
  const layout = useWindowDimensions();
  const [ouradddlist, setAdddList] = useState('');
  const [user, setUser] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setUser(auth().currentUser);
      await onValue(ref(db, 'addLists/' + user.uid),snapshot => {
        if (snapshot.val()) {
          const add_list_fb = snapshot.val().addList;
          setAdddList(add_list_fb);
        }else{
            console.log("error")
        }
      });
    };
    getData();
  }, [user]);
  
  const [routes] = useState([
    {key: 'first', title: 'Products'},
    {key: 'second', title: 'Add Products'},
  ]);

  const FirstRoute = () => (
    <Buyer parentToChild={index} />
  );
  
  const SecondRoute = () => (
    <Vendor  parentToChild={index}  />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin_screen')}
          activeOpacity={0.5}>
          <Image
            style={styles.img}
            source={require('../../Assests/Images/login.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headertext}></Text>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.5}>
          <Image
            style={styles.img}
            source={require('../../Assests/Images/cartt.png')}
          />
           <View style={styles.pill}><Text style={styles.textpill}>{ouradddlist.length}</Text></View>
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};
export default Dashboard;
