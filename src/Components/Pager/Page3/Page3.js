import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { spaceVertical } from "../../../styles/variables";
import { styles } from "../PageStyles";


const Page3 = ({navigation}) => {

    
    return (
        <>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                
            <StatusBar  
                    backgroundColor = "#f2f2f2"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                    translucent = {true}  
                />  
                <View>
                    <Image source={require('../../../Assests/Images/location.png')} style={[styles.img,{overflow: 'visible'}]} resizeMode='cover'></Image>
                </View>


                <View  style={{marginTop:spaceVertical.semiSmall}}>
                    <Text style={styles.title}>Delivery on Your Location</Text>
                    <Text style={styles.subTitle}>We have the best in class individuals {'\n'} working just for you. They are well {'\n'} trained and capable of handling {'\n'} anything you need.</Text>
                </View>
            </View>
        </>
    )
}

export default Page3;