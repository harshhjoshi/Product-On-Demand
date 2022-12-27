import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ref, update, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import Buyer from './componnet/Buyer';
import Vendor from './componnet/Vendor';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Picker} from '@react-native-picker/picker';

import {colors} from '../../styles/variables';

const Dashboard = ({navigation}) => {
  const [rolevalue, setRoleValue] = useState('Buyer');

  const[user,setUser]=useState("");

  useEffect(() => { 
    setUser(auth().currentUser)
    if(user){
      const dbRef = ref(db, 'users/' + user.uid);
      onValue(dbRef, snapshot => {
        var snapVal = snapshot.val();
        setRoleValue(snapVal.role);
      });
    }

    },[user]);

  const signOut = () => {
    if(user){
      update(ref(db, 'users/' + user.uid), {
        role: '',
      })
        .then(() => {
          console.log(' signout succesfully');
          auth().signOut();
        })
        .catch(error => {
          console.log('error', error.meassage);
        });
    }
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
     
      {rolevalue == 'Buyer' ? <Buyer /> : <Vendor />}
    </View>
  );
};
export default Dashboard;
