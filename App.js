import React,{useEffect} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
   useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    },[]);

   return <MainNavigation/>
}

export default App;
