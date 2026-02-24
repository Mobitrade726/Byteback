// // import axios from 'axios';
// // import { Alert } from 'react-native';
// // import { API_BASE_URL } from '../utils/utils';
// // import { store } from '../redux/store';
// // import { logout } from '../redux/slices/authSlice';
// // import { navigationRef } from '../navigation/TabNavigator/RootNavigation';
// // import AlertModal from './AlertModal';
// // import { useState } from 'react';

// // const [alertVisible, setAlertVisible] = useState(false);
// // const [alertMessage, setAlertMessage] = useState('');

// // const axiosInstance = axios.create({
// //   baseURL: API_BASE_URL,
// //   timeout: 15000,
// // });

// // let isAlertShown = false;

// // axiosInstance.interceptors.response.use(
// //   response => response,
// //   error => {
// //     const status = error?.response?.status;

// //     if (status === 401 && !isAlertShown) {
// //       isAlertShown = true;

// //       //   Alert.alert(
// //       //     'Session Expired',
// //       //     'Your session has expired. Please login again.',
// //       //     [
// //       //       {
// //       //         text: 'OK',
// //       //         onPress: () => {
// //       //           isAlertShown = false;
// //       //           store.dispatch(logout());

// //       //           navigationRef.reset({
// //       //             index: 0,
// //       //             routes: [{ name: 'LoginScreen' }],
// //       //           });
// //       //         },
// //       //       },
// //       //     ],
// //       //   );

// //       <AlertModal
// //         visible={alertVisible}
// //         title="Session Expired"
// //         message="Your session has expired. Please login again."
// //         type="error"
// //         onOk={() => {
// //           setAlertVisible(false);

// //           navigationRef.reset({
// //             index: 0,
// //             routes: [{ name: 'LoginScreen' }],
// //           });
// //         }}
// //         onClose={() => setAlertVisible(false)}
// //       />;
// //     }

// //     return Promise.reject(error);
// //   },
// // );

// // export default axiosInstance;

// import axios from 'axios';
// import { API_BASE_URL } from '../utils/utils';
// import { showTokenExpiredAlert } from '../utils/alertBridge';
// import { Alert } from 'react-native';
// import { store } from '../redux/store';
// import { logout } from '../redux/slices/authSlice';
// import { navigationRef } from '../navigation/TabNavigator/RootNavigation';
// import SessionExpiredModal from './SessionExpiredModal';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';

//   const [sessionExpired, setSessionExpired] = useState(false);

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// let isAlertShown = false;

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error?.response?.status === 401 && !isAlertShown) {
//       isAlertShown = true;
//         Alert.alert(
//           'Session Expired',
//           'Your session has expired. Please login again.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 isAlertShown = false;
//                 store.dispatch(logout());
//                 navigationRef.reset({
//                   index: 0,
//                   routes: [{ name: 'LoginScreen' }],
//                 });
//               },
//             },
//           ],
//         );
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;

import axios from 'axios';
import { API_BASE_URL } from '../utils/utils';
import { logout, sessionExpired } from '../redux/slices/authSlice';
import { store } from '../redux/store';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      // triggerSessionExpired(); // 🔥 MODAL OPEN SIGNAL
      store.dispatch(sessionExpired());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
