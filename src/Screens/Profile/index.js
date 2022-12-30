import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import { colors} from '../../styles/variables';

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

  const signOut = () => {
    auth().signOut().then(()=>{
      navigation.navigate("intro_screen")
    }).catch(()=>{
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
      
        var singleData = records.filter(i => i.key == user.uid);
   
        setFiredata(singleData[0].data);
      });
    }
  }, [user]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.userInfoStyle}>
      <Text style={styles.ml}>{item.label}</Text>
      <IonIcon name="caret-forward-outline" size={25} color={colors.black}></IonIcon>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <Text style={styles.profilealign}>Profile</Text>
        {user?<TouchableOpacity onPress={signOut} activeOpacity={0.5}>
         <Image style={styles.img} source={require('../../Assests/Images/power-off.png')}/>
        </TouchableOpacity>:<TouchableOpacity onPress={()=>navigation.navigate('Signin_screen')} activeOpacity={0.5}>
         <Image style={styles.img} source={require('../../Assests/Images/loginuser.png')}/>
        </TouchableOpacity>
        }
       
       
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Image source={{uri:user?`${Firedata.photoURL}`:"http://glplaw.com/wp-content/uploads/2021/03/2.png"  }} style={styles.logo} />
          <View style={styles.usernameInfo}>
            <Text style={styles.title}>{user ?Firedata.userName:<Text> guest</Text> }</Text>
          </View>
        </View>
    {user&&
 <View style={styles.userEmailStyle}>
 <IonIcon name="mail" size={25} color="black"></IonIcon>
 <Text style={styles.emailTitle}>{Firedata.email}</Text>
</View>
    }
        <View style={styles.userRenderStyle}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};
export default Profile;
