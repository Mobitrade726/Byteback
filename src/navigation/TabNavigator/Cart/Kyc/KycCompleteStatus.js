// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { launchImageLibrary, } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '../../../../utils/utils';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProfile } from '../../../../redux/slices/profileSlice';
// import Header from '../../../../constants/Header';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import Toast from 'react-native-toast-message';

// const KycScreen = ({ navigation }) => {
//   const token = useSelector(state => state.auth.token);
//   const userId = useSelector(state => state.auth.userId);
//   const [documentNo, setDocumentNo] = useState('');
//   const [selectedDocType, setSelectedDocType] = useState('aadhaar');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [confirmInfo, setConfirmInfo] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [docFront, setDocFront] = useState(null);
//   const [docBack, setDocBack] = useState(null);
//   const [gstFile, setGstFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const { data } = useSelector(state => state.profile);

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   // All document types
//   const documentTypes = [
//     'aadhaar',
//     'driving_licence',
//     'voter_id',
//     'passport',
//     'pan_number',
//   ];

//   // Field Mapping for dynamic FormData
//   const docFields = {
//     aadhaar: {
//       numberField: 'aadhaar_no',
//       frontField: 'aadhaar_front',
//       backField: 'aadhaar_back',
//       placeholder: 'Enter Aadhaar Number',
//       frontText: 'Upload Aadhaar Front',
//       backText: 'Upload Aadhaar Back',
//     },
//     driving_licence: {
//       numberField: 'dl_no',
//       frontField: 'dl_front',
//       backField: 'dl_back',
//       placeholder: 'Enter Driving Licence Number',
//       frontText: 'Upload DL Front',
//       backText: 'Upload DL Back',
//     },
//     voter_id: {
//       numberField: 'voter_id',
//       frontField: 'voter_id_front',
//       backField: 'voter_id_back',
//       placeholder: 'Enter Voter ID Number',
//       frontText: 'Upload Voter ID Front',
//       backText: 'Upload Voter ID Back',
//     },
//     passport: {
//       numberField: 'passport_no',
//       frontField: 'passport_front',
//       backField: 'passport_back',
//       placeholder: 'Enter Passport Number',
//       frontText: 'Upload Passport Front',
//       backText: 'Upload Passport Back',
//     },
//     pan_number: {
//       numberField: 'customer_pan',
//       frontField: 'pan_img',
//       backField: null,
//       placeholder: 'Enter PAN Number',
//       frontText: 'Upload PAN',
//       backText: null,
//     },
//   };

//   const fields = docFields[selectedDocType];

//   // File picker
//   const handleBrowseFile = type => {
//     launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, response => {
//       if (response.didCancel) return;
//       if (response.errorMessage)
//         return Alert.alert('Error', response.errorMessage);

//       const file = response.assets[0];
//       if (!file) return;

//       if (type === 'front') setDocFront(file);
//       else if (type === 'back') setDocBack(file);
//       else if (type === 'gst') setGstFile(file);
//     });
//   };

//   // Submit Handler
//   const handleSubmit = async () => {
//     if (
//       !documentNo ||
//       !docFront ||
//       (!docBack && fields.backField) ||
//       !confirmInfo ||
//       !agreeTerms
//     ) {
//       return Alert.alert('Error', 'Please complete all fields and checkboxes.');
//     }

//     if (
//       data?.vendor_category === 'vendor_dealer' &&
//       data?.vendor_type === 'Registered' &&
//       !gstFile
//     ) {
//       return Alert.alert('Error', 'Please upload your GST Certificate.');
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();

//       formData.append('user_id', userId);
//       formData.append('proof_of_identity', selectedDocType);

//       // Dynamic number field
//       formData.append(fields.numberField, documentNo);

//       // Front
//       formData.append(fields.frontField, {
//         uri: docFront.uri,
//         type: docFront.type,
//         name: docFront.fileName || 'front.jpg',
//       });

//       // Back only if exists
//       if (fields.backField && docBack) {
//         formData.append(fields.backField, {
//           uri: docBack.uri,
//           type: docBack.type,
//           name: docBack.fileName || 'back.jpg',
//         });
//       }

//       // GST (only dealers)
//       if (
//         data?.vendor_category === 'vendor_dealer' &&
//         data?.vendor_type === 'Registered' &&
//         gstFile
//       ) {
//         formData.append('gst_certificate', {
//           uri: gstFile.uri,
//           type: gstFile.type,
//           name: gstFile.fileName || 'gst_certificate.jpg',
//         });
//       }
//       const response = await fetch(`${API_BASE_URL}/buyer/documents/store`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       console.log('data-------------------->', response?.data)
//       Toast.show({
//         type: 'success',
//         text2: response?.data?.message,
//       });
//       setLoading(false);
//       navigation.goBack();
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Error', 'Something went wrong. Try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="KYC" navigation={navigation} showBack={true} />

//       <ScrollView>
//         <View style={styles.card}>
//           <Text style={styles.title}>KYC Verification</Text>
//           <Text style={styles.subtitle}>
//             Upload your valid government identity to continue.
//           </Text>

//           {/* Dropdown */}
//           <TouchableOpacity
//             style={styles.dropdownHeader}
//             onPress={() => setShowDropdown(!showDropdown)}
//           >
//             <Text style={styles.selectedText}>{selectedDocType}</Text>
//             <Ionicons
//               name={showDropdown ? 'chevron-up' : 'chevron-down'}
//               size={moderateScale(20)} // responsive size
//             />
//           </TouchableOpacity>

//           {showDropdown &&
//             documentTypes.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setSelectedDocType(item);
//                   setShowDropdown(false);
//                   setDocFront(null);
//                   setDocBack(null);
//                 }}
//               >
//                 <Text style={styles.dropdownText}>{item}</Text>
//               </TouchableOpacity>
//             ))}

//           {/* Dynamic Placeholder */}
//           <TextInput
//             style={styles.input}
//             placeholder={fields.placeholder}
//             value={documentNo}
//             onChangeText={setDocumentNo}
//             placeholderTextColor='#000'
//           />

//           {/* Upload Front */}
//           <TouchableOpacity
//             style={styles.uploadBox}
//             onPress={() => handleBrowseFile('front')}
//           >
//             <Ionicons
//               name="cloud-upload-outline"
//               size={moderateScale(20)}
//               color="#999"
//             />
//             <Text style={styles.uploadText}>
//               {docFront ? docFront.fileName : fields.frontText}
//             </Text>
//           </TouchableOpacity>

//           {/* Upload Back (if exists) */}
//           {fields.backField && (
//             <TouchableOpacity
//               style={styles.uploadBox}
//               onPress={() => handleBrowseFile('back')}
//             >
//               <Ionicons
//                 name="cloud-upload-outline"
//                 size={moderateScale(20)}
//                 color="#999"
//               />
//               <Text style={styles.uploadText}>
//                 {docBack ? docBack.fileName : fields.backText}
//               </Text>
//             </TouchableOpacity>
//           )}

//           {/* GST Upload */}
//           {data?.vendor_category === 'vendor_dealer' &&
//             data?.vendor_type === 'Registered' && (
//               <>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: '700',
//                     marginVertical: 10,
//                   }}
//                 >
//                   GST Certificate
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.uploadBox}
//                   onPress={() => handleBrowseFile('gst')}
//                 >
//                   <Ionicons
//                     name="cloud-upload-outline"
//                     size={moderateScale(15)}
//                     color="#999"
//                   />
//                   <Text style={styles.uploadText}>
//                     {gstFile ? gstFile.fileName : 'Upload GST Certificate'}
//                   </Text>
//                 </TouchableOpacity>
//               </>
//             )}

//           {/* Checkboxes */}
//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => setConfirmInfo(!confirmInfo)}
//           >
//             <Ionicons
//               name={confirmInfo ? 'checkbox-outline' : 'square-outline'}
//               size={moderateScale(15)}
//               color="#333"
//             />
//             <Text style={styles.checkText}>
//               I confirm that the information provided is accurate and complete.
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => setAgreeTerms(!agreeTerms)}
//           >
//             <Ionicons
//               name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
//               size={moderateScale(15)}
//               color="#333"
//             />
//             <Text style={styles.checkText}>
//               I agree to the terms & conditions.
//             </Text>
//           </TouchableOpacity>

//           {/* Submit */}
//           <TouchableOpacity
//             style={styles.submitBtn}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             <Text style={styles.submitText}>
//               {loading ? 'Submitting...' : 'Submit'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default KycScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   card: {
//     backgroundColor: '#FFF',
//     // marginTop: verticalScale(10),
//     // marginHorizontal: responsiveWidth(3),
//     padding: moderateScale(16),
//   },

//   title: {
//     fontSize: responsiveFontSize(2.4),
//     fontWeight: '700',
//     marginBottom: verticalScale(4),
//   },

//   subtitle: {
//     fontSize: responsiveFontSize(1.6),
//     color: '#555',
//     marginBottom: verticalScale(12),
//   },

//   dropdownHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#DDD',
//     padding: moderateScale(15),
//     borderRadius: 12,
//     backgroundColor: '#FAFAFA',
//   },

//   dropdownSelected: {
//     fontSize: responsiveFontSize(1.7),
//     textTransform: 'capitalize',
//   },

//   dropdownItem: {
//     padding: moderateScale(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },

//   dropdownText: {
//     textTransform: 'capitalize',
//     fontSize: responsiveFontSize(1.7),
//   },

//   input: {
//     marginTop: verticalScale(10),
//     borderWidth: 1,
//     borderColor: '#DDD',
//     padding: moderateScale(15),
//     borderRadius: 12,
//     backgroundColor: '#FAFAFA',
//     fontSize: responsiveFontSize(1.5),
//   },

//   uploadBox: {
//     marginTop: verticalScale(12),
//     borderWidth: 1.2,
//     borderColor: '#C8C8C8',
//     borderStyle: 'dashed',
//     borderRadius: 14,
//     padding: moderateScale(16),
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F8F8',
//   },

//   uploadText: {
//     marginLeft: moderateScale(10),
//     fontSize: responsiveFontSize(1.5),
//     color: '#444',
//   },

//   checkboxRow: {
//     flexDirection: 'row',
//     marginTop: verticalScale(10),
//     alignItems: 'center',
//   },

//   checkText: {
//     marginLeft: moderateScale(10),
//     fontSize: responsiveFontSize(1.5),
//     color: '#444',
//     flex: 1,
//   },

//   submitBtn: {
//     marginTop: verticalScale(25),
//     backgroundColor: '#111',
//     padding: moderateScale(13),
//     borderRadius: 14,
//     alignItems: 'center',
//   },

//   submitText: {
//     color: '#FFF',
//     fontSize: responsiveFontSize(2),
//     fontWeight: '700',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../../redux/slices/profileSlice';
import Header from '../../../../constants/Header';
import { API_BASE_URL } from '../../../../utils/utils';
import Toast from 'react-native-toast-message';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const KycScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const { data } = useSelector(state => state.profile);

  const [documentNo, setDocumentNo] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('aadhaar');
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [docFront, setDocFront] = useState(null);
  const [docBack, setDocBack] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const documentTypes = [
    'aadhaar',
    'driving_licence',
    'voter_id',
    'passport',
    'pan_number',
  ];

  const docFields = {
    aadhaar: {
      numberField: 'aadhaar_no',
      frontField: 'aadhaar_front',
      backField: 'aadhaar_back',
      placeholder: 'Enter Aadhaar Number',
      frontText: 'Upload Aadhaar Front',
      backText: 'Upload Aadhaar Back',
    },
    driving_licence: {
      numberField: 'dl_no',
      frontField: 'dl_front',
      backField: 'dl_back',
      placeholder: 'Enter Driving Licence Number',
      frontText: 'Upload DL Front',
      backText: 'Upload DL Back',
    },
    voter_id: {
      numberField: 'voter_id',
      frontField: 'voter_id_front',
      backField: 'voter_id_back',
      placeholder: 'Enter Voter ID Number',
      frontText: 'Upload Voter ID Front',
      backText: 'Upload Voter ID Back',
    },
    passport: {
      numberField: 'passport_no',
      frontField: 'passport_front',
      backField: 'passport_back',
      placeholder: 'Enter Passport Number',
      frontText: 'Upload Passport Front',
      backText: 'Upload Passport Back',
    },
    pan_number: {
      numberField: 'customer_pan',
      frontField: 'pan_img',
      backField: null,
      placeholder: 'Enter PAN Number',
      frontText: 'Upload PAN',
      backText: null,
    },
  };

  const fields = docFields[selectedDocType];

  /* ---------------- IMAGE PICKER ---------------- */

  const pickImage = (type, source) => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.8,
      saveToPhotos: true,
    };

    const callback = response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      const file = response.assets?.[0];
      if (!file) return;

      if (type === 'front') setDocFront(file);
      if (type === 'back') setDocBack(file);
      if (type === 'gst') setGstFile(file);
    };

    source === 'camera'
      ? launchCamera(options, callback)
      : launchImageLibrary(options, callback);
  };

  const showPickerOptions = type => {
    Alert.alert(
      'Upload Document',
      'Choose option',
      [
        { text: 'Camera', onPress: () => pickImage(type, 'camera') },
        { text: 'Gallery', onPress: () => pickImage(type, 'gallery') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (
      !documentNo ||
      !docFront ||
      (fields.backField && !docBack) ||
      !confirmInfo ||
      !agreeTerms
    ) {
      return Alert.alert('Error', 'Please complete all fields.');
    }

    if (
      data?.vendor_category === 'vendor_dealer' &&
      data?.vendor_type === 'Registered' &&
      !gstFile
    ) {
      return Alert.alert('Error', 'Please upload GST Certificate.');
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('user_id', userId);
      formData.append('proof_of_identity', selectedDocType);
      formData.append(fields.numberField, documentNo);

      formData.append(fields.frontField, {
        uri: docFront.uri,
        type: docFront.type,
        name: docFront.fileName || 'front.jpg',
      });

      if (fields.backField) {
        formData.append(fields.backField, {
          uri: docBack.uri,
          type: docBack.type,
          name: docBack.fileName || 'back.jpg',
        });
      }

      if (
        data?.vendor_category === 'vendor_dealer' &&
        data?.vendor_type === 'Registered'
      ) {
        formData.append('gst_certificate', {
          uri: gstFile.uri,
          type: gstFile.type,
          name: gstFile.fileName || 'gst.jpg',
        });
      }

      const res = await fetch(
        `${API_BASE_URL}/buyer/documents/store`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const json = await res.json();

      console.log('json---------------------->', json);

      Toast.show({
        type: 'success',
        text2: json?.message || 'KYC Submitted',
      });

      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <View style={styles.container}>
      <Header title="KYC" navigation={navigation} showBack />

      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>KYC Verification</Text>
          <Text style={styles.subtitle}>
            Upload valid government identity
          </Text>

          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={{ textTransform: 'capitalize' }}>
              {selectedDocType}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>

          {showDropdown &&
            documentTypes.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedDocType(item);
                  setDocFront(null);
                  setDocBack(null);
                  setShowDropdown(false);
                }}
              >
                <Text style={{ textTransform: 'capitalize' }}>{item}</Text>
              </TouchableOpacity>
            ))}

          <TextInput
            style={styles.input}
            placeholder={fields.placeholder}
            value={documentNo}
            onChangeText={setDocumentNo}
          />

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => showPickerOptions('front')}
          >
            <Ionicons name="cloud-upload-outline" size={18} />
            <Text style={styles.uploadText}>
              {docFront?.fileName || fields.frontText}
            </Text>
          </TouchableOpacity>

          {fields.backField && (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => showPickerOptions('back')}
            >
              <Ionicons name="cloud-upload-outline" size={18} />
              <Text style={styles.uploadText}>
                {docBack?.fileName || fields.backText}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setConfirmInfo(!confirmInfo)}
          >
            <Ionicons
              name={confirmInfo ? 'checkbox' : 'square-outline'}
              size={18}
            />
            <Text style={styles.checkText}>
              I confirm information is correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <Ionicons
              name={agreeTerms ? 'checkbox' : 'square-outline'}
              size={18}
            />
            <Text style={styles.checkText}>
              I agree to terms & conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default KycScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { padding: moderateScale(16) },
  title: { fontSize: responsiveFontSize(2.4), fontWeight: '700' },
  subtitle: { color: '#666', marginBottom: 10 },
  dropdownHeader: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  uploadBox: {
    marginTop: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadText: { marginLeft: 10 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkText: { marginLeft: 10, flex: 1 },
  submitBtn: {
    marginTop: 24,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700' },
});
