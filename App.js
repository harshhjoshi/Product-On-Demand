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

const App = () => {
  // const {theme, setTheme} = useContext(ThemeContext);
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
    <ThemeProvider>
            
   <MainNavigation/>
   </ThemeProvider>
   </View>
   )
}

export default App;
