import React,{useState,useEffect  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import HomeNavigation from './HomeNavigation';
import AuthNavigation from './AuthNavigation';
import auth from '@react-native-firebase/auth';
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
    return (
        <NavigationContainer>

            {!user ? <AuthNavigation/> : <HomeNavigation/>}
        </NavigationContainer>
    )
}
export default MainNavigation;