import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import HomeNavigation from './HomeNavigation';
import AuthNavigation from './AuthNavigation';

const MainNavigation = () => {
const user ="";
    return (
        <NavigationContainer>
            {user ? <AuthNavigation/> : <HomeNavigation/>}
        </NavigationContainer>
    )
}
export default MainNavigation;