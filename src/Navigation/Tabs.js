import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Profile';
import List from '../Screens/List';
import Favorites from '../Screens/FavoriteScreen';

const Tab = createBottomTabNavigator();
const Tabs = ({navigation}) => {
  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#58ceb2',
    tabBarStyle: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      height: 60,
      paddingBottom: 5,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
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
        name="Favourites"
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
        name="List"
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
        name="Profile"
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
  );
};
export default Tabs;
