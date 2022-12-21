import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import Introduction from '../Screens/IntroScreen';
import Splash from '../Screens/SplashScreen';
// import { Splash } from '../Screens/SplashScreen';
import AuthNavigation from './AuthNavigation';
import Signin from '../Screens/SigninScreen';
import Signup from '../Screens/SignupScreen';
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const options = {
    headerShown: false,
  };
  
  return (
      <Stack.Navigator screenOptions={options}>
   
       <Stack.Screen
          name="intro_screen"
          component={Introduction}

        />
           <Stack.Screen
          name="Signin_screen"
          component={Signin}
        />
        <Stack.Screen
          name="signup_screen"
          component={Signup}
        />
         <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}

        />
      </Stack.Navigator>
  );
};

export default HomeNavigation;