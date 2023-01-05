import React ,{useContext}from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import { ThemeContext } from '../ThemeContext';
import { colors } from '../styles/variables';
import {useTranslation} from 'react-i18next';


const MainNavigation = () => {
  const {theme,setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  return ( 
    <NavigationContainer> 
       <StatusBar translucent={false} backgroundColor={theme === "light" ? "white":"black"} barStyle={theme === "light" ?"dark-content":'light-content'} />
       
         {<HomeNavigation />}
    </NavigationContainer>
  );
};
export default MainNavigation;
