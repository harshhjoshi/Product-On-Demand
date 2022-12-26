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

  const dbRef = ref(db, 'users/');

  useEffect(() => {
    onValue(dbRef, snapshot => {
      let records = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({key: keyName, data: data.products});
      });
      var nameArray = records.map(function (el) {
        return el.data;
      });

      var newArray2 = nameArray.filter(function (el) {
        return el !== undefined;
      });
      console.log('newArray2===', newArray2);
      setProductList(newArray2.flat());
    });
  }, []);

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

  console.log("newData", productList);
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
