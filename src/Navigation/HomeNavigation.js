import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import Introduction from '../Screens/IntroScreen';
import Splash from '../Screens/SplashScreen';
// import { Splash } from '../Screens/SplashScreen';
import AuthNavigation from './AuthNavigation';
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const options = {
    headerShown: false,
  };
  
  return (
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen
          name="splash_screen"
          component={Splash}
   
        />
       <Stack.Screen
          name="intro_screen"
          component={Introduction}

        />
         <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}

        />
      </Stack.Navigator>
  );
};

export default HomeNavigation;