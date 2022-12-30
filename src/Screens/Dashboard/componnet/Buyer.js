import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {marginHorizontal} from '../../../styles/variables';
import {db} from '../../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {ref, onValue, update, set, } from '@firebase/database';
import IonIcon from 'react-native-vector-icons/Ionicons';
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
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['productName'];

const Buyer = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const[filter,setFilter]=useState('');
  const [categoryFilter, setCategory] = useState('all');
  const [clotheslist, setClothesList] = useState('');
  const [grocerylist, setGroceryList] = useState('');
  const [user, setUser] = useState('');
  const [addProducts, setAddproduct] = useState([]);

  useEffect(() => {
    setUser(auth().currentUser);
  }, [user]);


  useEffect(() => {
    const getData = async () => {
      let records = [];
     await onValue(ref(db, 'categoryLists/'), async snapshot => {
        if (snapshot) {
          snapshot.forEach(childSnapshot => {
            let data = childSnapshot.val();
            records.push({data});
          });
          await setClothesList(records[0].data);
         await setGroceryList(records[1].data);
         await setProductList([...records[0].data, ...records[1].data]);
        }
      });
    }
getData();

  }, []);

  const addProduct = item => {


    addProducts.push(item);
 set(ref(db, 'addedProduct/'),{
        addproductlist:addProducts
        })
    console.log('newarray', addProducts);
  };

  useEffect(() => {
    switch (categoryFilter) {
      case 'grocery':
        setProductList(grocerylist);
        break;
      case 'clothes':
        setProductList(clotheslist);
        break;
      default:
        setProductList([...grocerylist, ...clotheslist]);
    }
  }, [categoryFilter]);

  
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.productlistview}>
    
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
        <View style={styles.row}>
        <TouchableOpacity       onPress={() => addProduct(item)} style={styles.buyeradd}>
          <Text style={styles.buyerbtntext}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>favPress(item)}>
          <IonIcon
            color={item.fav?colors.red: colors.black }
            name="heart-outline"
            size={30}
            style={{left:15,}}

            
          >
          </IonIcon>
        </TouchableOpacity>
        </View>
       
      </View>
    </TouchableOpacity>

  );
  const filteredData = productList.filter(createFilter(filter, KEYS_TO_FILTERS))


  
  const favPress = (item)=>{
    const updateFavList = productList.map(e=>{
      return e.productid === item.productid ? {...e, fav:!e.fav} : e; 
    })
    if(user){
      set(ref(db, 'FavouritesLists/' + user.uid),{
        favList:updateFavList,
      })
    }
   setProductList(updateFavList);
  }

  return (
    <View style={styles.buyercontainer}>
      <View style={styles.listview}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.searchbarview}>
            <TextInput
              style={styles.searchinput}
              placeholder="Search Here"
              placeholderTextColor={'gray'}
              onChangeText={(term) => { setFilter(term) }} 
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
              borderWidth: 1.5,
              borderColor: '#bbb',
              alignSelf: 'center',
              justifyContent: 'center',
              height: responsiveHeight(6),
              top: 9,
              marginLeft: marginHorizontal.semiSmall,
            }}
          >
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
              onValueChange={itemValue => setCategory(itemValue)}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Grocery" value="grocery" />
              <Picker.Item label="Clothes" value="clothes" />
            </Picker>
          </View>
        </View>
            {productList.length == 0 ? (
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
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} 
                contentContainerStyle={{
                  paddingBottom: spaceVertical.extraLarge,
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
      </View>
    </View>
  );
};
export default Buyer;
