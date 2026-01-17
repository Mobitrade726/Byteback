import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReturnRefundPolicy = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}

      <Header
        title="Return & Refund Policy"
        navigation={navigation}
        showBack={true}
        showSearch
      />

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Eligibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eligibility</Text>
          <Text style={styles.bullet}>
            • Returns accepted within 7 days of delivery.
          </Text>
          <Text style={styles.bullet}>
            • Product must be in original packaging.
          </Text>
          <Text style={styles.bullet}>
            • Only refurbished/graded products in original condition are
            eligible.
          </Text>
          <Text style={styles.bullet}>
            • Items not eligible: Damaged due to misuse, Missing parts, etc.
          </Text>
        </View>

        {/* Return Process */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Process</Text>
          <Text style={styles.bullet}>
            • Go to My Orders → Select the order → Tap Return. Choose reason for
            return (Damaged, Wrong Product, Changed Mind, Other).
          </Text>
          <Text style={styles.bullet}>
            • Schedule a pickup (weekdays only). Packaging: Secure in original
            box or equivalent.
          </Text>
          <Text style={styles.bullet}>
            • Inspection: Byteback team inspects product within 2 business
            days.
          </Text>
          <Text style={styles.bullet}>
            • Refund Timeline: Bank transfer / UPI: 3–5 business days.
          </Text>
          <Text style={styles.bullet}>
            • Wallet/Store Credit: 1–2 business days. Track return status under
            ‘My Orders → Returns’.
          </Text>
        </View>

        {/* Refund Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refund Policy</Text>
          <Text style={styles.bullet}>
            • Refund = Product Price – Applicable Deductions.
          </Text>
          <Text style={styles.bullet}>
            • Refunds issued via original payment method.
          </Text>
          <Text style={styles.bullet}>
            • Partial refunds: Only for returned items.
          </Text>
        </View>

        {/* Exceptions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exceptions</Text>
          <Text style={styles.bullet}>
            • Items damaged by user or missing parts → rejected.
          </Text>
          <Text style={styles.bullet}>
            • Products outside 7-day return window → cannot be returned.
          </Text>
          <Text style={styles.bullet}>
            • Gifted items → Returns only by original purchaser.
          </Text>
          <Text style={styles.bullet}>
            • Third-party accessories → Separate return rules may apply.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReturnRefundPolicy;

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
//   section: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 12,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 8,
//     color: '#000',
//   },
//   bullet: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 6,
//     lineHeight: 20,
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
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: verticalScale(12),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(1.9), // ~15
    fontWeight: '700',
    marginBottom: verticalScale(8),
    color: '#000',
  },
  bullet: {
    fontSize: responsiveFontSize(1.8), // ~14
    color: '#333',
    marginBottom: verticalScale(6),
    lineHeight: verticalScale(20),
  },
});
