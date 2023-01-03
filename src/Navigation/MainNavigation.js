import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';

const MainNavigation = () => {
  return ( 
    <NavigationContainer> 
         {<HomeNavigation />}
    </NavigationContainer>
  );
};
export default MainNavigation;
