import React from "react";
import { View,Text,Image, TouchableOpacity } from "react-native";
import { responsiveHeight, responsiveWidth, spaceVertical } from "../../styles/variables";
import auth from "@react-native-firebase/auth";

const Dashboard=({navigation})=>{
    const signOut = () => {
        return auth().signOut()
    }
    return(
        <View style={{flex:1}}> 
        <TouchableOpacity onPress={()=>signOut()} >
            <Image style={{height:50,width:50,alignSelf:'center',marginTop:spaceVertical.XXlarge}} source={require('../../Assests/Images/google.png')}/>
            </TouchableOpacity>
            <Text style={{alignSelf:'center'}}>Sign Out </Text>

            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}  >
            <Image style={{height:50,width:50,alignSelf:'center',marginTop:spaceVertical.extraLarge}} source={require('../../Assests/Images/google.png')}/>
            </TouchableOpacity>
            <Text style={{alignSelf:'center'}}>Profile screen</Text>

            <Text style={{alignSelf:'center',marginVertical:60}}>Dashboard screen</Text>
        </View>
    )
}
export default Dashboard;