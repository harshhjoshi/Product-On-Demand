import React,{useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Introduction from '../Screens/IntroScreen';
import Signin from '../Screens/SigninScreen';
import Signup from '../Screens/SignupScreen';
import Tabs from './Tabs';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Profile';
import List from '../Screens/List';
import Favorite from '../Screens/FavoriteScreen';
import Cart from '../Screens/Cart';
import { ThemeContext } from '../ThemeContext';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const {theme,setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  const options = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="intro_screen" component={Introduction} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Signin_screen" component={Signin} />
      <Stack.Screen name="signup_screen" component={Signup} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
