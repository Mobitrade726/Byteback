// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import StackNavigator from './StackNavigator';
// import Toast from 'react-native-toast-message';
// import { navigationRef } from '../navigation/TabNavigator/RootNavigation';

// const DrawerNavigator = () => {
//   return (
//     <NavigationContainer ref={navigationRef}>
//         <StackNavigator />
//         <Toast />
//     </NavigationContainer>
//   );
// };

// export default DrawerNavigator;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import Toast from 'react-native-toast-message';
import { navigationRef } from '../navigation/TabNavigator/RootNavigation';
import { logout } from '../redux/slices/authSlice';
import { registerSessionExpired } from '../utils/sessionBridge';
import SessionExpiredModal from '../constants/SessionExpiredModal';
import { useDispatch } from 'react-redux';

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    registerSessionExpired(() => {
      setSessionExpired(true);
    });
  }, []);

  const handleLoginRedirect = () => {
    setSessionExpired(false);
    dispatch(logout());

    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
      <Toast />
      <SessionExpiredModal
        visible={sessionExpired}
        onLogin={handleLoginRedirect}
      />
    </NavigationContainer>
  );
};

export default DrawerNavigator;
