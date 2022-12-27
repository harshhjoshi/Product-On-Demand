import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {marginHorizontal} from '../../../styles/variables';
import {db} from '../../../Firebase/config';
import {ref, onValue} from '@firebase/database';
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../../styles/variables';
import {Picker} from '@react-native-picker/picker';



const Buyer = ({navigation}) => {

  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    
    const dbRef = ref(db,'categoryLists/');
    onValue(dbRef, snapshot => {
      let records = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({data});
      });
      const arra1= records[0].data
      const arra2 = records[1].data
      setProductList(arra1.concat(arra2));
    });
  }, []);
  console.log("productList..........", productList);

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image style={styles.productimg} source={{uri: `${item.avatar}`}}/>
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.productName}</Text>
        <Text
          style={{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold, width:responsiveWidth(50)}}
        >
          {item.details}
        </Text>
        <Text style={{color: colors.green, fontFamily: fontFamily.medium}}>
          {item.price} $
        </Text>
        <TouchableOpacity style={styles.buyeradd}>
          <Text style={styles.buyerbtntext}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
 
  return (
    <View style={styles.buyercontainer}>
      <StatusBar
        backgroundColor={colors.HARD_WHITE}
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View style={styles.listview}>
      {productList.length <= 0 ? (
          <Text
            style={{
              fontFamily: fontFamily.bold,
              marginTop: spaceVertical.normal,
              fontSize: fontSize.large,
            }}
          >
            No products available
          </Text>
        ) : (
        <FlatList
          data={productList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: spaceVertical.semiSmall}}
          showsVerticalScrollIndicator={false}
        />
        )}
      </View>
    </View>
  );
};
export default Buyer;
