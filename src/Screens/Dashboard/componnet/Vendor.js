import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../styles/variables';
import {spaceVertical} from '../../../styles/variables';
import TextInputs from '../../../Components/TextInputs';
import Button from '../../../Components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {db} from '../../../Firebase/config';
import {ref, update, onValue} from '@firebase/database';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';
const Vendor = ({navigation}) => {
  const dummyUri =
    'http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo.png';
  const [galleryphoto, setUploadImage] = useState(dummyUri);
  const [user, setUser] = useState('');
  const [productName, setProductName] = useState('');
  const [details, setdetails] = useState('');
  const [price, setPrice] = useState('');
  const [productfiled, setProductFiled] = useState('');
console.log("ggalleryphotoa", galleryphoto);
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
    auth().onAuthStateChanged(u => {
      setUser(u);
      const dbRef = ref(db, 'users/' + u.uid);
      onValue(dbRef, snapshot => {
        var snapVal = snapshot.val();
        console.log('snapVal', snapVal);
        setProductFiled(snapVal.products);
      });
    });
  }, []);

  const newProductList = [];
  const sellerSubmite = async (productName, details, price,galleryphoto) => {
    console.log('sub', productfiled);
    setPrice('')
    setProductName('')
    setdetails('')
    if (!productfiled) {
      let obj = {
        productName: productName,
        details: details,
        price: price,
        avatar:galleryphoto,
      };
      newProductList.push(obj);
      update(ref(db, 'users/' + user.uid), {
        products: newProductList,
      })
        .then(() => {
          console.log('data update');
        })
        .catch(error => {
          console.log('error');
        });
    } else {
      let obj2 = {
        productName: productName,
        details: details,
        price: price,
        avatar:galleryphoto,
      };
      productfiled.push(obj2);
      update(ref(db, 'users/' + user.uid), {
        products: productfiled,
      })
        .then(() => {
          console.log('data update..');
        })
        .catch(error => {
          console.log('error');
        });
    }
  };
  return (
    <ScrollView>
      <StatusBar
        backgroundColor={colors.HARD_WHITE}
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Upload Image</Text>
        <TouchableOpacity
          onPress={() => OPENPICKER()}
          style={styles.imgselection}
        >
          <Image style={styles.img} source={{uri: galleryphoto}} />
        </TouchableOpacity>
        <TextInputs
          label={'Add Product Name'}
          value={productName}
          onChangeText={e => setProductName(e)}
          style={styles.TextInputs}
        />
        <TextInputs
          label={'Add Product Details'}
          value={details}
          onChangeText={e => setdetails(e)}
          style={styles.TextInputs}
        />

        <TextInputs
          label={' Add Price'}
          value={price}
          onChangeText={e => setPrice(e)}
          keyboardType="Numeric"
          style={styles.TextInputs}
        />
        <Button
          name={'Submit'}
          onPress={() => sellerSubmite(productName, details, price,galleryphoto)}
          color={colors.projectgreen}
          marginTop={spaceVertical.semiSmall}
        ></Button>
      </View>
    </ScrollView>
  );
};

export default Vendor;
