import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistScreen from './TabNavigator/Account/Watchlist/WatchList';
import Search from '../screens/Home/Search';



const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}
