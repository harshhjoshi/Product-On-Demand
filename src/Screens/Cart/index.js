import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {ref, onValue, update} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';
import {
  borderRadius,
  colors,
  marginHorizontal,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../styles/variables';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../ThemeContext';
import {useTranslation} from 'react-i18next';

const Cart = ({navigation}) => {
  const [ouradddlist, setAdddList] = useState('');
  const [user, setUser] = useState('');
  const {theme, setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    const getData = async () => {
      setUser(auth().currentUser);
      if (user) {
        await onValue(ref(db, 'addLists/' + user.uid), snapshot => {
          if (snapshot.val()) {
            const add_list_fb = snapshot.val().addList;
            setAdddList(add_list_fb);
          } else {
            setAdddList([]);
          }
        });
      }
    };
    getData();
  }, [user]);

  const removeAddItem = item => {
    const remove_add = ouradddlist.filter(i => i.productid !== item.productid);
    update(ref(db, 'addLists/' + user.uid), {
      addList: remove_add,
    });
  };

  const renderItem = ({item, index}) => (
    <View style={styles.productlistview}>
      <Image
        style={styles.productimg}
        source={{
          uri: !`${item.avatar}`
            ? `${item.avatar}`
            : 'https://www.freepnglogos.com/uploads/fruits-png/fruits-png-image-fruits-png-image-download-39.png',
        }}
      />
      <View>
        <Text style={styles.productname}>{item.productName}</Text>
        <Text style={styles.productprice}>{item.price} $</Text>
        <View style={{flexDirection: 'row'}}>
          <IonIcon
            name="remove-outline"
            color={colors.HARD_BLACK}
            size={30}></IonIcon>
          <Text style={styles.productprice}>{item.qty}</Text>
          <IonIcon
            name="add-outline"
            color={colors.HARD_BLACK}
            size={30}
            style={{left: 10}}></IonIcon>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeAddItem(item)} activeOpacity={0.5}>
        <Image
          style={styles.img}
          source={require('../../Assests/Images/delete.png')}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={theme == 'light' ? styles.container : styles.container_dark}>
      <View
        style={{
          flexDirection: 'row',
          // marginTop: spaceVertical.normal,
          // width: responsiveWidth(100),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <IonIcon
            name="arrow-back-outline"
            color={theme == 'light' ? colors.black : colors.white}
            size={35}></IonIcon>
        </TouchableOpacity>
        <Text style={styles.headertext}>{t('Cart')}</Text>
      </View>

      {ouradddlist.length == 0 ? (
        <Text style={styles.titleStyle}>{t('No Products Available')} </Text>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor:
              theme == 'light' ? colors.lightgreen : colors.black,
            borderRadius: borderRadius.bigboxradius,
          }}>
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
