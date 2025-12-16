import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

const ShippingDeliveryInfo = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Shipping & Delivery Info"
        navigation={navigation}
        showBack={true}
        showSearch
      />

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Delivery Timelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Timelines</Text>
          <Text style={styles.text}>- Delhi/NCR: 2–3 business days</Text>
          <Text style={styles.text}>- Other Metros: 3–5 business days</Text>
          <Text style={styles.text}>- Rest of India: 5–7 business days</Text>
          <Text style={styles.note}>
            Note: Delivery times may vary due to unforeseen circumstances.
          </Text>
        </View>

        {/* Shipping Charges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Charges</Text>
          <Text style={styles.text}>
            - Free shipping on orders above ₹2,000
          </Text>
          <Text style={styles.text}>
            - Flat shipping fee of ₹50 for orders below ₹2,000
          </Text>
          <Text style={styles.text}>
            - Custom shipping rates may apply for bulk orders
          </Text>
        </View>

        {/* Courier Partners */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courier Partners</Text>
          <Text style={styles.text}>
            We partner with leading courier services to ensure timely delivery:
          </Text>
          <Text style={styles.text}>- Delhivery</Text>
          <Text style={styles.text}>- Blue Dart</Text>
          <Text style={styles.text}>- Ecom Express</Text>
          <Text style={styles.note}>
            *Note: Courier partner may vary based on your location.
          </Text>
        </View>

        {/* Tracking Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracking Orders</Text>
          <Text style={styles.text}>You can track your order through:</Text>
          <Text style={styles.text}>- "My Orders" section in the app</Text>
          <Text style={styles.text}>
            - Real-time updates and push notifications
          </Text>
          <Text style={styles.text}>
            - Courier partner&apos;s website (links provided in order details)
          </Text>
        </View>

        {/* Packaging Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Packaging Info</Text>
          <Text style={styles.text}>
            We ensure secure and eco-friendly packaging for all orders.
            Accessories may be packed separately.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShippingDeliveryInfo;

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
//     marginBottom: 4,
//   },
//   note: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 6,
//     lineHeight: 18,
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
    marginBottom: verticalScale(4),
  },
  note: {
    fontSize: responsiveFontSize(1.7), // ~13
    color: '#666',
    marginTop: verticalScale(6),
    lineHeight: verticalScale(18),
  },
});

