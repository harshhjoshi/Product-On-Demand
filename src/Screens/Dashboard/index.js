import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ref, update, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import Buyer from './componnet/Buyer';
import Vendor from './componnet/Vendor';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

import {colors} from '../../styles/variables';

const Dashboard = ({navigation}) => {
  const [rolevalue, setRoleValue] = useState('Buyer');

  useEffect(() => {
    auth().onAuthStateChanged(u => {
      const dbRef = ref(db, 'users/' + u.uid);
      onValue(dbRef, snapshot => {
        var snapVal = snapshot.val();
        setRoleValue(snapVal.role);
      });
    });
  }, []);

  const signOut = () => {
    console.log("ok");
    auth().onAuthStateChanged(i => {
      update(ref(db, 'users/' + i.uid), {
        role: '',
      })
        .then(() => {
          console.log('data update succesfully');
          auth().signOut();
        })
        .catch(error => {
          console.log('error', error.meassage);
        });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <IonIcon
            onPress={signOut}
            color={colors.black}
            name="log-out-outline"
            size={35}
          ></IonIcon>
        </TouchableOpacity>
        <View style={styles.headertextview}>
          <Text style={styles.headertext}>{rolevalue}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <IonIcon
            onPress={() => navigation.navigate('Profile')}
            color={colors.projectgreen}
            name="person-circle-outline"
            size={35}
          ></IonIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.searchbarview}>
        <TextInput
          style={styles.searchinput}
          placeholder="Search Here"
          placeholderTextColor={'gray'}
        ></TextInput>

        <View style={styles.verticleLine}></View>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.searchicon}
            source={require('../../Assests/Images/search.png')}
          ></Image>
        </TouchableOpacity>
      </View>
      {rolevalue == 'Buyer' ? <Buyer /> : <Vendor />}
    </View>
  );
};
export default Dashboard;
