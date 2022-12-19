import React, {useEffect} from 'react';
import {View, Text, Image,StatusBar} from 'react-native';
import { colors } from '../../styles/variables';

import {styles} from './styles';

const Splash = ({navigation}) => {
<StatusBar 
hidden={true}
barStyle="light-content" />
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('intro_screen'); //Navigate to your destination screen
      navigation.reset({
        index: 0,
        routes: [{name: 'intro_screen'}], //Remove the custom screen from history
      });
    }, 3000); // set your time out here in miliseconds
  }, []);

  return (
    <View style={styles.container}>
           <StatusBar  
                    backgroundColor = "#f2f2f2"  
                    barStyle = "dark-content"   
                    hidden = {false}    
                    translucent = {true}  
                />  
      <StatusBar  
                    backgroundColor ={colors.black}  
                    barStyle = "light-content"    
                    hidden = {false}    
                    translucent = {true}  
                /> 
      <Image
        style={styles.logo}
        source={require('../../Assests/Images/logo.png')}
      />
      {/* <Text style={styles.logotext}>Product Demand Service</Text> */}
    </View>
  );
};
export default Splash;
