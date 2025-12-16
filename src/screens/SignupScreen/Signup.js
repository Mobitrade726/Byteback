// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   useColorScheme,
//   ActivityIndicator,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useRoute} from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import {API_BASE_URL} from '../../utils/utils';

// const RegisterAsDealer = ({navigation}) => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const [gstNumberAvailable, setGstNumberAvailable] = useState(true);
//   const [gstNumber, setGstNumber] = useState('');
//   const [firmName, setFirmName] = useState('');
//   const [contactPerson, setContactPerson] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'Proprietorship', value: 'proprietorship'},
//     {label: 'Partnership', value: 'partnership'},
//     {label: 'Private Ltd', value: 'pvt_ltd'},
//     {label: 'Public Ltd', value: 'public_ltd'},
//   ]);
//   const route = useRoute();
//   let accountType = route?.params?.accountType;
//   let profileEdit = route?.params?.profileEdit;
//   const [errors, setErrors] = useState({});
//   const [address1, setAddress1] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (profileEdit && Object.keys(profileEdit).length > 0) {
//       setContactPerson(profileEdit.customer_name || '');
//       setEmail(profileEdit.email || '');
//       setContactNumber(profileEdit.contact_number || '');
//       setFirmName(profileEdit.firm_name || '');
//       setValue(profileEdit.business_entity_type || '');
//       setGstNumber(profileEdit?.vendordocuments?.gst_number || '');
//       setGstNumberAvailable(
//         profileEdit?.vendordocuments?.ask_gst === 'yes' ? true : false,
//       );
//     }
//   }, [profileEdit]);

//   const handleVerifyGST = async () => {
//     if (!gstNumber) {
//       Toast.show({
//         type: 'error',
//         text2: 'Please enter a GST number',
//       });
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post(API_BASE_URL + '/getDetail-gstno', {
//         gst_number: gstNumber,
//       });

//       if (response.data.status === 'success') {
//         setLoading(false);
//         const gstData = response.data.data.taxpayerInfo;
//         Toast.show({
//           type: 'success',
//           text1: 'GST Verified',
//           text2: `${gstData.lgnm} (${gstData.gstin})`,
//         });

//         // Autofill optional fields from response
//         setFirmName(gstData.lgnm);
//         setAddress1(
//           `${gstData.pradr?.addr?.bno || ''}, ${gstData.pradr?.addr?.st || ''}`,
//         );
//         setCity(gstData.pradr?.addr?.loc || '');
//         setState(gstData.pradr?.addr?.stcd || '');
//         setPincode(gstData.pradr?.addr?.pncd || '');
//       } else {
//         setLoading(false);
//         Toast.show({
//           type: 'error',
//           text2: 'Invalid GST number or not found',
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       Toast.show({
//         type: 'error',
//         text2: 'Something went wrong while verifying GST',
//       });
//     }
//   };

//   // ✅ Validation logic reused
//   const validateInputs = () => {
//     const newErrors = {};

//     if (
//       accountType === 'individual' ||
//       profileEdit?.vendor_type === 'Unregistered'
//     ) {
//       if (!contactPerson.trim()) newErrors.name = 'Name is required';
//       if (!/^[0-9]{10}$/.test(contactNumber))
//         newErrors.phone = 'Enter a valid mobile number';
//       if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
//         newErrors.Email = 'Enter a valid email';
//       if (!profileEdit?.vendor_type) {
//         if (password.length < 6)
//           newErrors.Password = 'Password must be at least 6 characters';
//         if (password !== confirmPassword)
//           newErrors.ConfirmPassword = 'Passwords do not match';
//       }
//     } else {
//       if (!firmName.trim()) newErrors.firmName = 'Firm name is required';
//       if (!contactPerson.trim()) newErrors.name = 'Contact person is required';
//       if (!value) newErrors.entityType = 'Business entity type is required';
//       if (gstNumberAvailable && (!gstNumber || gstNumber.length !== 15))
//         newErrors.gstNumber = 'Enter a valid 15-digit GST number';
//       if (!/^[0-9]{10}$/.test(contactNumber))
//         newErrors.phone = 'Enter a valid mobile number';
//       if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
//         newErrors.Email = 'Enter a valid email';
//       if (!profileEdit?.vendor_type) {
//         if (password.length < 6)
//           newErrors.Password = 'Password must be at least 6 characters';
//         if (password !== confirmPassword)
//           newErrors.ConfirmPassword = 'Passwords do not match';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Real-time validation if form was submitted
//   useEffect(() => {
//     if (submitted) {
//       validateInputs();
//     }
//   }, [contactPerson, contactNumber, email, password, confirmPassword]);

//   const handleNext = () => {
//     if (profileEdit && Object.keys(profileEdit).length > 0) {
//       navigation.navigate('Signup_Address', {
//         RegData: {
//           gstNumberAvailable,
//           gstNumber,
//           firmName,
//           accountType,
//           contactPerson,
//           contactNumber,
//           email,
//           address1,
//           address2,
//           city,
//           state,
//           pincode,
//           value,
//         },
//         EditData: {
//           profileEdit,
//         },
//       });
//     } else {
//       setSubmitted(true);
//       const isValid = validateInputs();

//       if (!isValid) return;
//       navigation.navigate('Signup_Address', {
//         RegData: {
//           gstNumberAvailable,
//           gstNumber,
//           firmName,
//           accountType,
//           contactPerson,
//           contactNumber,
//           email,
//           password,
//           address1,
//           address2,
//           city,
//           state,
//           pincode,
//           confirmPassword,
//           value,
//         },
//       });
//     }
//   };

//   const renderIndividualForm = () => (
//     <>
//       <TextInput
//         style={[styles.input, errors.contactPerson && {borderColor: 'red'}]}
//         placeholder="Name*"
//         value={contactPerson}
//         onChangeText={setContactPerson}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//       <TextInput
//         style={[styles.input, errors.contactNumber && {borderColor: 'red'}]}
//         placeholder="Phone*"
//         keyboardType="phone-pad"
//         value={contactNumber}
//         onChangeText={setContactNumber}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//       <TextInput
//         style={[styles.input, errors.email && {borderColor: 'red'}]}
//         placeholder="Email*"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

//       {!profileEdit?.vendor_type && (
//         <>
//           <TextInput
//             style={[styles.input, errors.password && {borderColor: 'red'}]}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//             placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           />
//           {errors.Password && (
//             <Text style={styles.errorText}>{errors.Password}</Text>
//           )}

//           <TextInput
//             style={[
//               styles.input,
//               errors.confirmPassword && {borderColor: 'red'},
//             ]}
//             placeholder="Confirm Password*"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           />
//           {errors.ConfirmPassword && (
//             <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>
//           )}
//         </>
//       )}
//     </>
//   );

//   const renderBusinessForm = () => (
//     <>
//       <>
//         <View style={{flexDirection: 'row', marginBottom: 8}}>
//           <Text style={styles.label}>Do you have a GST number?</Text>
//           <View style={styles.radioContainer}>
//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setGstNumberAvailable(true)}>
//               <View style={styles.radioOuter}>
//                 {gstNumberAvailable && <View style={styles.radioInner} />}
//               </View>
//               <Text style={styles.radioLabel}>Yes</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setGstNumberAvailable(false)}>
//               <View style={styles.radioOuter}>
//                 {!gstNumberAvailable && <View style={styles.radioInner} />}
//               </View>
//               <Text style={styles.radioLabel}>No</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {gstNumberAvailable && (
//           <View style={styles.gstInputWrapper}>
//             <TextInput
//               style={styles.gstInput}
//               placeholder="Enter GSTIN"
//               value={gstNumber}
//               onChangeText={setGstNumber}
//               autoCapitalize="characters"
//               maxLength={15}
//               placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//             />
//             <TouchableOpacity
//               style={styles.verifyButton}
//               onPress={handleVerifyGST}>
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.verifyButtonText}>Verify</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}
//         {errors.gstNumber && (
//           <Text style={styles.errorText}>{errors.gstNumber}</Text>
//         )}
//       </>
//       {/* )} */}
//       <TextInput
//         style={styles.input}
//         placeholder="Firm Name*"
//         value={firmName}
//         onChangeText={setFirmName}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.firmName && (
//         <Text style={styles.errorText}>{errors.firmName}</Text>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Contact Person*"
//         value={contactPerson}
//         onChangeText={setContactPerson}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         placeholder="Business Entity Type*"
//         style={{borderColor: '#000', borderRadius: 10, marginBottom: 15}}
//         style={{
//           borderColor: isDarkMode ? '#444' : '#000',
//           borderRadius: 10,
//           marginBottom: 15,
//           backgroundColor: isDarkMode ? '#fff' : '#fff',
//         }}
//         dropDownContainerStyle={{
//           borderColor: isDarkMode ? '#444' : '#000',
//           borderRadius: 10,
//           backgroundColor: isDarkMode ? '#fff' : '#fff',
//         }}
//         placeholderStyle={{
//           color: isDarkMode ? '#aaa' : '#888',
//           fontSize: 16,
//           fontFamily: 'Source Serif 4',
//         }}
//         textStyle={{
//           color: isDarkMode ? '#aaa' : '#666',
//           fontSize: 16,
//         }}
//       />
//       {errors.entityType && <Text style={styles.errorText}>{errors.entityType}</Text>}
//       <TextInput
//         style={styles.input}
//         placeholder="Contact Number*"
//         keyboardType="phone-pad"
//         value={contactNumber}
//         onChangeText={setContactNumber}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
//       <TextInput
//         style={styles.input}
//         placeholder="Email Address*"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//         placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//       />
//       {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

//       {!profileEdit?.vendor_type && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//             placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           />
//           {errors.Password && (
//             <Text style={styles.errorText}>{errors.Password}</Text>
//           )}

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password*"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
//           />
//           {errors.ConfirmPassword && (
//             <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>
//           )}
//         </>
//       )}
//     </>
//   );

//   const renderForm = () => {
//     if (profileEdit && Object.keys(profileEdit).length > 0) {
//       return profileEdit?.vendor_type === 'Unregistered' &&
//         profileEdit?.vendor_category === 'vendor_customer'
//         ? renderIndividualForm()
//         : renderBusinessForm();
//     } else {
//       return accountType === 'individual'
//         ? renderIndividualForm()
//         : renderBusinessForm();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.formContainer}>
//         {renderForm()}
//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     justifyContent: 'space-around',
//     paddingBottom: 10,
//   },
//   tabActive: {
//     color: '#2196F3',
//     fontWeight: 'bold',
//     borderBottomWidth: 2,
//     borderColor: '#2196F3',
//     paddingBottom: 5,
//   },
//   tabInactive: {
//     color: '#888',
//   },
//   formContainer: {
//     padding: 20,
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   statusDot: {
//     height: 16,
//     width: 16,
//     borderRadius: 8,
//     backgroundColor: '#ccc',
//     marginLeft: 10,
//   },
//   statusDotActive: {
//     backgroundColor: 'green',
//   },
//   gstInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 15,
//   },
//   gstInput: {
//     flex: 1,
//     padding: 10,
//     fontFamily: 'Source Serif 4',
//   },
//   verifyButton: {
//     backgroundColor: 'green',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     justifyContent: 'center',
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#333333',
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 15,
//     fontFamily: 'Source Serif 4',
//   },
//   nextButton: {
//     backgroundColor: '#4BA4D9',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   nextButtonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'semibold',
//     fontFamily: 'Source Serif 4',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     marginBottom: 15,
//     gap: 20,
//     marginLeft: 8,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioOuter: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#4BA4D9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 6,
//   },
//   radioInner: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#4BA4D9',
//   },
//   radioLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//     fontSize: 13,
//     marginLeft: 4,
//   },
// });

// export default RegisterAsDealer;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/utils';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertModal from '../../constants/AlertModal';

const RegisterAsDealer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gstNumberAvailable, setGstNumberAvailable] = useState(true);
  const [gstNumber, setGstNumber] = useState('');
  const [firmName, setFirmName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Proprietorship', value: 'proprietorship' },
    { label: 'Partnership', value: 'partnership' },
    { label: 'Private Ltd', value: 'pvt_ltd' },
    { label: 'Public Ltd', value: 'public_ltd' },
  ]);
  const route = useRoute();
  let accountType = route?.params?.accountType;
  let profileEdit = route?.params?.profileEdit;
  const [errors, setErrors] = useState({});
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    if (profileEdit && Object.keys(profileEdit).length > 0) {
      setContactPerson(profileEdit.customer_name || '');
      setEmail(profileEdit.email || '');
      setContactNumber(profileEdit.contact_number || '');
      setFirmName(profileEdit.firm_name || '');
      setValue(profileEdit.business_entity_type || '');
      setGstNumber(profileEdit?.vendordocuments?.gst_number || '');
      setGstNumberAvailable(
        profileEdit?.vendordocuments?.ask_gst === 'yes' ? true : false,
      );
    }
  }, [profileEdit]);

  const handleVerifyGST = async () => {
    if (!gstNumber) {
      setAlertMessage('Please enter a GST number');
      setAlertType('error'); // "error", "warning" bhi kar sakte ho
      setAlertVisible(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(API_BASE_URL + '/getDetail-gstno', {
        gst_number: gstNumber,
      });

      if (response.data.status === 'success') {
        setLoading(false);
        const gstData = response.data.data.taxpayerInfo;
        setAlertMessage(`${gstData.lgnm} (${gstData.gstin})`);
        setAlertType('success'); // "error", "warning" bhi kar sakte ho
        setAlertVisible(true);

        // Autofill optional fields
        setFirmName(gstData.lgnm);
        setAddress1(
          `${gstData.pradr?.addr?.bno || ''}, ${gstData.pradr?.addr?.st || ''}`,
        );
        setCity(gstData.pradr?.addr?.loc || '');
        setState(gstData.pradr?.addr?.stcd || '');
        setPincode(gstData.pradr?.addr?.pncd || '');
      } else {
        setLoading(false);
        setAlertMessage('Invalid GST number or not found');
        setAlertType('error'); // "error", "warning" bhi kar sakte ho
        setAlertVisible(true);
      }
    } catch (error) {
      setLoading(false);
       setAlertMessage('Something went wrong while verifying GST');
        setAlertType('error'); // "error", "warning" bhi kar sakte ho
        setAlertVisible(true);
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (
      accountType === 'individual' ||
      profileEdit?.vendor_type === 'Unregistered'
    ) {
      if (!contactPerson.trim()) newErrors.name = 'Name is required';
      if (!/^[0-9]{10}$/.test(contactNumber))
        newErrors.phone = 'Enter a valid mobile number';
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        newErrors.Email = 'Enter a valid email';
      if (!profileEdit?.vendor_type) {
        if (password.length < 6)
          newErrors.Password = 'Password must be at least 6 characters';
        if (password !== confirmPassword)
          newErrors.ConfirmPassword = 'Passwords do not match';
      }
    } else {
      if (!firmName.trim()) newErrors.firmName = 'Firm name is required';
      if (!contactPerson.trim()) newErrors.name = 'Contact person is required';
      if (!value) newErrors.entityType = 'Business entity type is required';
      if (gstNumberAvailable && (!gstNumber || gstNumber.length !== 15))
        newErrors.gstNumber = 'Enter a valid 15-digit GST number';
      if (!/^[0-9]{10}$/.test(contactNumber))
        newErrors.phone = 'Enter a valid mobile number';
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        newErrors.Email = 'Enter a valid email';
      if (!profileEdit?.vendor_type) {
        if (password.length < 6)
          newErrors.Password = 'Password must be at least 6 characters';
        if (password !== confirmPassword)
          newErrors.ConfirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (submitted) {
      validateInputs();
    }
  }, [contactPerson, contactNumber, email, password, confirmPassword]);

  const handleNext = () => {
    setSubmitted(true);
    if (!validateInputs()) return;

    const RegData = {
      gstNumberAvailable,
      gstNumber,
      firmName,
      accountType,
      contactPerson,
      contactNumber,
      email,
      password,
      address1,
      address2,
      city,
      state,
      pincode,
      confirmPassword,
      value,
    };
    const EditData = profileEdit ? { profileEdit } : undefined;

    navigation.navigate('Signup_Address', { RegData, EditData });
  };

  const renderIndividualForm = () => (
    <>
      <TextInput
        style={[styles.input, errors.name && { borderColor: 'red' }]}
        placeholder="Name*"
        value={contactPerson}
        onChangeText={setContactPerson}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.phone && { borderColor: 'red' }]}
        placeholder="Phone*"
        keyboardType="phone-pad"
        value={contactNumber}
        maxLength={12}
        onChangeText={setContactNumber}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={[styles.input, errors.Email && { borderColor: 'red' }]}
        placeholder="Email*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

      {!profileEdit?.vendor_type && (
        <>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.inputField,
                errors.Password && { borderColor: 'red' },
              ]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {errors.Password && (
            <Text style={styles.errorText}>{errors.Password}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.inputField,
                errors.ConfirmPassword && { borderColor: 'red' },
              ]}
              placeholder="Confirm Password*"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {errors.ConfirmPassword && (
            <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>
          )}
        </>
      )}
    </>
  );

  const renderBusinessForm = () => (
    <>
      <View style={{ flexDirection: 'row', marginBottom: verticalScale(10) }}>
        <Text style={[styles.label, { fontSize: responsiveFontSize(1.8) }]}>
          Do you have a GST number?
        </Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setGstNumberAvailable(true)}
          >
            <View style={styles.radioOuter}>
              {gstNumberAvailable && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setGstNumberAvailable(false)}
          >
            <View style={styles.radioOuter}>
              {!gstNumberAvailable && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {gstNumberAvailable && (
        <View style={styles.gstInputWrapper}>
          <TextInput
            style={styles.gstInput}
            placeholder="Enter GSTIN"
            value={gstNumber}
            onChangeText={setGstNumber}
            autoCapitalize="characters"
            maxLength={15}
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          />
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyGST}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {errors.gstNumber && (
        <Text style={styles.errorText}>{errors.gstNumber}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Firm Name*"
        value={firmName}
        onChangeText={setFirmName}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.firmName && (
        <Text style={styles.errorText}>{errors.firmName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Contact Person*"
        value={contactPerson}
        onChangeText={setContactPerson}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Business Entity Type*"
        style={{
          borderColor: isDarkMode ? '#444' : '#000',
          borderRadius: moderateScale(10),
          marginBottom: verticalScale(15),
        }}
        dropDownContainerStyle={{
          borderColor: isDarkMode ? '#444' : '#000',
          borderRadius: moderateScale(10),
          backgroundColor: isDarkMode ? '#fff' : '#fff',
        }}
        placeholderStyle={{
          color: isDarkMode ? '#aaa' : '#888',
          fontSize: responsiveFontSize(1.8),
        }}
        textStyle={{
          color: isDarkMode ? '#aaa' : '#666',
          fontSize: responsiveFontSize(1.8),
        }}
      />
      {errors.entityType && (
        <Text style={styles.errorText}>{errors.entityType}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Contact Number*"
        keyboardType="phone-pad"
        value={contactNumber}
        maxLength={12}
        onChangeText={setContactNumber}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email Address*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}

      {!profileEdit?.vendor_type && (
        <>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.inputField,
                errors.Password && { borderColor: 'red' },
              ]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.Password && (
            <Text style={styles.errorText}>{errors.Password}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.inputField,
                errors.ConfirmPassword && { borderColor: 'red' },
              ]}
              placeholder="Confirm Password*"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={moderateScale(22)}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.ConfirmPassword && (
            <Text style={styles.errorText}>{errors.ConfirmPassword}</Text>
          )}
        </>
      )}
    </>
  );

  const renderForm = () => {
    if (profileEdit && Object.keys(profileEdit).length > 0) {
      return profileEdit?.vendor_type === 'Unregistered' &&
        profileEdit?.vendor_category === 'vendor_customer'
        ? renderIndividualForm()
        : renderBusinessForm();
    } else {
      return accountType === 'individual'
        ? renderIndividualForm()
        : renderBusinessForm();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {renderForm()}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <AlertModal
          visible={alertVisible}
          title="Success"
          message={alertMessage}
          type={alertType}
          onOk={() => {
            setAlertVisible(false);
          }}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: moderateScale(20),
  },
  label: {
    fontWeight: '600',
    marginBottom: verticalScale(10),
    fontSize: responsiveFontSize(1.8),
  },
  gstInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(15),
  },
  gstInput: {
    flex: 1,
    padding: moderateScale(10),
    fontSize: responsiveFontSize(1.8),
  },
  verifyButton: {
    backgroundColor: 'green',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(15),
    backgroundColor: '#FFF',
  },

  inputField: {
    flex: 1,
    paddingVertical: moderateScale(12),
    fontSize: responsiveFontSize(1.8),
    color: '#000',
  },

  eyeButton: {
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
  },

  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    marginBottom: verticalScale(15),
    fontSize: responsiveFontSize(1.8),
  },
  nextButton: {
    backgroundColor: '#4BA4D9',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  nextButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(15),
    gap: moderateScale(20),
    marginLeft: moderateScale(8),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#4BA4D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(6),
  },
  radioInner: {
    height: moderateScale(10),
    width: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#4BA4D9',
  },
  radioLabel: {
    fontSize: responsiveFontSize(1.8),
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: verticalScale(10),
    fontSize: responsiveFontSize(1.5),
    marginLeft: moderateScale(4),
  },
});

export default RegisterAsDealer;
