import React,{useState,useEffect  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import HomeNavigation from './HomeNavigation';
import AuthNavigation from './AuthNavigation';
import auth from '@react-native-firebase/auth';
import Splash from '../Screens/SplashScreen';
const MainNavigation = () => {

const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing)setInitializing(false)  
    }
    
    useEffect(() => { 
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

     if (initializing) return null;
     console.log("usermm", user);
     const options = {
        headerShown: false,
      };
const Stack = createNativeStackNavigator();

    return (
  
        <NavigationContainer>
      {/* <Stack.Navigator screenOptions={options}> 
      <Stack.Screen
          name="splash_screen"
          component={Splash}
   
        />
        </Stack.Navigator> */}


            {user ? <AuthNavigation/> : <HomeNavigation/>}
        </NavigationContainer>
    )
}
export default MainNavigation;