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

  useEffect(() => {
    const dbRef = ref(db, 'categoryLists/');

    onValue(dbRef, snapshot => {
      let records = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({data});
      });
      const arra1 = records[0].data;
      const arra2 = records[1].data;
      setProductList(arra1.concat(arra2));
    });
  }, []);
  console.log('productList', productList);
  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image style={styles.productimg} source={{uri: `${item.avatar}`}} />
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
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={styles.searchbarview}>
            <TextInput
              style={styles.searchinput}
              placeholder="Search Here"
              placeholderTextColor={'gray'}
            ></TextInput>

            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={styles.searchicon}
                source={require('../../../Assests/Images/search.png')}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: borderRadius.medium,
              borderWidth: 1.5,borderColor:'#bbb',
              alignSelf: 'center',justifyContent:'center',
              height:responsiveHeight(6),top:9,marginLeft:marginHorizontal.semiSmall
            }}
          >
           
            <Picker
              style={{
                width: responsiveWidth(30),
                borderRadius: borderRadius.medium,
                borderWidth: 1,alignSelf:'center',justifyContent:'center',
                borderColor: colors.grayline,
              }}
              selectedValue={productList}
              onValueChange={itemValue => setProductList(itemValue)}
             
            >
              <Picker.Item label="Filter" value="category" />
              <Picker.Item label="grocery" value="grocery" />
              <Picker.Item label="clothes" value="clothes" />
              <Picker.Item label="All" value="All" />

        
            </Picker>
          </View>
        </View>
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
            contentContainerStyle={{paddingBottom: spaceVertical.extraLarge}}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};
export default Buyer;
