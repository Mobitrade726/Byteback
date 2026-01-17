// import { createNavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = createNavigationContainerRef();

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

// export function reset(name) {
//   if (navigationRef.isReady()) {
//     navigationRef.reset({
//       index: 0,
//       routes: [{ name }],
//     });
//   }
// }


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthStack from '../AuthStack'
import BottomNavigator from '../BottomNavigator';
import SessionExpiredModal from '../../constants/SessionExpiredModal';
import { logout } from '../../redux/slices/authSlice';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const { token, sessionExpired } = useSelector(state => state.auth);

  console.log('token---------------->', token)

  return (
    <>
      {token ? <BottomNavigator /> : <AuthStack />}

      {/* 🔥 SESSION EXPIRED MODAL */}
      <SessionExpiredModal
        visible={sessionExpired}
        onLogin={() => {
          dispatch(logout());
        }}
      />
    </>
  );
};

export default RootNavigation;
