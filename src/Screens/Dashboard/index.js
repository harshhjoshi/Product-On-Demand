import React, { useState } from "react";
import { View,Text,Image, TouchableOpacity,TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import {ref,update} from '@firebase/database';
import {db} from '../../Firebase/config';
import Buyer from "./componnet/Buyer";
import Vendor from "./componnet/Vendor";

import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {marginHorizontal} from '../styles/variables';
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../styles/variables';

const Dashboard=({navigation})=>{
    const [user, setUser] = useState("");
    const [tab, setTab] = useState(true);


    function onAuthStateChanged(user) {
        setUser(user);
    }
    const signOut = () => {
        auth().onAuthStateChanged(onAuthStateChanged);
       
        if(user){
            console.log(user.uid);
            update(ref(db,'users/'+ user.uid ),{
                role:""
               }).then (()=>{
               console.log("data update succesfully")
               auth().signOut()
             }).catch((error)=>{
               console.log("error")
             })
        }
      
      
    }
    
    return(
    
        <View style={{flex:1,backgroundColor:colors.white}}> 
            <View
        style={{
          marginTop: spaceVertical.large,
          backgroundColor: colors.white,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity>
          <IonIcon onPress={signOut}
            color={colors.black}
            name="log-out-outline"
            size={35}></IonIcon>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 5,
            borderRadius: borderRadius.medium,
            width: responsiveWidth(56),
          }}>
          <Text
            style={{
              fontFamily: fontFamily.bold,
              fontSize: fontSize.medium,
              color: colors.projectgreen,
              textAlign: 'center',
            }}>
            Available Products
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <IonIcon
          onPress={()=>navigation.navigate('Profile')}
            color={colors.projectgreen}
            name="person-circle-outline"
            size={35}></IonIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.searchbarview}>
        <TextInput
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(80),
            fontFamily: fontFamily.regular,
            borderRadius: borderRadius.semiLarge,
          }}
          placeholder="Search Here"
          placeholderTextColor={'gray'}></TextInput>

        <View style={styles.verticleLine}></View>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.searchicon}
            source={require('../../Assests/Images/search.png')}></Image>
        </TouchableOpacity>
      </View>
        {tab?(<Buyer/>):<Vendor/>}
        
       
        {/* <TouchableOpacity onPress={()=>signOut()} >
            <Image style={{height:50,width:50,alignSelf:'center',marginTop:spaceVertical.XXlarge}} source={require('../../Assests/Images/google.png')}/>
            <Text style={{alignSelf:'center'}}>Sign Out</Text>
            </TouchableOpacity> */}
        </View>
    )
}
export default Dashboard;