import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';

import Signup from '../Screens/SignupScreen';
import Signin from '../Screens/SigninScreen';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Profile';
import AuthNavigation from './AuthNavigation';
import UserSelection from '../Screens/UserSelection';


const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  const options = {
    headerShown: false,
  };
  
  return (

      <Stack.Navigator screenOptions={options}> 
     
         <Stack.Screen
          name="UserSelection"
          component={UserSelection}
        />
    
                <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}

        />
        
      </Stack.Navigator>
  );
};

export default UserNavigation;