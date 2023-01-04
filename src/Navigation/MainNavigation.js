import React ,{useContext}from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import { ThemeContext } from '../ThemeContext';
import { colors } from '../styles/variables';
const MainNavigation = () => {
  const {theme,setTheme} = useContext(ThemeContext);

  return ( 
    <NavigationContainer> 
       <StatusBar translucent={false} backgroundColor={theme === "light" ? "white":"black"} barStyle={theme === "light" ?"dark-content":'light-content'} />
       
         {<HomeNavigation />}
    </NavigationContainer>
  );
};
export default MainNavigation;
