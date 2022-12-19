import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';

import Signup from '../Screens/SignupScreen';
import Signin from '../Screens/SigninScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const options = {
    headerShown: false,
  };
  
  return (

    <Stack.Navigator screenOptions={options}> 
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