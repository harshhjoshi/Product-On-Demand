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
import {ref, update, set, onValue} from '@firebase/database';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';

const Vendor = ({navigation}) => {
  const dummyUri =
    'http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo.png';
  const [galleryphoto, setUploadImage] = useState(dummyUri);
  const [category, setCategory] = useState();
  const [productName, setProductName] = useState('');
  const [details, setdetails] = useState('');
  const [price, setPrice] = useState('');
  const [productfiled, setProductFiled] = useState('');
  const [user, setUser] = useState("");
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
    setUser(auth().currentUser)
    },[user]);

  useEffect(() => {
    const dbRef = ref(db, 'categoryLists/');
    onValue(dbRef, snapshot => {
      var snapVal = snapshot.val();
      setProductFiled(snapVal);
      if (!snapVal) {
        console.log('hello no');
        set(ref(db, 'categoryLists/'), {
          grocery: '',
          clothes: '',
        });
      }
    });
  }, []);

  const productGroceryList = [];
  const productClothesList = [];

  const sellerSubmite = category => {
    setUploadImage('')
    setPrice('')
    setProductName('')
    setdetails('')
    const obj = {
      productName: productName,
      details: details,
      price:price,
      avatar:galleryphoto,
      email:user.email
    };
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
          style={styles.imgselection}>
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
        <View>
          <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}>
            <Picker.Item label="Choose category" value="category" />
            <Picker.Item label="grocery" value="grocery" />
            <Picker.Item label="clothes" value="clothes" />
          </Picker>
        </View>

        <Button
          name={'Submit'}
          onPress={() => sellerSubmite(category)}
          color={colors.projectgreen}
          marginTop={spaceVertical.semiSmall}></Button>
      </View>
    </ScrollView>
  );
};

export default Vendor;
