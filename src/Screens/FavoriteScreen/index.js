import {View, Text, FlatList, Image, StatusBar} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from '../List/styles';
import {ThemeContext} from '../../ThemeContext';
import {useTranslation} from 'react-i18next';
import {
  colors,
  fontFamily,
  fontSize,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';

const Favorites = ({navigation}) => {
  const [favMyList, setFavList] = useState('');
  const [user, setUser] = useState('');
  const {theme, setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  const getData = async () => {
    setUser(auth().currentUser);
    if (user) {
      await onValue(ref(db, 'FavouritesLists/' + user.uid), snapshot => {
        if (snapshot.val()) {
          const list = snapshot.val().favList;
          const result = list.filter(i => i.fav == true);
          setFavList(result);
        }
      });
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image
        style={styles.productimg}
        source={{uri: `${item.avatar}` ? `${item.avatar}` : null}}
      />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.productName}</Text>
        <Text style={styles.productprice}>{item.price} $</Text>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <View style={theme == 'light' ? styles.container : styles.container_dark}>
        {favMyList.length == 0 ? (
          <Text
            style={
              theme == 'light' ? styles.titleStyle : styles.titleStyle_dark
            }>
            {t('No Products Available')}
          </Text>
        ) : (
          <View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontFamily.bold,
                fontSize: fontSize.extraLarge,
                color: theme == 'light' ? colors.projectgreen : colors.white,
                top: spaceVertical.semiSmall,
              }}>
             {t("Favourite Products")} ❤️
            </Text>
            <FlatList
              data={favMyList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: spaceVertical.extraLarge,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Favorites;
