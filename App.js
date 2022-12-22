import React,{useEffect} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import {mystore} from'./src/Redux/MyStore'
import { Provider, useDispatch } from 'react-redux';

const App = () => {
   useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    },[]);

   return (
   <Provider store={mystore}>
   <MainNavigation/>
   </Provider>)
}

export default App;
