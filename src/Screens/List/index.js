import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {ref, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';
import {ThemeContext} from '../../ThemeContext';
import {useTranslation} from 'react-i18next';
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

const List = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [user, setUser] = useState('');
  const {theme, setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  const getData = async () => {
    setUser(auth().currentUser);
    if (user) {
      let records = [];
      await onValue(ref(db, 'categoryLists/'), async snapshot => {
        if (snapshot) {
          snapshot.forEach(childSnapshot => {
            let data = childSnapshot.val();
            records.push({data});
          });
          const abc = await [...records[0].data, ...records[1].data];
          const result = await abc.filter(i => i.email == user.email);
          setProductList(result);
        }
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, db, user]);

  useEffect(() => {
    getData();
  }, [user]);

  const renderItem = ({item}) => (
    <View
      style={
        theme == 'light' ? styles.productlistview : styles.productlistview_dark
      }>
      <Image
        style={styles.productimg}
        source={{uri: `${item.avatar}` ? `${item.avatar}` : null}}
      />
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
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <View style={theme == 'light' ? styles.container : styles.container_dark}>
        {productList.length == 0 ? (
          <Text
            style={
              theme == 'light' ? styles.titleStyle : styles.titleStyle_dark
            }>
            {t('No Products Available')}
          </Text>
        ) : (
          <View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontFamily.bold,
                fontSize: fontSize.Xlarge,
                color:
                  theme == 'light' ? colors.projectgreen : colors.HARD_WHITE,
                top: spaceVertical.semiSmall,
              }}>
              {t("Own Products")}
            </Text>
            <FlatList
              data={productList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              on
              contentContainerStyle={{
                paddingBottom: spaceVertical.extraLarge,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default List;
