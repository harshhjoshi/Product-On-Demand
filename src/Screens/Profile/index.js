import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {colors, responsiveWidth} from '../../styles/variables';

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

  const getData = async () => {
    await setUser(auth().currentUser);
    if (user) {
      console.log('user come');
      await onValue(ref(db, 'users/' + user.uid), snapshot => {
        if (snapshot.val()) {
          setFiredata(snapshot.val());
        }
      });
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed Data');
      getData();

      //Your refresh code gets here
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  useEffect(() => {
    console.log('frist useefect');

    getData();
  }, [user]);

  const UsersignOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        navigation.navigate('intro_screen');
      })
      .catch(() => {
        navigation.navigate('Signin_screen');
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.userInfoStyle}>
      <Text style={styles.ml}>{item.label}</Text>
      <IonIcon
        name="caret-forward-outline"
        size={25}
        color={colors.black}
      ></IonIcon>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profilealign}>Profile</Text>
        {user ? (
          <TouchableOpacity
            style={{left: responsiveWidth(25)}}
            onPress={() => UsersignOut()}
          >
            <Image
              style={styles.img}
              source={require('../../Assests/Images/power-off.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{left: responsiveWidth(30)}}
            onPress={() => navigation.navigate('Signin_screen')}
            activeOpacity={0.5}
          >
            <Image
              style={styles.img}
              source={require('../../Assests/Images/loginuser.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Image
            source={{
              uri: user
                ? `${Firedata.photoURL}`
                : 'http://glplaw.com/wp-content/uploads/2021/03/2.png',
            }}
            style={styles.logo}
          />
          <View style={styles.usernameInfo}>
            <Text style={styles.title}>
              {user ? Firedata.userName : <Text> guest</Text>}
            </Text>
          </View>
        </View>
        {user && (
          <View style={styles.userEmailStyle}>
            <IonIcon name="mail" size={25} color="black"></IonIcon>
            <Text style={styles.emailTitle}>{Firedata.email}</Text>
          </View>
        )}
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
