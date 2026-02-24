// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme,
//   StatusBar,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { styles_forgetpassword } from './styles';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   resetForgotPasswordState,
//   forgotPassword,
//   forgotPasswordAPI,
// } from '../../redux/slices/forgotPasswordSlice';
// import Toast from 'react-native-toast-message';
// import AlertModal from '../../constants/AlertModal';

// const ForgotPasswordScreen = ({ navigation }) => {
//   const [emailforget, setEmail] = useState('');
//   const [selectedOption, accountType] = useState('individual');
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertType, setAlertType] = useState('success');

//   const dispatch = useDispatch();

//   const { loading, success, data, error } = useSelector(
//     state => state.forgotPassword,
//   );

//   // const handleSendCode = () => {
//   //   setSubmitted(true);
//   //   if (!validateInputs()) return;

//   //   dispatch(forgotPasswordAPI(emailforget));

//   //   console.log('data-------------------->', data);

//   //   if (data?.status === true) {
//   //     setAlertMessage(data?.message);
//   //     setAlertType('success');
//   //     setAlertVisible(true);
//   //   } else {
//   //     setAlertMessage(data?.message);
//   //     setAlertType('error');
//   //     setAlertVisible(true);
//   //   }
//   // };

//   const handleSendCode = async () => {
//     setSubmitted(true);
//     if (!validateInputs()) return;

//     try {
//       const response = await dispatch(forgotPasswordAPI(emailforget)).unwrap(); // 👈 yahin se API ka data milega

//       // 🔥 response === action.payload
//       if (response?.status === true) {
//         setAlertMessage(response?.message);
//         setAlertType('success');
//         setAlertVisible(true);

//         navigation.navigate('ForgetOTP', {email : emailforget});
//       } else {
//         setAlertMessage(response?.message);
//         setAlertType('error');
//         setAlertVisible(true);
//       }
//     } catch (err) {
//       // ❌ rejectWithValue ka data yahan milega
//       setAlertMessage(err);
//       setAlertType('error');
//       setAlertVisible(true);
//     }
//   };

//   // useEffect(() => {
//   //   if (success) {
//   // setAlertMessage('OTP sent successfully');
//   // setAlertType('success');
//   // setAlertVisible(true);
//   //   }

//   //   else if (error) {
//   // setAlertMessage(error);
//   // setAlertType('error');
//   // setAlertVisible(true);
//   //   }
//   //   console.log('error------------------->',error)
//   // }, [success, error]);

//   // ✅ Validation logic reused
//   const validateInputs = (email = emailforget) => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (email.trim() === '') {
//       newErrors.email = 'Email is required';
//     } else if (
//       !emailRegex.test(email.trim()) &&
//       !phoneRegex.test(email.trim())
//     ) {
//       newErrors.email = 'Enter a valid email';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Real-time validation if form was submitted
//   useEffect(() => {
//     if (submitted) {
//       validateInputs();
//     }
//   }, [emailforget]);

//   return (
//     <>
//       <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle="dark-content"
//       />
//       <View style={styles_forgetpassword.container}>
//         {/* Back Button */}
//         <TouchableOpacity
//           style={styles_forgetpassword.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back-outline" size={24} color="#000" />
//         </TouchableOpacity>
//         {/* Content */}
//         <View style={styles_forgetpassword.content}>
//           <Text style={styles_forgetpassword.title}>Forgot password?</Text>
//           <Text style={styles_forgetpassword.description}>
//             Don’t worry! It happens. Please enter the email associated with your
//             account.
//           </Text>

//           <Text style={styles_forgetpassword.label}>Email address</Text>
//           <TextInput
//             style={[
//               styles_forgetpassword.input,
//               errors.email && { borderColor: 'red' },
//             ]}
//             placeholder="Enter your email address"
//             placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//             keyboardType="email-address"
//             value={emailforget}
//             onChangeText={text => setEmail(text)}
//           />
//           {errors.email && (
//             <Text style={styles_forgetpassword.errorText}>{errors.email}</Text>
//           )}
//           <TouchableOpacity
//             style={[styles_forgetpassword.button, loading && { opacity: 0.7 }]}
//             onPress={handleSendCode}
//             disabled={loading}
//           >
//             <Text style={styles_forgetpassword.buttonText}>
//               {loading ? 'Sending...' : 'Send Code'}
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles_forgetpassword.footer}>
//             Remember password?{' '}
//             <Text
//               style={styles_forgetpassword.loginLink}
//               onPress={() =>
//                 navigation.navigate('LoginScreen', { accountType: accountType })
//               }
//             >
//               Log in
//             </Text>
//           </Text>

//           <AlertModal
//             visible={alertVisible}
//             title={alertType === 'success' ? 'Success' : 'Error'}
//             message={alertMessage}
//             type={alertType}
//             onOk={() => {
//               setAlertVisible(false);

//               if (alertType === 'success') {
//                 navigation.navigate('ForgetOTP', { email: emailforget });
//                 dispatch(resetForgotPasswordState());
//               }
//             }}
//             onClose={() => setAlertVisible(false)}
//           />
//         </View>
//       </View>
//     </>
//   );
// };

// export default ForgotPasswordScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles_forgetpassword } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForgotPasswordState,
  forgotPassword,
  forgotPasswordAPI,
} from '../../redux/slices/forgotPasswordSlice';
import Toast from 'react-native-toast-message';
import AlertModal from '../../constants/AlertModal';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../constants/Header';
import responsive from '../../constants/responsive';

const ForgetPassword = ({ navigation }) => {
  const [emailforget, setEmail] = useState('');
  const [selectedOption, accountType] = useState('individual');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const dispatch = useDispatch();

  const { loading, success, data, error } = useSelector(
    state => state.forgotPassword,
  );

  const handleSendCode = async () => {
    setSubmitted(true);
    if (!validateInputs()) return;

    try {
      const response = await dispatch(forgotPasswordAPI(emailforget)).unwrap(); // 👈 yahin se API ka data milega

      // 🔥 response === action.payload
      if (response?.status === true) {
        setAlertMessage(response?.message);
        setAlertType('success');
        setAlertVisible(true);
      } else {
        setAlertMessage(response?.message);
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (err) {
      // ❌ rejectWithValue ka data yahan milega
      setAlertMessage(err);
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  // ✅ Validation logic reused
  const validateInputs = (email = emailforget) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (
      !emailRegex.test(email.trim()) &&
      !phoneRegex.test(email.trim())
    ) {
      newErrors.email = 'Enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Real-time validation if form was submitted
  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [emailforget]);

  return (
    <>
      <View style={styles_forgetpassword.content}>
        <Header
          navigation={navigation}
          showBack={true}
          showSearch={false}
          onBackPress={() => navigation.goBack()}
        />
        <View style={{ paddingHorizontal: responsive.paddingHorizontal(15) }}>
          <Text style={styles_forgetpassword.title}>Forgot password?</Text>
          <Text style={styles_forgetpassword.description}>
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </Text>

          <Text style={styles_forgetpassword.label}>Email address</Text>
          <TextInput
            style={[
              styles_forgetpassword.input,
              errors.email && { borderColor: 'red' },
            ]}
            placeholder="Enter your email address"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="email-address"
            value={emailforget}
            onChangeText={text => setEmail(text)}
          />

          {errors.email && (
            <Text style={styles_forgetpassword.errorText}>{errors.email}</Text>
          )}
          <TouchableOpacity onPress={(()=> navigation.navigate('ForgetEmail'))}>
            <Text style={styles_forgetpassword.labelemail}>Forgot Email?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles_forgetpassword.button, loading && { opacity: 0.7 }]}
            onPress={() => handleSendCode()}
            disabled={loading}
          >
            <Text style={styles_forgetpassword.buttonText}>
              {loading ? 'Sending...' : 'Send Code'}
            </Text>
          </TouchableOpacity>

          <Text style={styles_forgetpassword.footer}>
            Remember password?{' '}
            <Text
              style={styles_forgetpassword.loginLink}
              onPress={() =>
                navigation.navigate('LoginScreen', { accountType: accountType })
              }
            >
              Log in
            </Text>
          </Text>

          <AlertModal
            visible={alertVisible}
            title={alertType === 'success' ? 'Success' : 'Error'}
            message={alertMessage}
            type={alertType}
            onOk={() => {
              setAlertVisible(false);

              if (alertType === 'success') {
                navigation.navigate('ForgetOTP', { email: emailforget });
                dispatch(resetForgotPasswordState());
              }
            }}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </View>
    </>
  );
};

export default ForgetPassword;


