// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../../../../utils/utils';

// const ChangePassword = ({navigation}) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const toggleCurrent = () => setShowCurrent(!showCurrent);
//   const toggleNew = () => setShowNew(!showNew);
//   const toggleConfirm = () => setShowConfirm(!showConfirm);

//   // 👉 API CALL FUNCTION
//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'New password and confirm password do not match');
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const response = await axios.post(
//         `${API_BASE_URL}/change-password`,
//         {
//           user_id: userId,
//           old_password: currentPassword,
//           new_password: newPassword,
//           new_password_confirmation: confirmPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.data.status) {
//         Alert.alert('Success', 'Password changed successfully');
//         navigation.goBack();
//       } else {
//         Alert.alert('Error', response.data.message);
//       }
//     } catch (error) {
//       console.error(error?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.headerTitle}>Change Password</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <View style={{marginHorizontal: 20, flex: 1}}>
//         <Text style={styles.subtitle}>
//           Please type something you’ll remember
//         </Text>

//         {/* Input Fields */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Current Password</Text>
//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="must be 8 characters"
//               placeholderTextColor="#999"
//               secureTextEntry={!showCurrent}
//               value={currentPassword}
//               onChangeText={setCurrentPassword}
//             />
//             <TouchableOpacity onPress={toggleCurrent}>
//               <Ionicons
//                 name={showCurrent ? 'eye-off-outline' : 'eye-outline'}
//                 size={20}
//                 color="#999"
//               />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>New password</Text>
//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="must be 8 characters"
//               placeholderTextColor="#999"
//               secureTextEntry={!showNew}
//               value={newPassword}
//               onChangeText={setNewPassword}
//             />
//             <TouchableOpacity onPress={toggleNew}>
//               <Ionicons
//                 name={showNew ? 'eye-off-outline' : 'eye-outline'}
//                 size={20}
//                 color="#999"
//               />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>Confirm new password</Text>
//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="repeat password"
//               placeholderTextColor="#999"
//               secureTextEntry={!showConfirm}
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//             />
//             <TouchableOpacity onPress={toggleConfirm}>
//               <Ionicons
//                 name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
//                 size={20}
//                 color="#999"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Save Password Button */}
//       <TouchableOpacity
//         style={[styles.saveButton, loading && {opacity: 0.6}]}
//         onPress={handleChangePassword}
//         disabled={loading}>
//         <Text style={styles.saveText}>
//           {loading ? 'Saving...' : 'Save Password'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ChangePassword;

// const styles = StyleSheet.create({
//   container: {flex: 1, padding: 20, backgroundColor: '#fff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//   },
//   headerTitle: {fontSize: 16, fontWeight: '500', color: '#000'},
//   subtitle: {
//     fontSize: 16,
//     color: '#888',
//     marginBottom: 20,
//     fontFamily: 'Source Serif 4',
//   },
//   inputContainer: {marginBottom: 30},
//   label: {fontSize: 14, color: '#000', marginBottom: 6},
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#333333',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 25,
//     justifyContent: 'space-between',
//   },
//   input: {flex: 1, fontSize: 16, color: '#000'},
//   saveButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 5,
//   },
//   saveText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../../utils/utils';
import {
  responsiveFontSize as RF,
  responsiveHeight as RH,
  responsiveWidth as RW,
} from 'react-native-responsive-dimensions';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Header from '../../../../../constants/Header';
import { useSelector } from 'react-redux';
import { error } from 'pdf-lib';

const ChangePassword = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleCurrent = () => setShowCurrent(!showCurrent);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/change-password`,
        {
          user_id: userId,
          old_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status === true) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;
      const message = error?.response?.data?.message;

      if (apiErrors) {
        // errors = { old_password: ["Incorrect"], new_password: ["Too short"] }
        const firstKey = Object.keys(apiErrors)[0];
        const firstMsg = apiErrors[firstKey][0];
        Alert.alert('Error', firstMsg);
        return;
      }

      if (message) {
        Alert.alert('Error', message);
        return;
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Password" navigation={navigation} showBack={true} />

      <View style={styles.bodyContainer}>
        <Text style={styles.subtitle}>
          Please type something you’ll remember
        </Text>

        {/* CARD BOX */}
        <View style={styles.cardBox}>
          {/* CURRENT */}
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="must be 8 characters"
              placeholderTextColor="#aaa"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={toggleCurrent}>
              <Ionicons
                name={showCurrent ? 'eye-off-outline' : 'eye-outline'}
                size={scale(18)}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* NEW */}
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="must be 8 characters"
              placeholderTextColor="#aaa"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={toggleNew}>
              <Ionicons
                name={showNew ? 'eye-off-outline' : 'eye-outline'}
                size={scale(18)}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="repeat password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirm}>
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={scale(18)}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, loading && { opacity: 0.5 }]}
            onPress={handleChangePassword}
            disabled={loading}
          >
            <Text style={styles.saveText}>
              {loading ? 'Saving...' : 'Save Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  bodyContainer: {
    flex: 1,
    marginHorizontal: RW(5),
    marginTop: RH(2),
  },

  subtitle: {
    fontSize: RF(1.5),
    color: '#555',
    marginBottom: RH(1),
    fontWeight: '400',
  },

  /* Card Box */
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    padding: RW(4),
    // paddingVertical: RH(3),
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },

  label: {
    fontSize: RF(1.5),
    color: '#111',
    marginBottom: RH(0.8),
    marginTop: RH(1),
    fontWeight: '500',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(5),
    paddingHorizontal: RW(3),
    // paddingVertical: RH(1.4),
    marginBottom: RH(1.5),
  },

  input: {
    flex: 1,
    fontSize: RF(1.5),
    color: '#111',
  },

  saveButton: {
    backgroundColor: '#478F4E',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    marginHorizontal: RW(5),
    padding: moderateScale(10), width: RW(50), alignSelf:'center'
  },

  saveText: {
    color: '#fff',
    fontSize: RF(1.5),
    fontWeight: '600',
  },
});
