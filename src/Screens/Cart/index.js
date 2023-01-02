import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from '../List/styles';
import {marginHorizontal, spaceVertical} from '../../styles/variables';

const Cart = () => {
  const [addedproduct, setAddList] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(auth().currentUser);
    const getData = async () => {
   
      await onValue(ref(db, 'addedProduct/' + user.uid), snapshot => {
        if (snapshot.val()) {
          const addedproduct = snapshot.val().addproductlist
         console.log("list",addedproduct)
          setAddList(addedproduct);
        }else{
            console.log("error")
        }
      });
    };
    getData();
  }, []);

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
    <View style={styles.container}>
      {addedproduct.length == 0 ? (
        <Text style={styles.titleStyle}>No Favourite product available</Text>
      ) : (
        <FlatList
          data={addedproduct}
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

export default Cart;
