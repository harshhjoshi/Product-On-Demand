import { View, Text,FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  marginHorizontal,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../styles/variables';
const List = () => {
    const [productList, setProductList] = useState([]);
    const [user,setUser]=useState("");

  useEffect(() => {
    const getData = async () => {
      setUser(auth().currentUser)
      let records = [];
     await onValue(ref(db, 'categoryLists/'), async snapshot => {
        if (snapshot) {
          snapshot.forEach(childSnapshot => {
            let data = childSnapshot.val();
            records.push({data});
          });
       const abc = await ([...records[0].data, ...records[1].data]);
         const result = await abc.filter(i => i.email == user.email);
         setProductList(result)

        }
      });
    };

    getData();

  }, [db,user]);

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
    
      <Image style={styles.productimg} source={{uri: `${item.avatar}`?`${item.avatar}`:null}} />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.productName}</Text>
        <Text
          style={{
            color: colors.HARD_BLACK,
            fontFamily: fontFamily.semiBold,
            width: responsiveWidth(50),
          }}
        >
          {item.details}
        </Text>
        <Text style={{color: colors.green, fontFamily: fontFamily.medium}}>
          {item.price} $
        </Text>
      </View>
    </View>

  );
  console.log("user..",user);
  console.log("productList",productList);
  return (
    <View style={styles.container}>
     {productList.length == 0 ? (
              <Text
                style={styles.titleStyle}
              >
                No products available
              </Text>
            ) : (
              <FlatList
                data={productList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                on
                contentContainerStyle={{
                  paddingBottom: spaceVertical.extraLarge,
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
      
    </View>
  )
}

export default List