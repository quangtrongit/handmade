import 'react-native-gesture-handler';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/HomeScreen/NotificationScreen';
import NotificationScreen from '../screens/HomeScreen/ProfileScreen';
const Tab = createBottomTabNavigator();

const OverviewTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#157cdb',
        inactiveTintColor: '#262626',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="notifications" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OverviewTabNavigator;
