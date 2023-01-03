import {View, Text, FlatList, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';
import {borderRadius, colors, marginHorizontal, spaceVertical} from '../../styles/variables';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Cart = ({navigation}) => {
  const [ouradddlist, setAdddList] = useState('');
  const [user, setUser] = useState('');

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

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image
        style={styles.productimg}
        source={{uri: `${item.avatar}` ? `${item.avatar}` : null}}
      />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.productName}</Text>
        <Text style={styles.productprice}>{item.price} $</Text>
        <View style={{flexDirection:"row"}}>
        <IonIcon name="remove-outline" color={colors.HARD_BLACK} size={30}></IonIcon>
        <Text style={styles.productprice}>{item.qty}</Text>
        <IonIcon name="add-outline" color={colors.HARD_BLACK} size={30} style={{left:10}}></IonIcon>
        </View>
       
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
   

    {/* <TouchableOpacity
          onPress={() => navigation.navigate('Tabs')}
          activeOpacity={0.5}>
          <Image
            style={styles.img}
            source={require('../../Assests/Images/leftarrow.png')}
          />
    </TouchableOpacity> */}
  
    <Text style={styles.headertext}>My cart</Text>
    
 
   

      {ouradddlist.length == 0 ? (
        <Text style={styles.titleStyle}>No Product Added </Text>
      ) : (
        <View style={{flex:1,backgroundColor:colors.lightgreen,borderRadius:borderRadius.bigboxradius}}>
        <FlatList
          data={ouradddlist}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: spaceVertical.large,
          }}
          showsVerticalScrollIndicator={false}
        />
        </View>
      )}
    </View>
  );
};

export default Cart;
