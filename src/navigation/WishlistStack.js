import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistScreen from './TabNavigator/Account/Watchlist/WatchList';



const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
    </Stack.Navigator>
  );
}
