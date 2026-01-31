// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {styles_setpassword} from './styles';

// const SetPassword = ({navigation}) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [selectedOption, accountType] = useState('individual');

//   useEffect(() => {
//     const newErrors = {};

//     if (!newPassword.trim()) {
//       newErrors.newPassword = 'New password is required';
//     } else if (newPassword.length < 6) {
//       newErrors.newPassword = 'Password must be at least 6 characters';
//     }

//     if (!confirmPassword.trim()) {
//       newErrors.confirmPassword = 'Confirm password is required';
//     } else if (confirmPassword !== newPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//   }, [newPassword, confirmPassword]);

//   const handleReset = () => {
//     // Final check before submission
//     const newErrors = {};
//     if (!newPassword.trim()) {
//       newErrors.newPassword = 'New password is required';
//     } else if (newPassword.length < 6) {
//       newErrors.newPassword = 'Password must be at least 6 characters';
//     }

//     if (!confirmPassword.trim()) {
//       newErrors.confirmPassword = 'Confirm password is required';
//     } else if (confirmPassword !== newPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (Object.keys(newErrors).length === 0) {
//       navigation.navigate('LoginScreen');
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <View style={styles_setpassword.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles_setpassword.backButton}
//         onPress={() => navigation.goBack()}>
//         <Ionicons name="chevron-back-outline" size={18} color="#000" />
//       </TouchableOpacity>

//       <View style={styles_setpassword.content}>
//         <Text style={styles_setpassword.title}>Reset password</Text>
//         <Text style={styles_setpassword.subtitle}>
//           Please type something you’ll remember
//         </Text>

//         {/* New Password */}
//         <Text style={styles_setpassword.label}>New password</Text>
//         <View style={styles_setpassword.inputWrapper}>
//           <TextInput
//             style={[
//               styles_setpassword.input,
//               errors.newPassword && {borderColor: 'red'},
//             ]}
//             secureTextEntry={!showNew}
//             value={newPassword}
//             onChangeText={setNewPassword}
//             placeholder="Enter new password"
//             placeholderTextColor="#aaa"
//           />
//           <TouchableOpacity onPress={() => setShowNew(!showNew)}>
//             <Ionicons
//               name={showNew ? 'eye-off-outline' : 'eye-outline'}
//               size={22}
//               color="#555"
//             />
//           </TouchableOpacity>
//         </View>
//         {errors.newPassword && (
//           <Text style={styles_setpassword.errorText}>{errors.newPassword}</Text>
//         )}

//         {/* Confirm Password */}
//         <Text style={styles_setpassword.label}>Confirm new password</Text>
//         <View style={styles_setpassword.inputWrapper}>
//           <TextInput
//             style={[
//               styles_setpassword.input,
//               errors.confirmPassword && {borderColor: 'red'},
//             ]}
//             secureTextEntry={!showConfirm}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             placeholder="Confirm password"
//             placeholderTextColor="#aaa"
//           />
//           <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
//             <Ionicons
//               name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
//               size={22}
//               color="#555"
//             />
//           </TouchableOpacity>
//         </View>
//         {errors.confirmPassword && (
//           <Text style={styles_setpassword.errorText}>
//             {errors.confirmPassword}
//           </Text>
//         )}
//         <TouchableOpacity
//           style={styles_setpassword.button}
//           onPress={handleReset}>
//           <Text style={styles_setpassword.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles_setpassword.footer}>
//         Already have an account?{'   '}
//         <Text
//           style={styles_setpassword.loginLink}
//           onPress={() =>
//             navigation.navigate('LoginScreen', {accountType: accountType})
//           }>
//           Log in
//         </Text>
//       </Text>
//     </View>
//   );
// };

// export default SetPassword;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForgotPasswordState,
  resetPasswordAPI,
  resetState,
} from '../../redux/slices/forgotPasswordSlice';
import { styles_setpassword } from './styles';
import Header from '../../constants/Header';
import responsive from '../../constants/responsive';

const SetPassword = ({ navigation, route }) => {
  const { email } = route.params; // get email from previous screen
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const { resetData, loading, success, error } = useSelector(
    state => state.forgotPassword,
  );
  useEffect(() => {
    if (success) {
      dispatch(resetForgotPasswordState());
      navigation.navigate('LoginScreen'); // go to login on success
    }
  }, [success]);

  const handleReset = () => {
    const newErrors = {};

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // 🔥 error only after click
      return;
    }

    // ✅ No errors → API call
    dispatch(
      resetPasswordAPI({
        email,
        password: newPassword,
        password_confirmation: confirmPassword,
      }),
    );
  };

  const onChangeNewPassword = text => {
    setNewPassword(text);
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: undefined }));
    }
  };

  const onChangeConfirmPassword = text => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  return (
    <>
      <View style={styles_setpassword.content}>
        <Header
          navigation={navigation}
          showBack={true}
          showSearch={false}
          onBackPress={() => navigation.goBack()}
        />
        <View style={{ marginHorizontal: responsive.marginHorizontal(10) }}>
          <Text style={styles_setpassword.title}>Reset password</Text>
          <Text style={styles_setpassword.subtitle}>
            Please type something you’ll remember
          </Text>

          {/* New Password */}
          <Text style={styles_setpassword.label}>New password</Text>
          <View style={styles_setpassword.inputWrapper}>
            <TextInput
              style={[
                styles_setpassword.input,
                errors.newPassword && { borderColor: 'red' },
              ]}
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={onChangeNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons
                name={showNew ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          {errors.newPassword && (
            <Text style={styles_setpassword.errorText}>
              {errors.newPassword}
            </Text>
          )}

          {/* Confirm Password */}
          <Text style={styles_setpassword.label}>Confirm new password</Text>
          <View style={styles_setpassword.inputWrapper}>
            <TextInput
              style={[
                styles_setpassword.input,
                errors.confirmPassword && { borderColor: 'red' },
              ]}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              placeholder="Confirm password"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles_setpassword.errorText}>
              {errors.confirmPassword}
            </Text>
          )}

          <TouchableOpacity
            style={styles_setpassword.button}
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles_setpassword.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text
              style={[
                styles_setpassword.errorText,
                { textAlign: 'center', marginTop: 10 },
              ]}
            >
              {error}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default SetPassword;
