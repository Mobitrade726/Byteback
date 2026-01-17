import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_BASE_URL} from '../../../../utils/utils';

const ContactUs = ({navigation}) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/contact_details`);
        if (response.data?.success) {
          setContactData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching contact details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" style={{marginTop: 50}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Contact Us"
        navigation={navigation}
        showBack={true}
        showSearch
      />
      {/* Content */}
      <View style={styles.content}>
        {/* Customer Support */}
        <Text style={styles.sectionTitle}>Customer Support</Text>

        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons name="call-outline" size={moderateScale(22)} color="#000" />
          </View>
          <View>
            <Text style={styles.contactText}>
              {contactData?.phone || 'N/A'}
            </Text>
            <Text style={styles.subText}>Mon–Sat, 10 AM – 6 PM</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={moderateScale(22)} color="#000" />
          </View>
          <Text style={styles.contactText}>{contactData?.email || 'N/A'}</Text>
        </View>

        {/* Live Chat */}
        <Text style={[styles.sectionTitle, {marginTop: moderateScale(20)}]}>Live Chat</Text>
        <View style={styles.contactRow}>
          <View style={styles.iconBox}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={moderateScale(22)}
              color="#000"
            />
          </View>
          <Text style={styles.contactText}>10 AM – 7 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default ContactUs;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   content: {
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 12,
//     color: '#000',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   iconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#f4f4f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   contactText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000',
//   },
//   subText: {
//     fontSize: 13,
//     color: '#555',
//     marginTop: 2,
//   },
// });

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Header from '../../../../constants/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2), // ~16
    fontWeight: '600',
    color: '#000',
  },
  content: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(1.9), // ~15
    fontWeight: '700',
    marginBottom: verticalScale(12),
    color: '#000',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(8),
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  contactText: {
    fontSize: responsiveFontSize(1.8), // ~14
    fontWeight: '500',
    color: '#000',
  },
  subText: {
    fontSize: responsiveFontSize(1.6), // ~13
    color: '#555',
    marginTop: verticalScale(2),
  },
});
