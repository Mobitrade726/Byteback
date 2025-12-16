// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   Modal,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../../../constants/Header';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   fetchReturnReasons,
//   createReturnTicket,
//   clearTicketResponse,
// } from '../../../../redux/slices/returnSlice';

// const REASONS = [
//   'Defective Product',
//   'Wrong Item Received',
//   'Damaged During Shipping',
//   'Item Not as Described',
//   'Missing Parts',
//   'Incorrect Size',
//   'Function not working',
//   'Duplicate Order',
//   'Incompatible Device',
//   'Other',
// ];

// const ReturnRequest = ({navigation}) => {
//   const [showReasons, setShowReasons] = useState(false);
//   const [selectedReasons, setSelectedReasons] = useState([]);
//   const [additionalInfo, setAdditionalInfo] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const dispatch = useDispatch();
//   const {reasons, loading} = useSelector(state => state.returns);

//   useEffect(() => {
//     dispatch(fetchReturnReasons());
//   }, [dispatch]);

//   const toggleReason = reason => {
//     setSelectedReasons(prev =>
//       prev.includes(reason)
//         ? prev.filter(r => r !== reason)
//         : [...prev, reason],
//     );
//   };

//   const handleSubmit = () => {
//     // Handle submission logic here
//     setModalVisible(true); // Show modal
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fffdfd'}}>
//       <Header title="Return request" navigation={navigation} showBack={true} />

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Upload Video */}
//         <TouchableOpacity style={styles.uploadCard}>
//           <View style={{flex: 1}}>
//             <Text style={styles.cardTitle}>Upload video</Text>
//             <Text style={styles.cardSubtitle}>
//               Tap to upload a video of the product to show the issue.
//             </Text>
//           </View>
//           <View style={{alignItems: 'center'}}>
//             <Image
//               source={require('../../../../../assets/images/videocall.png')}
//               style={{width: 70, height: 70, resizeMode: 'contain'}}
//             />
//             <Text style={styles.videoFormats}>
//               Accepted formats:{'\n'}MP4, MOV.
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* Reason for return */}
//         <Text style={styles.sectionTitle}>Reason for return</Text>

//         <TouchableOpacity
//           style={styles.dropdown}
//           onPress={() => setShowReasons(prev => !prev)}>
//           <Text style={{color: selectedReasons.length ? '#000' : '#999'}}>
//             {selectedReasons.length
//               ? selectedReasons.join(', ')
//               : 'Select reasons'}
//           </Text>
//           <Ionicons
//             name={showReasons ? 'chevron-up' : 'chevron-down'}
//             size={20}
//             color="#999"
//           />
//         </TouchableOpacity>

//         <Text style={styles.multiReasonHint}>
//           You can select multiple reasons
//         </Text>

//         {showReasons && (
//           <View style={styles.reasonList}>
//             {reasons.map(reason => (
//               <TouchableOpacity
//                 key={reason.id}
//                 onPress={() => toggleReason(reason)}
//                 style={styles.reasonItem}>
//                 <Text style={styles.reasonText}>{reason.reason_name}</Text>

//                 <Ionicons
//                   name={
//                     selectedReasons.some(r => r.id === reason.id)
//                       ? 'checkmark-circle'
//                       : 'ellipse-outline'
//                   }
//                   size={20}
//                   color={
//                     selectedReasons.some(r => r.id === reason.id)
//                       ? 'green'
//                       : '#ccc'
//                   }
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         <TextInput
//           placeholder="Additional explanation...."
//           multiline
//           numberOfLines={5}
//           value={additionalInfo}
//           onChangeText={setAdditionalInfo}
//           style={styles.textArea}
//         />
//       </ScrollView>

//       {/* Submit */}
//       <TouchableOpacity style={styles.requestBtn} onPress={handleSubmit}>
//         <Ionicons name="send-outline" size={20} color="#000" />
//         <Text style={styles.requestText}>Request Return</Text>
//       </TouchableOpacity>

//       {/* ✅ Modal */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.checkCircle}>
//               <Ionicons name="checkmark" size={40} color="green" />
//             </View>
//             <Text style={styles.modalTitle}>Request Generated</Text>
//             <Text style={styles.modalSub}>
//               We will get back to you as soon as possible regarding your
//               concern.
//             </Text>
//             <TouchableOpacity
//               style={styles.doneBtn}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.doneText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default ReturnRequest;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   backBtn: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 2},
//     marginRight: 12,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   uploadCard: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 6,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: '#666',
//   },
//   videoFormats: {
//     fontSize: 11,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 6,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 10,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     padding: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   multiReasonHint: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   reasonList: {
//     backgroundColor: '#F9FCFF',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 16,
//   },
//   reasonItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#eee',
//   },
//   reasonText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   textArea: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     padding: 12,
//     fontSize: 14,
//     color: '#000',
//     textAlignVertical: 'top',
//     backgroundColor: '#fff',
//     marginBottom: 20,
//   },
//   requestBtn: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     borderColor: '#ccc',
//     backgroundColor: '#F5FFF5',
//     borderWidth: 1,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   requestText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 8,
//     color: '#000',
//   },

//   // ✅ Modal styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//     width: '80%',
//   },
//   checkCircle: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#e4f8ea',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'green',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   modalSub: {
//     fontSize: 14,
//     color: '#444',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   doneBtn: {
//     backgroundColor: '#000',
//     borderRadius: 8,
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//   },
//   doneText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReturnReasons,
  createReturnTicket,
  clearTicketResponse,
} from '../../../../redux/slices/returnSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReturnRequest = ({ navigation, route }) => {
  const [showReasons, setShowReasons] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const userId = useSelector(state => state.auth.userId);
  const { barcodeId, invoiceId, delivery_type_option } = route.params || {};
  const [isSubmitting, setIsSubmitting] = useState(false);


  const dispatch = useDispatch();
  const { reasons, loading } = useSelector(state => state.returns);

  useEffect(() => {
    dispatch(fetchReturnReasons());
  }, [dispatch]);

  // FIXED: Object toggle works correctly
  const toggleReason = item => {
    setSelectedReasons(prev =>
      prev.some(r => r.id === item.id)
        ? prev.filter(r => r.id !== item.id)
        : [...prev, item],
    );
    setShowReasons(false);
  };
  const pickVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) return;

        if (response.assets && response.assets.length > 0) {
          setVideoFile(response.assets[0]);
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert('Please upload a video');
      return;
    }
    setIsSubmitting(true); // <-- loader start

    const payload = {
      sales_return_barcode_id: barcodeId,
      sales_return_ticket_invoice_id: invoiceId,
      sales_return_ticket_vendor_sales_id: userId,
      delivery_type_option: delivery_type_option,
      remarks: additionalInfo,
      return_reason_id: selectedReasons.map(r => r.id),
      sales_return_video_upload: videoFile, // <-- Add video
    };


    const result = await dispatch(createReturnTicket(payload));


    if (result?.payload?.status === 'true') {
      Toast.show({ type: 'success', text2: result?.payload?.msg });
      navigation.navigate('Myorder');
      setIsSubmitting(false);
    } else {
      Toast.show({ type: 'error', text2: result?.payload?.msg });
      setIsSubmitting(false); // <-- loader stop
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fffdfd' }}>
      <Header title="Return request" navigation={navigation} showBack={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Upload Video */}
        <TouchableOpacity style={styles.uploadCard} onPress={pickVideo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Upload video</Text>
            <Text style={styles.cardSubtitle}>
              Tap to upload a video of the product to show the issue.
            </Text>

            {videoFile && (
              <Text style={{ marginTop: 8, color: 'green', fontWeight: '600' }}>
                📹 {videoFile.fileName}
              </Text>
            )}
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../../../assets/images/videocall.png')}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
            <Text style={styles.videoFormats}>Accepted formats: MP4, MOV.</Text>
          </View>
        </TouchableOpacity>

        {/* Reason for return */}
        <Text style={styles.sectionTitle}>Reason for return</Text>

        {/* Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowReasons(prev => !prev)}
        >
          <Text style={{ color: selectedReasons.length ? '#000' : '#999' }}>
            {selectedReasons.length
              ? selectedReasons.map(r => r.reason_name).join(', ')
              : 'Select reasons'}
          </Text>
          <Ionicons
            name={showReasons ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        <Text style={styles.multiReasonHint}>
          You can select multiple reasons
        </Text>

        {/* Reason List */}
        {showReasons && (
          <View style={styles.reasonList}>
            {reasons.map(reason => (
              <TouchableOpacity
                key={reason.id}
                onPress={() => toggleReason(reason)}
                style={styles.reasonItem}
              >
                <Text style={styles.reasonText}>{reason.reason_name}</Text>

                <Ionicons
                  name={
                    selectedReasons.some(r => r.id === reason.id)
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={20}
                  color={
                    selectedReasons.some(r => r.id === reason.id)
                      ? 'green'
                      : '#ccc'
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TextInput
          placeholder="Additional explanation...."
          multiline
          numberOfLines={5}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          style={styles.textArea}
        />

        {/* Submit */}
        {/* <TouchableOpacity style={styles.requestBtn} onPress={handleSubmit}>
          <Ionicons name="send-outline" size={20} color="#000" />
          <Text style={styles.requestText}>Request Return</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.requestBtn}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <>
              <Ionicons name="send-outline" size={20} color="#000" />
              <Text style={styles.requestText}>Request Return</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={40} color="green" />
            </View>
            <Text style={styles.modalTitle}>Request Generated</Text>
            <Text style={styles.modalSub}>
              We will get back to you as soon as possible regarding your
              concern.
            </Text>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReturnRequest;

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  content: {
    padding: scale(16),
    paddingBottom: verticalScale(30),
  },
  uploadCard: {
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(12),
    padding: scale(16),
    flexDirection: 'row',
    marginBottom: verticalScale(20),
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: RF(2),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(6),
  },
  cardSubtitle: {
    fontSize: RF(1.6),
    color: '#666',
  },
  videoFormats: {
    fontSize: RF(1.2),
    color: '#666',
    textAlign: 'center',
    marginTop: verticalScale(6),
  },
  sectionTitle: {
    fontSize: RF(2),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(10),
  },
  dropdown: {
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(12),
    padding: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  multiReasonHint: {
    fontSize: RF(1.2),
    color: '#999',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(8),
  },
  reasonList: {
    backgroundColor: '#F9FCFF',
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(16),
  },
  reasonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    borderBottomWidth: scale(0.5),
    borderBottomColor: '#eee',
  },
  reasonText: {
    fontSize: RF(1.5),
    color: '#000',
  },
  textArea: {
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(12),
    padding: scale(12),
    height: verticalScale(120),
    fontSize: RF(1.5),
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: verticalScale(20),
  },
  requestBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: '#F5FFF5',
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(10),
    marginHorizontal: scale(1),
    marginBottom: verticalScale(12),
  },
  requestText: {
    fontSize: RF(1.6),
    fontWeight: '500',
    marginLeft: scale(8),
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(24),
    alignItems: 'center',
    width: '80%',
  },
  checkCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: '#e4f8ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: RF(2),
    fontWeight: 'bold',
    color: 'green',
    marginBottom: verticalScale(8),
  },
  modalSub: {
    fontSize: RF(1.5),
    color: '#444',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  doneBtn: {
    backgroundColor: '#000',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.5),
  },
  inputGroup: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: RF(1.5),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(6),
  },
  inputField: {
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(12),
    padding: scale(12),
    fontSize: RF(1.5),
    backgroundColor: '#fff',
  },
});
