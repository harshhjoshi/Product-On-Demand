import React,{useEffect,useContext} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {mystore} from'./src/Redux/MyStore'
import { Provider, useDispatch } from 'react-redux';
import {ThemeProvider} from './src/ThemeContext';
import { Alert,BackHandler, View } from 'react-native';
import { ThemeContext } from './src/ThemeContext';
import './src/localization/i18n';
import { useNetInfo } from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import PushController from './src/Components/pushControllers';

const App = () => {
// useEffect(()=>{
//   token()
// messaging().setBackgroundMessageHandler(async remoteMessage=>{
//   console.log("background message",remoteMessage)
// })

// const  unsubscribe=messaging().onMessage(async remoteMessage=>{
//   Alert.alert(JSON.stringify(remoteMessage))
// });
// return unsubscribe;
 
// },[]);

const token=async()=>{
const fcmToken=await messaging().getToken();
if(fcmToken){
console.log("token>>>>>",fcmToken)
}
}
  const netInfo = useNetInfo();
  useEffect(() => {
    if(netInfo.isConnected != false){
      SplashScreen.hide();

    }
  }, []);
  
  if (netInfo.isConnected === false) {
    Alert.alert(
      "Internet is not connected!",
      "Please make sure you are connected to the Internet and try again.",
      [
        { text: "Ok Sure", style: "ok", onPress: () => BackHandler.exitApp() }
      ]
    );
  }
   useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    },[]);

   return (
    <View style={{flex:1}}>
      <PushController/>
    <ThemeProvider>
            
   <MainNavigation/>
   </ThemeProvider>
   </View>
   )
}

export default App;
