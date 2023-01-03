import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from '../List/styles';
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

  const getData = async () => {
    setUser(auth().currentUser);
    await onValue(ref(db, 'FavouritesLists/' + user.uid), snapshot => {
      if (snapshot.val()) {
        const list = snapshot.val().favList;
        const result = list.filter(i => i.fav == true);
        setFavList(result);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [user]);

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
      <View style={styles.container}>
        {favMyList.length == 0 ? (
          <Text style={styles.titleStyle}>No Favourite Product available</Text>
        ) : (
          <View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontFamily.bold,
                fontSize: fontSize.extraLarge,
                color: colors.projectgreen,
                top: spaceVertical.semiSmall,
              }}
            >
              Favourite Products ❤️
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
