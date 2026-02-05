// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Text,
// // //   StyleSheet,
// // //   View,
// // //   Image,
// // //   TouchableOpacity,
// // //   Dimensions,
// // //   Appearance,
// // // } from 'react-native';
// // // import NetInfo from '@react-native-community/netinfo';
// // // import DrawerNavigator from './src/navigation/DrawerNavigator';
// // // import { Provider, useSelector } from 'react-redux';
// // // import { store, persistor } from './src/redux/store';
// // // import { PersistGate } from 'redux-persist/integration/react';
// // // import AuthStack from './src/navigation/AccountStack';
// // // import BottomNavigator from './src/navigation/BottomNavigator';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // const { width } = Dimensions.get('window');

// // // const App = () => {
// // //   const token = useSelector(state => state.auth.token);
// // //   const [isConnected, setIsConnected] = useState(true);
// // //   // 🔒 Force Light Mode
// // //   Appearance.setColorScheme('light');
// // //   const checkConnection = () => {
// // //     NetInfo.fetch().then(state => {
// // //       setIsConnected(state.isConnected);
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     const unsubscribe = NetInfo.addEventListener(state => {
// // //       setIsConnected(state.isConnected);
// // //     });

// // //     return () => unsubscribe();
// // //   }, []);

// // //   if (isConnected) {
// // //     return (
// // //       <Provider store={store}>
// // //         <PersistGate loading={null} persistor={persistor}>
// // //           {/* <DrawerNavigator /> */}
// // //           <NavigationContainer>
// // //             {token ? <BottomNavigator /> : <AuthStack />}
// // //           </NavigationContainer>
// // //         </PersistGate>
// // //       </Provider>
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //       <View style={styles.container}>
// // //         <Image
// // //           source={require('./assets/images/no-wifi.png')} // Update path as needed
// // //           style={styles.image}
// // //           resizeMode="contain"
// // //         />
// // //         <Text style={styles.title}>Oops!</Text>
// // //         <Text style={styles.message}>
// // //           Slow or no internet connection.{'\n'}Check your internet settings.
// // //         </Text>
// // //         <TouchableOpacity style={styles.button} onPress={checkConnection}>
// // //           <Text style={styles.buttonText}>Try again</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     paddingHorizontal: 24,
// // //     backgroundColor: '#fff',
// // //   },
// // //   image: {
// // //     width: width * 0.6,
// // //     height: 200,
// // //     marginBottom: 32,
// // //   },
// // //   title: {
// // //     fontSize: 24,
// // //     fontWeight: '700',
// // //     color: '#3ac5b9',
// // //     marginBottom: 12,
// // //   },
// // //   message: {
// // //     fontSize: 16,
// // //     color: '#555',
// // //     textAlign: 'center',
// // //     marginBottom: 32,
// // //     lineHeight: 24,
// // //   },
// // //   button: {
// // //     backgroundColor: '#3ac5b9',
// // //     paddingHorizontal: 30,
// // //     paddingVertical: 14,
// // //     borderRadius: 8,
// // //   },
// // //   buttonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // // });

// // // export default App;

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   StyleSheet,
// //   View,
// //   Image,
// //   TouchableOpacity,
// //   Dimensions,
// // } from 'react-native';
// // import NetInfo from '@react-native-community/netinfo';
// // import { Provider, useSelector } from 'react-redux';
// // import { store, persistor } from './src/redux/store';
// // import { PersistGate } from 'redux-persist/integration/react';
// // import AuthStack from './src/navigation/AccountStack';
// // import BottomNavigator from './src/navigation/BottomNavigator';
// // import { NavigationContainer } from '@react-navigation/native';

// // const { width } = Dimensions.get('window');

// // /* ================= ROOT ================= */
// // const Root = () => {
// //   const token = useSelector(state => state.auth.token);

// //   if (token) {
// //     return <BottomNavigator />;
// //   }
// //   return <AuthStack />;
// // };

// // /* ================= APP ================= */
// // const App = () => {
// //   const [isConnected, setIsConnected] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = NetInfo.addEventListener(state => {
// //       setIsConnected(state.isConnected);
// //     });
// //     return unsubscribe;
// //   }, []);

// //   if (!isConnected) {
// //     return (
// //       <View style={styles.container}>
// //         <Image
// //           source={require('./assets/images/no-wifi.png')}
// //           style={styles.image}
// //           resizeMode="contain"
// //         />
// //         <Text style={styles.title}>Oops!</Text>
// //         <Text style={styles.message}>
// //           Slow or no internet connection.{'\n'}Check your internet settings.
// //         </Text>
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() =>
// //             NetInfo.fetch().then(s => setIsConnected(s.isConnected))
// //           }
// //         >
// //           <Text style={styles.buttonText}>Try again</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <Provider store={store}>
// //       <PersistGate loading={null} persistor={persistor}>
// //         <NavigationContainer>
// //           <Root />
// //         </NavigationContainer>
// //       </PersistGate>
// //     </Provider>
// //   );
// // };

// // export default App;

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';

// import NetInfo from '@react-native-community/netinfo';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { store, persistor } from './src/redux/store';
// import { PersistGate } from 'redux-persist/integration/react';

// import { NavigationContainer } from '@react-navigation/native';

// import AuthStack from './src/navigation/AuthStack';
// import BottomNavigator from './src/navigation/BottomNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';
// import SessionExpiredModal from './src/constants/SessionExpiredModal';
// import { clearSessionExpired } from './src/redux/slices/authSlice';

// const { width } = Dimensions.get('window');

// /* ================= ROOT NAV ================= */
// const RootNavigator = () => {
//   // const token = useSelector(state => state.auth.token);

//   // console.log(store.getState().auth.token);

//   // const token = store.getState().auth;
//   // console.log('AUTH STATE 👉', token);
//   const dispatch = useDispatch();

//   const { token, sessionExpired } = useSelector(state => state.auth);

//   // token present → app
//   if (token) {
//     return <BottomNavigator />;
//   }

//   // token absent → auth flow
//   return <AuthStack />;
// };

// /* ================= APP ================= */
// const App = () => {
//   const [isConnected, setIsConnected] = useState(true);
//   const {  sessionExpired } = useSelector(state => state.auth);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => unsubscribe();
//   }, []);

//   /* -------- NO INTERNET SCREEN -------- */
//   if (!isConnected) {
//     return (
//       <View style={styles.container}>
//         <Image
//           source={require('./assets/images/no-wifi.png')}
//           style={styles.image}
//           resizeMode="contain"
//         />

//         <Text style={styles.title}>Oops!</Text>
//         <Text style={styles.message}>
//           Slow or no internet connection.{'\n'}
//           Check your internet settings.
//         </Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             NetInfo.fetch().then(state => setIsConnected(state.isConnected))
//           }
//         >
//           <Text style={styles.buttonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   /* -------- MAIN APP -------- */
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <SafeAreaProvider>
//           <NavigationContainer>
//             <RootNavigator />
//             <Toast />
//             {/* 🔥 SESSION EXPIRED MODAL */}
//             <SessionExpiredModal
//               visible={sessionExpired}
//               onLogin={() => {
//                 dispatch(clearSessionExpired());
//               }}
//             />
//           </NavigationContainer>
//         </SafeAreaProvider>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

// /* ================= STYLES ================= */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//   },
//   image: {
//     width: width * 0.6,
//     height: width * 0.6,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     marginBottom: 8,
//     color: '#000',
//   },
//   message: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#666',
//     marginBottom: 20,
//     lineHeight: 22,
//   },
//   button: {
//     backgroundColor: '#000',
//     paddingHorizontal: 26,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { checkFlexibleUpdate } from './src/utils/flexibleUpdate';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import RootNavigation from './src/navigation/TabNavigator/RootNavigation';

const { width } = Dimensions.get('window');

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const [checkedUpdate, setCheckedUpdate] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      // ✅ Internet ON + Update not checked yet
      if (state.isConnected && !checkedUpdate) {
        checkFlexibleUpdate();
        setCheckedUpdate(true);
      }
    });

    return () => unsubscribe();
  }, [checkedUpdate]);

  /* -------- NO INTERNET -------- */
  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images/no-wifi.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>
          Slow or no internet connection.{'\n'}
          Check your internet settings.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            NetInfo.fetch().then(state => setIsConnected(state.isConnected))
          }
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* -------- MAIN APP -------- */
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigation />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
