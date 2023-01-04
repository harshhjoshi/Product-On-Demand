import React,{useEffect,useContext} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {mystore} from'./src/Redux/MyStore'
import { Provider, useDispatch } from 'react-redux';
import {ThemeProvider} from './src/ThemeContext';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from './src/ThemeContext';
import './src/localization/i18n';

const App = () => {
  // const {theme, setTheme} = useContext(ThemeContext);

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
