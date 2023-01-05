import React ,{useContext}from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image,StatusBar, View} from 'react-native';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Profile';
import List from '../Screens/List';
import Favorites from '../Screens/FavoriteScreen';
import { colors } from '../styles/variables';
import { ThemeContext } from '../ThemeContext';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  const {theme,setTheme} = useContext(ThemeContext);
  const {t, i18n} = useTranslation();

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#58ceb2',
  
    tabBarStyle: {

      height: 60,
      paddingBottom: 5,
      backgroundColor:theme=='light'?colors.white:colors.black,

    },
   
  };
  console.log('theme',theme)
  return (
    <View style={{flex:1}}>
 
    <Tab.Navigator screenOptions={  screenOptions}>
        
      <Tab.Screen
        name={t("Home")} 
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              fadeDuration={0}
              style={{width: 24, height: 24, opacity: focused ? 1 : 0.8}}
              source={require('../Assests/Images/house.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("Favourites")}
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{width: 24, height: 24, opacity: focused ? 1 : 0.8}}
              source={require('../Assests/Images/favourite.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("List")}
        component={List}
        options={{
          tabBarBadge: 2,
          tabBarIcon: ({focused}) => (
            <Image
              fadeDuration={0}
              style={{width: 24, height: 24, opacity: focused ? 1 : 0.8}}
              source={require('../Assests/Images/list.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t("Profile")}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              fadeDuration={0}
              style={{width: 24, height: 22, opacity: focused ? 1 : 0.8}}
              source={require('../Assests/Images/man.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
};
export default Tabs;
