import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {db} from '../Firebase/config';
import {ref,onValue} from "@firebase/database";
import HomeNavigation from './HomeNavigation';
import UserNavigation from './UserNavigation';
import { ActivityIndicator } from 'react-native-paper';

const MainNavigation = () => {
  const [loading, setloading] = useState(true)
  const [user, setUser] = useState("");
  const [rolefiled, setRoleFiled]= useState("");
  useEffect(() => {
    setTimeout(() =>{
      setloading(false)
    },5000)
  auth().onAuthStateChanged(u => {
      setUser(u)
  });
  if(user){
    console.log("hello");
   const dbRef = ref(db, 'users/' + user.uid);
   onValue(dbRef, snapshot => {
   var snapVal = snapshot.val()
   setRoleFiled(snapVal.role)
  })
  }
}, [user,loading,rolefiled]);

  console.log('main navigation screen user:-', user);
  console.log('main navigation screen RoleFild:-', rolefiled );
  return ( 
    <NavigationContainer>
      
        
         {<HomeNavigation />}
        
      

      
     
    </NavigationContainer>
  );
};
export default MainNavigation;
