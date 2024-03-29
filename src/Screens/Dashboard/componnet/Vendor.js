import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  colors,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import {ThemeContext} from '../../../ThemeContext';
import {spaceVertical, fontFamily} from '../../../styles/variables';
import TextInputs from '../../../Components/TextInputs';
import Button from '../../../Components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {db} from '../../../Firebase/config';
import {ref, update, set, onValue} from '@firebase/database';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

import {useTranslation} from 'react-i18next';

const Vendor = ({navigation}) => {
  const dummyUri =
    'http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo.png';
  const [galleryphoto, setUploadImage] = useState(dummyUri);
  const [category, setCategory] = useState();
  const [productName, setProductName] = useState('');
  const [details, setdetails] = useState('');
  const [price, setPrice] = useState('');
  const [productfiled, setProductFiled] = useState('');
  const [user, setUser] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {theme, setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation()
  
  const OPENPICKER = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel != true) {
        setUploadImage(response?.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    setUser(auth().currentUser);
  }, [user]);

  useEffect(() => {
    const dbRef = ref(db, 'categoryLists/');
    onValue(dbRef, snapshot => {
      var snapVal = snapshot.val();
      setProductFiled(snapVal);
      if (!snapVal) {
        set(ref(db, 'categoryLists/'), {
          grocery: '',
          clothes: '',
        });
      }
    });
  }, []);

  const productGroceryList = [];
  const productClothesList = [];
  const closemodal = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };

  const sellerSubmite = category => {
    const obj = {
      productName: productName,
      details: details,
      price: price,
      avatar: galleryphoto,
      email: user.email,
      fav: false,
      qty: 1,
      productid: Math.floor(Math.random() * 100),
    };

    if (
      !obj.productName ||
      !obj.details ||
      !obj.price ||
      obj.avatar == dummyUri ||
      !category
    ) {
      Snackbar.show({
        text: 'Please Fill All The Fields',
        duration: Snackbar.LENGTH_SHORT,
        textColor: colors.white,
        backgroundColor: colors.red,
        fontFamily: fontFamily.medium,
      });
    } else {
      switch (category) {
        case 'grocery':
          if (productfiled.grocery) {
            productfiled.grocery.push(obj);
            update(ref(db, 'categoryLists'), {
              grocery: productfiled.grocery,
            });
          } else {
            productGroceryList.push(obj);
            update(ref(db, 'categoryLists'), {
              grocery: productGroceryList,
            });
          }
          break;

        case 'clothes':
          if (productfiled.clothes) {
            productfiled.clothes.push(obj);
            update(ref(db, 'categoryLists'), {
              clothes: productfiled.clothes,
            });
          } else {
            productClothesList.push(obj);
            update(ref(db, 'categoryLists'), {
              clothes: productClothesList,
            });
          }
          break;
        default:
          break;
      }
      closemodal();
      setUploadImage('');
      setPrice('');
      setProductName('');
      setdetails('');
    }
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: spaceVertical.normal}}>
  
      {user ? (
        <View
          style={theme == 'light' ? styles.headerview : styles.headerview_dark}
        >
          <Text style={styles.headertext}>{t("Upload Image")}</Text>
          <TouchableOpacity
            onPress={() => OPENPICKER()}
            style={styles.imgselection}
          >
            <Image style={styles.img} source={{uri: galleryphoto}} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
              <View style={styles.modalView}>
                <Image
                  style={{
                    height: responsiveHeight(10),
                    width: responsiveWidth(20),
                  }}
                  source={require('../../../Assests/Images/check.png')}
                />
                <Text style={styles.modalText}>{t("Product Added")}</Text>
              </View>
            </View>
          </Modal>
          <TextInputs
            label={t('Add Product Name')}
            value={productName}
            onChangeText={e => setProductName(e)}
            style={styles.TextInputs}
          />
          <TextInputs
            label={t('Add Product Details')}
            value={details}
            onChangeText={e => setdetails(e)}
            style={styles.TextInputs}
          />

          <TextInputs
            label={t('Add Price')}
            value={price}
            onChangeText={e => setPrice(e)}
            keyboardType="Numeric"
            style={styles.TextInputs}
          />
          <View>
            <Picker
              style={{
                color: theme == 'light' ? colors.black : colors.white,
                borderWidth: 1,
                borderColor: theme == 'light' ? colors.black : colors.white,
              }}
              selectedValue={category}
              dropdownIconColor={theme == 'light' ? colors.black : colors.white}
              onValueChange={itemValue => setCategory(itemValue)}
            >
              <Picker.Item label={t("Choose category")} value="category" />
              <Picker.Item label={t("Grocery")} value="grocery" />
              <Picker.Item label={t("Clothes")} value="clothes" />
            </Picker>
          </View>

          <Button
            name={t('Submit')}
            onPress={() => sellerSubmite(category)}
            color={colors.projectgreen}
            marginTop={spaceVertical.semiSmall}
          ></Button>
        </View>
      ) : (
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fontFamily.semiBold,
            fontSize: fontSize.Xlarge,
            color: colors.projectgreen,
            top: spaceVertical.normal,
          }}
        >
         {t('Please Login')}
        </Text>
      )}
    </ScrollView>
  );
};

export default Vendor;
