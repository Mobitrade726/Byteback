import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import Header from '../../../../constants/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import { API_BASE_URL } from '../../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  fetchDevicesAPI,
  logoutAllDevicesAPI,
} from '../../../../redux/slices/logoutDevicesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../../redux/slices/authSlice';
import AlertModal from '../../../../constants/AlertModal';

console.log('API_BASE_URL+++++++++++++++++++++++++++', API_BASE_URL);

const Settings = ({ navigation }) => {
  const route = useRoute();
  const { cat, profileEdit } = route.params || [];

  const userId = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('');

  console.log('userId-------------->', userId);

  // const deleteAccountApi = async () => {
  //   try {
  //     const buyerId = userId;

  //     const response = await axios.delete(
  //       `${API_BASE_URL}/deleteBuyer/${buyerId}`,
  //     );

  //     console.log('response?.data+++++++++++++++++', response?.data?.message);

  //     if (response?.data?.status === true) {
  //       Alert.alert(
  //         'Success',
  //         response?.data?.message, // ✅ dynamic message
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               dispatch(logoutAllDevicesAPI())
  //                 .unwrap()
  //                 .then(message => {
  //                   Toast.show({ type: 'success', text2: message });
  //                   navigation.reset({
  //                     index: 0,
  //                     routes: [{ name: 'LoginScreen' }],
  //                   });
  //                   fetchDevicesAPI();
  //                 })
  //                 .catch(err => {
  //                   console.log('Logout devices error:', err);
  //                 });
  //             },
  //           },
  //         ],
  //       );
  //     } else {
  //       Alert.alert('Error', response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log('error------------>', error?.response?.data?.message);

  //     Alert.alert(
  //       'Error',
  //       error?.response?.data?.message || 'Something went wrong',
  //     );
  //   }
  // };

  // const deleteAccountApi = async () => {
  //   try {
  //     const buyerId = userId;

  //     const response = await axios.delete(
  //       `${API_BASE_URL}/deleteBuyer/${buyerId}`,
  //     );

  //     console.log('response?.data+++++++++++++++++', response?.data?.message);

  //     if (response?.data?.status === true) {
  //       Alert.alert('Success', response?.data?.message, [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             // Redux logout
  //             dispatch(logoutAllDevicesAPI());

  //             // Navigate
  //             navigation.replace('LoginScreen');
  //           },
  //         },
  //       ]);
  //     } else {
  //       Alert.alert('Error', response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log('error------------>', error?.response?.data?.message);
  //     Alert.alert(
  //       'Error',
  //       error?.response?.data?.message || 'Something went wrong',
  //     );
  //   }
  // };

  // import AsyncStorage from '@react-native-async-storage/async-storage';

  // const deleteAccountApi = async () => {
  //   try {
  //     const buyerId = userId;

  //     const response = await axios.delete(
  //       `${API_BASE_URL}/deleteBuyer/${buyerId}`,
  //     );

  //     if (response?.data?.status === true) {
  //       Alert.alert('Success', response?.data?.message, [
  //         {
  //           text: 'OK',
  //           onPress: async () => {
  //             // logout devices api
  //             dispatch(logoutAllDevicesAPI());

  //             // clear storage
  //             await AsyncStorage.clear();

  //             // redux logout
  //             dispatch(logout());

  //             // reset navigation
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: 'LoginScreen' }],
  //             });
  //           },
  //         },
  //       ]);
  //     } else {
  //       Alert.alert('Error', response?.data?.message);
  //     }
  //   } catch (error) {
  //     Alert.alert(
  //       'Error',
  //       error?.response?.data?.message || 'Something went wrong',
  //     );
  //   }
  // };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => deleteAccountApi(),
        },
      ],
      { cancelable: true },
    );
  };

  // const deleteAccountApi = async () => {
  //   try {
  //     const buyerId = userId;

  //     const response = await axios.delete(
  //       `${API_BASE_URL}/deleteBuyer/${buyerId}`,
  //     );

  //     console.log('response?.data+++++++++++++++++', response?.data?.message);

  //     if (response?.data?.status === true) {
  //       setAlertMessage(response?.data?.message); // dynamic message
  //       setAlertType('success');
  //       setAlertVisible(true);
  //     } else {
  //       setAlertMessage(response?.data?.message);
  //       setAlertType('error');
  //       setAlertVisible(true);
  //     }
  //   } catch (error) {
  //     setAlertMessage(error?.response?.data?.message || 'Something went wrong');
  //     setAlertType('error');
  //     setAlertVisible(true);
  //   }
  // };

  const deleteAccountApi = async () => {
    try {
      const buyerId = userId;

      const response = await axios.delete(
        `${API_BASE_URL}/deleteBuyer/${buyerId}`,
      );

      console.log('response?.data+++++++++++++++++', response?.data?.message);

      if (response?.data?.status === true) {
        setAlertMessage(response?.data?.message);
        setAlertType('success');
        setAlertVisible(true);
      } else {
        setAlertMessage(response?.data?.message);
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage(error?.response?.data?.message || 'Something went wrong');
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <Header title="Settings" navigation={navigation} showBack={true} />

      <ScrollView style={styles.container}>
        {/* Settings Items */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignUpTab', {
              cat: cat,
              profileEdit: profileEdit,
            })
          }
          style={styles.item}
        >
          <AntDesign name="user" size={moderateScale(15)} style={styles.icon} />
          <Text style={styles.text}>Edit Profile</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <View
          onPress={() => navigation.navigate('PushNotification')}
          style={styles.item}
        >
          <Ionicons
            name="notifications-outline"
            size={moderateScale(15)}
            style={styles.icon}
          />
          <Text style={styles.text}>Push Notifications</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </View>

        <View
          onPress={() => navigation.navigate('Privacy')}
          style={styles.item}
        >
          <Ionicons
            name="lock-closed-outline"
            size={moderateScale(15)}
            style={styles.icon}
          />
          <Text style={styles.text}>Privacy</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.item}
        >
          <Ionicons
            name="lock-closed-outline"
            size={moderateScale(15)}
            style={styles.icon}
          />
          <Text style={styles.text}>Change Password</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.item}>
          <AntDesign
            name="delete"
            size={moderateScale(15)}
            style={styles.icon}
          />
          <Text style={styles.text}>Account Delete</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => confirmDeleteAccount()}
          style={styles.item}
        >
          <AntDesign
            name="delete"
            size={moderateScale(15)}
            style={styles.icon}
          />

          <Text style={styles.text}>Account Delete</Text>

          <Ionicons
            name="chevron-forward"
            size={moderateScale(15)}
            style={styles.arrow}
          />
        </TouchableOpacity>

        {/* Section Header */}
        {/* <Text style={styles.sectionTitle}>Account Settings</Text> */}

        {/* <View style={styles.item}>
          <MaterialCommunityIcons
            name="view-grid-outline"
            size={22}
            style={styles.icon}
          />
          <Text style={styles.text}>View Logged-in Devices</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </View> */}

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('DeleteAccount')}
          style={styles.item}>
          <Ionicons name="arrow-undo-outline" size={22} style={styles.icon} />
          <Text style={styles.text}>Delete My Account</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.arrow} />
        </TouchableOpacity> */}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LogoutDevices')}
          style={styles.logoutButton}
        >
          <SimpleLineIcons
            name="logout"
            size={moderateScale(15)}
            color="#fff"
          />
          <Text style={styles.logoutText}>Logout from all devices</Text>
        </TouchableOpacity>

        <AlertModal
          visible={alertVisible}
          title={alertType === 'success' ? 'Success' : 'Error'}
          message={alertMessage}
          type={alertType}
          onOk={async () => {
            setAlertVisible(false);

            if (alertType === 'success') {
              // logout devices api
              dispatch(logoutAllDevicesAPI());

              // redux logout
              dispatch(logout());

              // navigate login
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            }
          }}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

export default Settings;
