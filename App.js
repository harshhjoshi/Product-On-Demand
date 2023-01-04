import React,{useEffect} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {mystore} from'./src/Redux/MyStore'
import { Provider, useDispatch } from 'react-redux';
import {ThemeProvider} from './src/ThemeContext';
const App = () => {
   useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    },[]);

   return (
    <ThemeProvider>
   <MainNavigation/>
   </ThemeProvider>)
}

export default App;
