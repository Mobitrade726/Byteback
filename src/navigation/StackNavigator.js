import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import BottomNavigator from './BottomNavigator';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
        <>
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </>
    </Stack.Navigator>
  );
};

export default StackNavigator;
