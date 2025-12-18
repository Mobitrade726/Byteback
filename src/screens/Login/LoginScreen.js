import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  useColorScheme,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils/utils';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { setAuthData } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import AlertModal from '../../constants/AlertModal';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  // ✅ Validation
  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (
      !emailRegex.test(emailOrPhone.trim()) &&
      !phoneRegex.test(emailOrPhone.trim())
    ) {
      newErrors.emailOrPhone = 'Enter a valid email or phone';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const fineCheck = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        const coarseCheck = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );

        if (!fineCheck || !coarseCheck) {
          Alert.alert(
            'Location Required',
            'Please go to settings and enable location manually.',
            [
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
              { text: 'Cancel', style: 'cancel' },
            ],
          );

          // ❗IMPORTANT → no setLoading here
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (
            granted === PermissionsAndroid.RESULTS.DENIED ||
            granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          ) {
            return false;
          }

          return true;
        }

        return true;
      }

      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    } catch (e) {
      return false;
    }
  };

  const getLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 20000, // 🔥 20 sec timeout
          maximumAge: 5000,
          forceRequestLocation: true,
        },
      );
    });

  const handleLogin = async () => {
    const isValid = validateInputs();
    if (!isValid) return;

    try {
      // 1️⃣ Request location permission
      const permissionGranted = await requestLocationPermission();
      setLoading(true);

      let loc = null;
      let addr = null;

      // 2️⃣ Device Info
      const deviceType = DeviceInfo.getSystemName();
      const deviceId = await DeviceInfo.getUniqueId(); // 🔥 FIX: no ._j

      // 3️⃣ If permission granted → fetch location safely
      if (permissionGranted) {
        try {
          loc = await getLocation(); // This should have its own timeout internally
        } catch (e) {
          setLoading(false);
          console.log('Location Error:', e);
        }

        // 4️⃣ Reverse-geocoding (only if location exists)
        if (loc) {
          try {
            const response = await axios.get(
              'https://nominatim.openstreetmap.org/reverse',
              {
                params: {
                  format: 'json',
                  lat: loc.latitude,
                  lon: loc.longitude,
                  zoom: 10,
                  addressdetails: 1,
                  email: 'support@yourapp.com',
                },
                timeout: 25000, // 🔥 FIX: safe timeout
              },
            );

            const addressData = response?.data?.address;

            addr = {
              city:
                addressData?.city ||
                addressData?.town ||
                addressData?.village ||
                addressData?.hamlet ||
                'Unknown',
              state: addressData?.state || 'Unknown',
            };
          } catch (error) {
            setLoading(false);
            console.log('Reverse Geocode Error:', error?.message);
            // Continue login even if address fails
          }
        }
      }

      // 5️⃣ Login API
      const response = await axios.post(`${API_BASE_URL}/buyer/login`, {
        email: emailOrPhone,
        password: password,
        device_type: deviceType,
        city: addr.city,
        state: addr.state,
        device_id: deviceId,
      });

      // 6️⃣ Handle success
      if (response.data.status === true) {
        const token = response.data.data.token;
        const userId = response.data.data.user_id;

        // await AsyncStorage.setItem('TOKEN', token);
        // await AsyncStorage.setItem('USERID', String(userId));
        // await AsyncStorage.setItem('DEVICEID', deviceId);

        dispatch(setAuthData({ token, userId, deviceId }));

        setAlertMessage(response.data.message);
        setAlertType('success'); // "error", "warning" bhi kar sakte ho
        setAlertVisible(true);
        // navigation.navigate('BottomNavigator');
      } else {
        setAlertMessage(response.data.message);
        setAlertType('error');
        setAlertVisible(true);
        setLoading(false);
      }
    } catch (error) {
      setAlertMessage(error?.response?.data?.message || error.message);
      setAlertType('error');
      setAlertVisible(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginHorizontal: moderateScale(10) }}>
          {/* Back Arrow */}
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => BackHandler.exitApp()}
          >
            <Ionicons
              name="chevron-back-outline"
              size={moderateScale(24)}
              style={{
                backgroundColor: '#fff',
                borderRadius: moderateScale(20),
                padding: moderateScale(6),
              }}
            />
          </TouchableOpacity> */}

          <Text style={styles.title}>Hey!</Text>

          {/* Email or Phone */}
          <TextInput
            style={[
              styles.input,
              errors.emailOrPhone && { borderColor: 'red' },
            ]}
            placeholder="Email or Phone"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
          {errors.emailOrPhone && (
            <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
          )}

          {/* Password */}
          {/* <TextInput
            style={[styles.input, errors.password && {borderColor: 'red'}]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )} */}

          <View style={{ position: 'relative' }}>
            <TextInput
              style={[styles.input, errors.password && { borderColor: 'red' }]}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
              secureTextEntry={!showPassword} // 👈 Hide/Show logic
              value={password}
              onChangeText={setPassword}
            />

            {/* 👁️ Password Toggle Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: moderateScale(15),
                top: moderateScale(18),
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            // onPress={() => navigation.navigate('ForgetPassword')}
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Log in</Text>
            )}
          </TouchableOpacity>

          {/* ✅ AlertModal should be here, inside root View */}
          {/* <AlertModal
            visible={alertVisible}
            title="Success"
            message={alertMessage}
            type={alertType}
            onOk={() => {
              setAlertVisible(false);
              navigation.navigate('BottomNavigator');
            }}
            onClose={() => setAlertVisible(false)}
          /> */}

          <AlertModal
            visible={alertVisible}
            title={alertType === 'success' ? 'Success' : 'Error'}
            message={alertMessage}
            type={alertType}
            onOk={() => {
              setAlertVisible(false);

              // 👉 ONLY SUCCESS case navigate karega
              if (alertType === 'success') {
                setAlertVisible(false);
                navigation.navigate('BottomNavigator');
              }
            }}
            onClose={() => setAlertVisible(false)}
          />

          {/* Sign Up */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('LandingPage')}
            style={styles.signupButton}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
            <Text style={styles.bottomText}>New here? <Text style={{color:"#478F4E"}}>Create an Account</Text></Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
