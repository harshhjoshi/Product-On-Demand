import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, Share, TouchableOpacity} from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';

import {ThemeContext} from '../../ThemeContext';
import {
  colors,
  fontFamily,
  fontSize,
  responsiveWidth,
} from '../../styles/variables';

// const data = [
//   {
//     id: 1,
//     label: 'Your Favorites',
//     icon: 'heart',
//     flag: false,
//   },
//   {
//     id: 2,
//     label: 'Location',
//     icon: 'navigate',
//     flag: false,
//   },
//   {
//     id: 3,
//     label: 'Language',
//     icon: 'globe',
//     flag: false,
//   },
//   {
//     id: 4,
//     label: 'Tell your Friend',
//     icon: 'people',
//     flag: false,
//   },
//   {
//     id: 5,
//     label: 'About US',
//     icon: 'information-circle',
//     flag: false,
//   },
//   {
//     id: 6,
//     label: 'Terms and Policies',
//     icon: 'document',
//     flag: false,
//   },
// ];

const Profile = ({navigation}) => {
  const [Firedata, setFiredata] = useState(' ');
  const [user, setUser] = useState('');
  const {theme, setTheme} = useContext(ThemeContext);
  const [language, setLanguage] = useState('');
  const {t, i18n} = useTranslation();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getData = async () => {
    await setUser(auth().currentUser);
    if (user) {
      await onValue(ref(db, 'users/' + user.uid), snapshot => {
        if (snapshot.val()) {
          setFiredata(snapshot.val());
        }
      });
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  useEffect(() => {
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

  const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Please install this app and Enjoy , AppLink :Product On Demand', 
  url: ''
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // const renderItem = ({item}) => (
  //   <TouchableOpacity style={styles.userInfoStyle}>
  //     <Text style={theme == 'light' ? styles.ml : styles.ml_dark}>
  //       {item.label}
  //     </Text>
  //     <IonIcon
  //       name="caret-forward-outline"
  //       size={25}
  //       color={theme == 'light' ? colors.black : colors.HARD_WHITE}
  //     ></IonIcon>
  //   </TouchableOpacity>
  // );
  const languageData = [
    {label: 'English', value: 'en'},
    {label: 'Italian', value: 'it'},
    {label: 'French', value: 'fr'},
    {label: 'Gujarati', value:'gu'},
  ];

  return (
    <View style={theme == 'light' ? styles.container : styles.container_dark}>
      <View style={theme == 'light' ? styles.header : styles.header_dark}>
        <Text
          style={
            theme == 'light' ? styles.profilealign : styles.profilealign_dark
          }>
          {t('Profile')}
        </Text>
        {user ? (
          <TouchableOpacity
            style={{left: responsiveWidth(25)}}
            onPress={() => UsersignOut()}>
            <Image
              style={styles.img}
              source={require('../../Assests/Images/power-off.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{left: responsiveWidth(30)}}
            onPress={() => navigation.navigate('Signin_screen')}
            activeOpacity={0.5}>
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
        }>
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
              {user ? Firedata.userName : <Text>{t('Guest')}</Text>}
            </Text>
          </View>
        </View>
        {user && (
          <View style={styles.userEmailStyle}>
            <IonIcon
              name="mail"
              size={25}
              color={theme == 'light' ? colors.black : colors.white}></IonIcon>
            <Text
              style={
                theme == 'light' ? styles.emailTitle : styles.emailTitle_dark
              }>
              {Firedata.email}
            </Text>
          </View>
        )}
        <Dropdown
          dropdownPosition="bottom"
          data={languageData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Language"
          placeholderStyle={styles.langStyle}
          // searchPlaceholder={t('search')}
          value={i18n.language === 'en' ? language : language}
          onChange={item => {i18n.changeLanguage(item.value);
            setLanguage(item.value);
          }}
        />
        {/* <View
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
        </View> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleThemeChange()}
          style={{
            backgroundColor: colors.white,
            width: responsiveWidth(30),
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 20,
          }}>
          {theme == 'light' ? (
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.semiBold,
                fontSize: fontSize.medium,
                marginTop: 150,
              }}>
              Dark Mode
            </Text>
          ) : (
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.semiBold,
                fontSize: fontSize.medium,
              }}>
              Light Mode
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Profile;
