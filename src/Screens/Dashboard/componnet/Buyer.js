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
import { ActivityIndicator } from 'react-native-paper';

const Buyer = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [categoryFilter, setCategory] = useState("all");
  const [clotheslist, setClothesList] = useState('');
  const [grocerylist, setGroceryList] = useState('');
  const [loading, setloading] = useState(true)

  useEffect(() => {
    console.log("hello i am new");
    const dbRef = ref(db, 'categoryLists/');
    onValue(dbRef, snapshot => {
      if(snapshot){
        let records = [];
        snapshot.forEach(childSnapshot => {
          let data = childSnapshot.val();
          records.push({data});
          // setloading(false)
        });
        setClothesList(records[0].data);
        setGroceryList(records[1].data);
        setProductList([...records[0].data,...records[1].data])
      }
    });
  }, []);

  useEffect(() => {
    switch (categoryFilter) {
      case 'grocery':
        setProductList(grocerylist);
        break;
      case 'clothes':
        setProductList(clotheslist);
        break;
      default:
        setProductList([...grocerylist,...clotheslist])
    }
  }, [categoryFilter]);

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
          }}>
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

  console.log("product", productList);
  return (
    <View style={styles.buyercontainer}>
      <StatusBar
        backgroundColor={colors.HARD_WHITE}
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />

      <View style={styles.listview}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.searchbarview}>
            <TextInput
              style={styles.searchinput}
              placeholder="Search Here"
              placeholderTextColor={'gray'}></TextInput>

            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={styles.searchicon}
                source={require('../../../Assests/Images/search.png')}></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: borderRadius.medium,
              borderWidth: 1.5,
              borderColor: '#bbb',
              alignSelf: 'center',
              justifyContent: 'center',
              height: responsiveHeight(6),
              top: 9,
              marginLeft: marginHorizontal.semiSmall,
            }}>
            <Picker
              style={{
                width: responsiveWidth(30),
                borderRadius: borderRadius.medium,
                borderWidth: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                borderColor: colors.grayline,
              }}
              selectedValue={categoryFilter}
              onValueChange={itemValue => setCategory(itemValue)}>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Grocery" value="grocery" />
              <Picker.Item label="Clothes" value="clothes" />
            </Picker>
          </View>
        </View>

        {!loading ? <ActivityIndicator animating={true} color="green"  style={{alignContent:"center",justifyContent:"center",height:responsiveHeight(80)}}/>:
 <>
 {productList.length == 0 ? (
   <Text
     style={{
       fontFamily: fontFamily.bold,
       marginTop: spaceVertical.normal,
       fontSize: fontSize.large,
     }}>
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
 </>
        }
      </View>
    </View>
  );
};
export default Buyer;
