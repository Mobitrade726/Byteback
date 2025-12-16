import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';

const supportOptions = [
  {id: '1', title: 'FAQs', screen: 'FAQsScreen'},
  {id: '2', title: 'Return & Refund Policy', screen: 'ReturnRefundPolicy'},
  {id: '3', title: 'Shipping & Delivery Info', screen: 'ShippingDeliveryInfo'},
  {id: '4', title: 'Terms & Conditions', screen: 'TermsConditions'},
  {id: '5', title: 'Contact Us', screen: 'ContactUs'},
];

const HelpSupport = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(item.screen)}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={moderateScale(20)} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title='Help & Support'
        navigation={navigation}
        showBack={true} showSearch
      />

      {/* Support List */}
      <FlatList
        data={supportOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
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
//     left: 0,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   list: {
//     paddingHorizontal: 16,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     borderBottomWidth: 0.7,
//     borderBottomColor: '#eee',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: 'medium',
//     color: '#171D1C',
//   },
// });

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    padding: moderateScale(6),
    left: 0,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2), // ~16
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: moderateScale(16),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(18),
    borderBottomWidth: 0.7,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: responsiveFontSize(1.9), // ~16
    fontWeight: '500',
    color: '#171D1C',
  },
});


export default HelpSupport;
