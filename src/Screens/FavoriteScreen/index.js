import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from '../List/styles';
import {marginHorizontal, spaceVertical} from '../../styles/variables';

const Favorites = () => {
  const [favMyList, setFavList] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
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
    getData();
  }, [user]);

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image
        style={styles.productimg}
        source={{uri: `${item.avatar}` ? `${item.avatar}` : null}}
      />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.productName}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favMyList.length == 0 ? (
        <Text style={styles.titleStyle}>No Favorite product available</Text>
      ) : (
        <FlatList
          data={favMyList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: spaceVertical.extraLarge,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Favorites;
