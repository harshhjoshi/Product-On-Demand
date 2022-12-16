import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import Introduction from '../Screens/IntroScreen';
// import { Splash } from '../Screens/SplashScreen';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
      <Stack.Navigator>
 
       <Stack.Screen
          name="intro_screen"
          component={Introduction}
        //   options={styles.splashStyle}
        />
      </Stack.Navigator>
  );
};

export default HomeNavigation;