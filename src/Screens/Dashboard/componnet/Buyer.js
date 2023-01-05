import React, {useEffect, useState, useContext} from 'react';
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
import {ref, onValue, set, update} from '@firebase/database';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
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
import SearchInput, {createFilter} from 'react-native-search-filter';
import {ThemeContext} from '../../../ThemeContext';

const KEYS_TO_FILTERS = ['productName'];

const Buyer = ({navigation, parentToChild}) => {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategory] = useState('all');
  const [clotheslist, setClothesList] = useState('');
  const [grocerylist, setGroceryList] = useState('');
  const [user, setUser] = useState('');
  const [ouradddlist, setAdddList] = useState('');
  const {theme, setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    setUser(auth().currentUser);
  }, [user]);

  const data = () => {
    let records = [];
    onValue(ref(db, 'categoryLists/'), async snapshot => {
      if (snapshot) {
        snapshot.forEach(childSnapshot => {
          let data = childSnapshot.val();
          records.push({data});
        });
        await setClothesList(records[0].data);
        await setGroceryList(records[1].data);

        if (user) {
          await onValue(ref(db, 'addLists/' + user.uid), async snapshot => {
            if (snapshot.val()) {
              await setAdddList(snapshot.val().addList);
            }
          });

          await onValue(
            ref(db, 'FavouritesLists/' + user.uid),
            async snapshot => {
              if (snapshot.val()) {
                const list = snapshot.val();
                const result = list.favList.filter(i => i.fav == true);
                const listfav_product = [
                  ...records[0].data,
                  ...records[1].data,
                ].map(i => {
                  let otherSubject = result.find(
                    e => e.productid === i.productid,
                  );
                  return {...i, ...otherSubject};
                });
                await setProductList(listfav_product);
              } else {
                setProductList([...records[0].data, ...records[1].data]);
              }
            },
          );
        } else {
          setProductList([...records[0].data, ...records[1].data]);
        }
      }
    });
  };

  useEffect(() => {
    {
      parentToChild == 0 ? data() : null;
    }
  }, [user]);

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

  const addProduct = async item => {
    if (user) {
      if (ouradddlist) {
        const updateAddList = ouradddlist.map(e => {
          return e.productid === item.productid ? {...e, qty: e.qty + 1} : e;
        });

        const exstingAddList = ouradddlist.filter(
          i => i.productid === item.productid,
        );
        if (exstingAddList.length == 0) {
          updateAddList.push(item);
        }

        update(ref(db, 'addLists/' + user.uid), {
          addList: updateAddList,
        });
      } else {
        const addItemList = [];
        addItemList.push(item);
        set(ref(db, 'addLists/' + user.uid), {
          addList: addItemList,
        });
      }
    }
  };

  const favPress = item => {
    const updateFavList = productList.map(e => {
      return e.productid === item.productid ? {...e, fav: !e.fav} : e;
    });
    if (user) {
      set(ref(db, 'FavouritesLists/' + user.uid), {
        favList: updateFavList,
      });
    }
    setProductList(updateFavList);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={
          theme == 'light'
            ? styles.productlistview
            : styles.productlistview_dark
        }>
        <Image
          style={styles.productimg}
          source={{
            uri: !`${item.avatar}`
              ? `${item.avatar}`
              : 'https://www.freepnglogos.com/uploads/fruits-png/fruits-png-image-fruits-png-image-download-39.png',
          }}
        />
        <View style={{marginLeft: marginHorizontal.normal}}>
          <Text style={styles.productname}>{item.productName}</Text>
          <Text
            style={{
              color: theme == 'light' ? colors.HARD_BLACK : colors.white,
              fontFamily: fontFamily.semiBold,
              width: responsiveWidth(50),
            }}>
            {item.details}
          </Text>
          <Text style={{color: colors.green, fontFamily: fontFamily.medium}}>
            {item.price} $
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => addProduct(item)}
              style={styles.buyeradd}>
              <Text style={styles.buyerbtntext}>{t("Add")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => favPress(item)}>
              <IonIcon
                color={item.fav ? colors.red : colors.white}
                name="heart-circle-outline"
                size={30}
                style={{left: 15}}></IonIcon>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredData = productList.filter(
    createFilter(filter, KEYS_TO_FILTERS),
  );

  return (
    <View
      style={
        theme == 'light' ? styles.buyercontainer : styles.buyercontainer_dark
      }>
      <View style={theme == 'light' ? styles.listview : styles.listview_dark}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.searchbarview}>
            <TextInput
              style={styles.searchinput}
              placeholder={t('Search Here')}
              placeholderTextColor={'gray'}
              onChangeText={term => {
                setFilter(term);
              }}></TextInput>
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
              backgroundColor: colors.white,
            }}>
            <Picker
              style={{
                width: responsiveWidth(30),
                borderRadius: borderRadius.medium,
                borderWidth: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                borderColor: colors.grayline,
                color: colors.black,
              }}
              selectedValue={categoryFilter}
              dropdownIconColor={colors.black}
              onValueChange={itemValue => setCategory(itemValue)}>
              <Picker.Item label={t("All")} value="all" />
              <Picker.Item label={t("Grocery")} value="grocery" />
              <Picker.Item label={t("Clothes")} value="clothes" />
            </Picker>
          </View>
        </View>
        {productList.length == 0 ? (
          <Text
            style={{
              fontFamily: fontFamily.bold,
              marginTop: spaceVertical.normal,
              fontSize: fontSize.large,
              color: colors.projectgreen,
            }}>
            {t('No Products Available')}
          </Text>
        ) : (
          <View>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: spaceVertical.XXlarge,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default Buyer;
