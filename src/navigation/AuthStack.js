import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import LoginScreen from '../screens/Login/LoginScreen';
import Signup from '../screens/SignupScreen/Signup';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import LandingPage from '../screens/Landing/LandingPage';
import Signup_Address from '../screens/SignupScreen/Signup_Address';
import SignUpTab from '../screens/SignupScreen/SignUpTab';
import ConfirmSignup from '../screens/SignupScreen/ConfirmSignup';
import ForgetOTP from '../screens/ForgetPassword/ForgetOTP';
import setPassword from '../screens/ForgetPassword/setPassword';
import Home from '../screens/Home/Home';
import ForgetEmail from '../screens/ForgetEmail/ForgetEmail'
import ForgetEmailDetils from '../screens/ForgetEmail/ForgetEmailDetils'


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Signup_Address" component={Signup_Address} />
      <Stack.Screen name="SignUpTab" component={SignUpTab} />
      <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
      <Stack.Screen name="ForgetOTP" component={ForgetOTP} />
      <Stack.Screen name="setPassword" component={setPassword} />
      <Stack.Screen name="ForgetEmail" component={ForgetEmail} />
      <Stack.Screen name="ForgetEmailDetils" component={ForgetEmailDetils} />
    </Stack.Navigator>
  );
}
