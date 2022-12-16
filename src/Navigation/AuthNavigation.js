import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';

import Signup from '../Screens/SignupScreen';
import Signin from '../Screens/SigninScreen';
import Splash from '../Screens/SplashScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (

    <Stack.Navigator>
             <Stack.Screen
          name="splash_screen"
          component={Splash}
        //   options={styles.splashStyle}
        />
      <Stack.Screen
        name="Signin_screen"
        component={Signin}
        // options={styles.splashStyle}
      />
      <Stack.Screen
        name="signup_screen"
        component={Signup}
        // options={styles.splashStyle}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;