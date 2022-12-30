import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import { colors, fontFamily } from '../../styles/variables';

const data = [
  {
    id: 1,
    label: 'Your Favorites',
    icon: 'heart',
    flag: false,
  },
  {
    id: 2,
    label: 'Location',
    icon: 'navigate',
    flag: false,
  },
  {
    id: 3,
    label: 'Language',
    icon: 'globe',
    flag: false,
  },
  {
    id: 4,
    label: 'Tell your Friend',
    icon: 'people',
    flag: false,
  },
  {
    id: 5,
    label: 'About US',
    icon: 'information-circle',
    flag: false,
  },
  {
    id: 6,
    label: 'Terms and Policies',
    icon: 'document',
    flag: false,
  },
];
const Profile = ({navigation}) => {
  const [Firedata, setFiredata] = useState(' ');
  const [user, setUser] = useState('');
  const [newdata, setdata] = useState(data);
  const signOut = () => {

    auth().signOut().then(()=>{
      console.log("sucess");
      navigation.navigate("intro_screen")
    }).catch((err)=>{
     console.log(err);
     navigation.navigate("Signin_screen")
     
    })
      
  };
  function onAuthStateChanged(user) {
    setUser(user);
  }
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    if (user) {
      const dbRef = ref(db, 'users/');
      onValue(dbRef, snapshot => {
        let records = [];
        snapshot.forEach(childSnapshot => {
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          records.push({key: keyName, data: data});
        });
        console.log('records', user);
        var singleData = records.filter(i => i.key == user.uid);
        console.log('singleData...', singleData);
        setFiredata(singleData[0].data);
      });
    }
  }, [user]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.userInfoStyle}>
     {/*<IonIcon name={item.icon} size={25}></IonIcon> */}
      <Text style={styles.ml}>{item.label}</Text>
      <IonIcon name="caret-forward-outline" size={25} color={colors.black}></IonIcon>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={{alignSelf:'center',left:10}}>
          <IonIcon name="arrow-back" size={30} color="black" ></IonIcon>
        </TouchableOpacity>
        <Text style={styles.profilealign}>Profile</Text>
        <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
         <Image style={styles.img} source={require('../../Assests/Images/power-off.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Image source={{uri: `${Firedata.photoURL}`}} style={styles.logo} />
          <View style={styles.usernameInfo}>
            <Text style={styles.title}>{Firedata.userName}</Text>
            <Text style={{fontFamily:fontFamily.medium}}>Seller</Text>
          </View>
        </View>

        <View style={styles.userEmailStyle}>
          <IonIcon name="mail" size={25} color="black"></IonIcon>
          <Text style={styles.emailTitle}>{Firedata.email}</Text>
        </View>
        <View style={styles.userRenderStyle}>
          <FlatList
            data={newdata}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};
export default Profile;
