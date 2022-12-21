import React, { useEffect, useState } from "react";
import { View ,Text,Image, ScrollView,FlatList, TouchableOpacity} from "react-native";
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ref,onValue} from "@firebase/database";
import {db} from '../../Firebase/config';
import auth from '@react-native-firebase/auth';

const data =[{
    id: 1,
    label: "Your Favorites",
  },
  {
    id: 2,
    label: 'Location',
  },
  {
    id: 3,
    label: 'Language',
  },
  {
    id: 4,
    label: 'Tell your Friend', 
  },
  {
    id: 5,
    label: 'About US',
  },
  {
    id: 6,
    label: 'Terms and Policies',
  },
]
const Profile=({navigation})=>{
    const [Firedata,setFiredata] = useState(" ");
    const [user, setUser] = useState("");

    function onAuthStateChanged(user) {
        setUser(user.uid);  
    }
   useEffect(()=>{
    auth().onAuthStateChanged(onAuthStateChanged);
    if (user){
        const dbRef = ref(db,"users/");
        onValue(dbRef,(snapshot)=>{
          let records = [];
          snapshot.forEach(childSnapshot => {
            let keyName =childSnapshot.key;
            let data =childSnapshot.val();
            records.push({"key":keyName, "data":data})
          })
          console.log("records", user);
          var singleData = records.filter(i => i.key == user)
          console.log("singleData...", singleData);
          setFiredata(singleData[0].data)
        })   
    }
   },[user])

    useEffect(() => {
        // if (user){
        //     const dbRef = ref(db,"users/");
        //     onValue(dbRef,(snapshot)=>{
        //       let records = [];
        //       snapshot.forEach(childSnapshot => {
        //         let keyName =childSnapshot.key;
        //         let data =childSnapshot.val();
        //         records.push({"key":keyName, "data":data})
        //       })
        //       console.log("records", user);
        //       var singleData = records.filter(i => i.key == user)
        //       console.log("singleData...", singleData);
        //       setFiredata(singleData[0].data)
        //     })   
        // }
           
        },[])

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.renderStyle}>
        <IonIcon name="camera-outline" size={35}></IonIcon>
        <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity> 
      );

console.log("user profile:-",user);
console.log("firedata profile:-",Firedata);
     return(
        <View style={styles.container}>
            {/* {
                user ?  <Text>hello</Text> :<Text>loading</Text>
            } */}
           
            <View style={styles.header}>
                <View></View>
                <Text style={styles.profilealign}>Profile</Text>
                <TouchableOpacity>
                <Text style={styles.logoutalign}>Logout</Text>
                </TouchableOpacity>
            </View>
           <View style={styles.topContainer}>
            <Image source={{uri:`${Firedata.photoURL}`}}  style={styles.logo}/>
            <View style={styles.textStyle}>
                <Text style={styles.title}>{Firedata.userName}</Text>
                <Text>Seller</Text>
            </View>
           </View>
           <View style={styles.userInfo}>
                    <View><Text style={styles.emailStyle}>{Firedata.email}</Text></View>
                    <View><Text style={styles.emailStyle}>586-306-2598</Text></View>
            </View>
      
                <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
       
        </View>
     )
}
export default Profile