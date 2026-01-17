import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsConditions = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
       <Header
        title="Terms & Conditions"
        navigation={navigation}
        showBack={true}
        showSearch
      />

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* User Agreement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Agreement</Text>
          <Text style={styles.text}>
            By using Byteback, you agree to these terms. You must be 18+ to use
            our app. Keep your account confidential. Unauthorized use may lead
            to account termination.
          </Text>
        </View>

        {/* Product Ownership */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Ownership</Text>
          <Text style={styles.text}>
            Ownership transfers upon full payment. We're not liable for shipping
            delays after dispatch. Inspect products immediately upon receipt.
            Disputes must be raised within 7 days.
          </Text>
        </View>

        {/* Returns & Refunds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Returns & Refunds</Text>
          <Text style={styles.text}>
            Returns are governed by our separate policy. Returns must comply
            with our guidelines. We reserve the right to reject non-compliant
            returns.
          </Text>
        </View>

        {/* Payments & Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payments & Pricing</Text>
          <Text style={styles.text}>
            Prices include applicable taxes. We can modify prices anytime.
            Payment is due at purchase. Refunds are processed via the original
            payment method. Report pricing discrepancies within 24 hours.
          </Text>
        </View>

        {/* Liabilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liabilities</Text>
          <Text style={styles.text}>
            We're not liable for courier delays, post-delivery damages, or
            incorrect user info. Verify all details before purchase. We're not
            responsible for data loss or app downtime.
          </Text>
        </View>

        {/* Intellectual Property */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.text}>
            All app content, images, and branding are our property. Unauthorized
            use is prohibited.
          </Text>
        </View>

        {/* Policy Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Updates</Text>
          <Text style={styles.text}>
            We update these terms periodically. The latest version is always
            available in the app. Review them regularly. Continued use implies
            acceptance of updated terms.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;

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
//     marginBottom: 18,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 8,
//     color: '#000',
//   },
//   text: {
//     fontSize: 14,
//     color: '#333',
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
    marginBottom: verticalScale(18),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(1.9), // ~15
    fontWeight: '700',
    marginBottom: verticalScale(8),
    color: '#000',
  },
  text: {
    fontSize: responsiveFontSize(1.8), // ~14
    color: '#333',
    lineHeight: verticalScale(20),
  },
});

