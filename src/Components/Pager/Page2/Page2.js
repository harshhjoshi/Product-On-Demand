import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { spaceVertical } from "../../../styles/variables";
import { styles } from "../PageStyles";


const Page2 = ({navigation}) => {
    return (
        <>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <View>
                    <Image source={require('../../../Assests/Images/seller.png')} style={[styles.img, { overflow: 'visible' }]} resizeMode='cover'></Image>
                </View>

                <TouchableOpacity style={styles.skipButton} onPress={()=> navigation.navigate( 'Signin_screen' )}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                <View style={{ marginTop: spaceVertical.semiSmall }}>
                    <Text style={styles.title}>Seller's Profit</Text>
                    <Text style={styles.subTitle}>We have the best in class individuals working just for you. They are well trained and capable of handling anything you need.</Text>
                </View>
            </View>
        </>
    )
}

export default Page2;