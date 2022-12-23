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
import Button from '../../../Components/Button';
import IonIcon from 'react-native-vector-icons/Ionicons';
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
  const [newData, setNewData] = useState([]);

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

      const flattened = newArray2.flat();

      console.log('flattened===', flattened);

      //  let data = newArray2;
      //  for(let i=0;i<data.length;i++){
      //   console.log("particular",data[i]);
      //   data.push(data[i]);
      //  }
      //  setNewData([...data]);

      //  let data = newArray2;
      //  data.reduce((a, b) => [...a, ...b], []);
    });
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.productlistview}>
      <Image style={styles.productimg} source={item.image} />
      <View style={{marginLeft: marginHorizontal.normal}}>
        <Text style={styles.productname}>{item.name}</Text>
        <Text
          style={{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold}}
        >
          {item.vendor}
        </Text>
        <Text style={{color: colors.green, fontFamily: fontFamily.medium}}>
          {item.price}
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
