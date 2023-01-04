import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';

import {ThemeContext} from '../../ThemeContext';
import {
  colors,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../styles/variables';

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
  const {theme, setTheme} = useContext(ThemeContext); 

  const handleThemeChange = () => {
    console.log('thmese is sos ', theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    console.log('thmese is sos ', theme);
  });

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
      <Text style={theme == 'light' ? styles.ml : styles.ml_dark}>
        {item.label}
      </Text>
      <IonIcon
        name="caret-forward-outline"
        size={25}
        color={theme == 'light' ? colors.black : colors.HARD_WHITE}
      ></IonIcon>
    </TouchableOpacity>
  );

  return (
    <View style={theme == 'light' ? styles.container : styles.container_dark}>
      <View style={theme == 'light' ? styles.header : styles.header_dark}>
        <Text
          style={
            theme == 'light' ? styles.profilealign : styles.profilealign_dark
          }
        >
          Profile
        </Text>
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
      <View
        style={
          theme == 'light' ? styles.mainContainer : styles.mainContainer_dark
        }
      >
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
            <Text style={theme == 'light' ? styles.title : styles.title_dark}>
              {user ? Firedata.userName : <Text> guest</Text>}
            </Text>
          </View>
        </View>
        {user && (
          <View style={styles.userEmailStyle}>
            <IonIcon name="mail" size={25} color={theme=='light'?colors.black:colors.white}></IonIcon>
            <Text
              style={
                theme == 'light' ? styles.emailTitle : styles.emailTitle_dark
              }
            >
              {Firedata.email}
            </Text>
          </View>
        )}
        <View
          style={
            theme == 'light'
              ? styles.userRenderStyle
              : styles.userRenderStyle_dark
          }
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleThemeChange()}
          style={{
            backgroundColor: colors.white,
            width: responsiveWidth(30),
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 20,
          }}
        >
          {theme == 'light' ? (
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.semiBold,
                fontSize: fontSize.medium,
              }}
            >
              Dark Mode
            </Text>
          ) : (
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.semiBold,
                fontSize: fontSize.medium,
              }}
            >
              Light Mode
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Profile;
