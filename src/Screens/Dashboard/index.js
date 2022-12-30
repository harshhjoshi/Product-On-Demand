import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import {ref, update, onValue} from '@firebase/database';
import {db} from '../../Firebase/config';
import Buyer from './componnet/Buyer';
import Vendor from './componnet/Vendor';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Picker} from '@react-native-picker/picker';
import { TabView, SceneMap } from 'react-native-tab-view';
import {colors} from '../../styles/variables';
const FirstRoute = () => (
<Buyer/>
);

const SecondRoute = () => (
  <Vendor/>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const Dashboard = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [rolevalue, setRoleValue] = useState('Buyer');
  const [routes] = React.useState([
    { key: 'first', title: 'Products' },
    { key: 'second', title: 'Add Products' },
  ]);
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

 
  const Login=()=>{
    navigation.navigate('Signin_screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={Login} activeOpacity={0.5}>
         <Image style={styles.img} source={require('../../Assests/Images/login.png')}/>
        </TouchableOpacity>
    <Text style={styles.headertext}>Dashboard</Text>
     
        <TouchableOpacity activeOpacity={0.5}>
         <Image style={styles.img} source={require('../../Assests/Images/cartt.png')}/>
        </TouchableOpacity>
      </View>
     
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    </View>
  );
};
export default Dashboard;
