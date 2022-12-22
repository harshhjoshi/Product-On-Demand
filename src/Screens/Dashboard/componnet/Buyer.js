import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import Button from '../../../Components/Button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {marginHorizontal} from '../../../styles/variables';
import auth from "@react-native-firebase/auth";
import {ref,update} from '@firebase/database';
import {db} from '../../../Firebase/config';
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
const DATA = [
  {
    id: 1,
    name: 'Amul Gold Milk',
    vendor: 'Amul Milk center',
    price: '30 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 2,
    name: 'Amul shakti Milk',
    vendor: 'Amul Milk center',
    price: '28 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 3,
    name: 'Amul Moti Milk',
    vendor: 'Amul Milk center',
    price: '20 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 4,
    name: 'Amul Slim Milk',
    vendor: 'Amul Milk center',
    price: '25 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 5,
    name: 'Amul Gold Milk',
    vendor: 'Amul Milk center',
    price: '30 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 6,
    name: 'Amul shakti Milk',
    vendor: 'Amul Milk center',
    price: '28 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 7,
    name: 'Amul Moti Milk',
    vendor: 'Amul Milk center',
    price: '20 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 8,
    name: 'Amul Slim Milk',
    vendor: 'Amul Milk center',
    price: '25 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 9,
    name: 'Amul Gold Milk',
    vendor: 'Amul Milk center',
    price: '30 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 10,
    name: 'Amul shakti Milk',
    vendor: 'Amul Milk center',
    price: '28 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 11,
    name: 'Amul Moti Milk',
    vendor: 'Amul Milk center',
    price: '20 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 12,
    name: 'Amul Slim Milk',
    vendor: 'Amul Milk center',
    price: '25 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 13,
    name: 'Amul Gold Milk',
    vendor: 'Amul Milk center',
    price: '30 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 14,
    name: 'Amul shakti Milk',
    vendor: 'Amul Milk center',
    price: '28 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 15,
    name: 'Amul Moti Milk',
    vendor: 'Amul Milk center',
    price: '20 $',
    image: require('../../../Assests/Images/google.png'),
  },
  {
    id: 16,
    name: 'Amul Slim Milk',
    vendor: 'Amul Milk center',
    price: '25 $',
    image: require('../../../Assests/Images/google.png'),
  },
];
const Buyer = ({navigation}) => {

    const [user, setUser] = useState("");
    // const [tab, setTab] = useState(true);


    function onAuthStateChanged(user) {
        setUser(user);
    }
    const signOut = () => {
        auth().onAuthStateChanged(onAuthStateChanged);
       
        if(user){
            console.log(user.uid);
            update(ref(db,'users/'+ user.uid ),{
                role:""
               }).then (()=>{
               console.log("data update succesfully")
               auth().signOut()
             }).catch((error)=>{
               console.log("error")
             })
        }
      
      
    }
  const renderItem = ({item, index}) => (
    <View
      style={{
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        backgroundColor: colors.white,
        alignSelf: 'center',
        borderRadius: borderRadius.medium,
        elevation: 2,
        marginTop: spaceVertical.semiSmall,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: responsiveHeight(10),
          width: responsiveHeight(10),
          marginLeft: marginHorizontal.flatlistmargin,
        }}
        source={item.image}
      />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text
          style={{
            color: colors.purple,
            fontFamily: fontFamily.bold,
            fontSize: fontSize.normal,
          }}>
          {item.name}
        </Text>
        <Text
          style={{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold}}>
          {item.vendor}
        </Text>
        <Text style={{color: colors.green, fontFamily: fontFamily.medium}}>
          {item.price}
        </Text>
        <TouchableOpacity
          style={{
            height: responsiveHeight(4),
            width: responsiveWidth(20),
            backgroundColor: colors.projectgreen,
            borderRadius: borderRadius.normal,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        marginTop: spaceVertical.semiSmall,
      }}>
      <StatusBar
        backgroundColor={colors.HARD_WHITE}
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
     
      <View
        style={{
          backgroundColor: colors.lightgreen,
          borderTopLeftRadius: borderRadius.XLarge,
          borderTopRightRadius: borderRadius.XLarge,
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: spaceVertical.semiSmall}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
export default Buyer;
