// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {styles} from './styles';

// const Addresses = ({navigation}) => {
//   const [activeTab, setActiveTab] = useState('Billing');
//   const [selectedAddress, setSelectedAddress] = useState('Home');

//   const addresses = [
//     {
//       id: '1',
//       type: 'Home',
//       label: 'default',
//       address: '123 Elm Street, Springfield, IL 62701',
//       icon: 'home-outline',
//     },
//     {
//       id: '2',
//       type: 'Warehouse',
//       label: 'work',
//       address: '123 Elm Street, Springfield, IL 62701',
//       icon: 'business-outline',
//     },
//     {
//       id: '3',
//       type: 'Office',
//       label: 'office',
//       address: '123 Elm Street, Springfield, IL 62701',
//       icon: 'storefront-outline',
//     },
//   ];

//   const renderAddress = ({item}) => (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <View style={{justifyContent: 'center'}}>
//           <Ionicons name={item.icon} size={24} color="#11A5D7" />
//         </View>
//         <View style={styles.iconText}>
//           <Text style={styles.title}>{item.type}</Text>
//           <Text style={styles.address}>{item.address}</Text>
//         </View>
//         <TouchableOpacity onPress={()=> navigation.navigate('AddNewAddress')}>
//           <Text style={styles.edit}>Edit</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => setSelectedAddress(item.type)}>
//         <Ionicons
//           name={
//             selectedAddress === item.type
//               ? 'radio-button-on'
//               : 'radio-button-off'
//           }
//           size={20}
//           color="#11A5D7"
//         />
//         <Text style={styles.defaultLabel}>{item.label}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.headerTitle}>Saved Address</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       {/* Address List */}
//       <FlatList
//         data={addresses}
//         keyExtractor={item => item.id}
//         renderItem={renderAddress}
//         contentContainerStyle={{padding: 15}}
//       />

//       {/* Add Address Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate('AddNewAddress')}
//         style={styles.addButton}>
//         <Ionicons name="add-circle-outline" size={22} color="#fff" />
//         <Text style={styles.addButtonText}>Add New Address</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default Addresses;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { styles } from './styles';
import { API_BASE_URL } from '../../../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../../constants/Header';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const Addresses = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.userId);

  // 🔹 Fetch address data from API

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      // ✅ Use GET request with proper Authorization header
      const response = await axios.get(
        `${API_BASE_URL}/buyer-address/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status && response.data.data) {
        const formattedAddresses = response.data.data;
        // const formattedAddresses = [
        //   {
        //     id: addr.user_address_id?.toString() || '0',
        //     type: addr.address_type || 'Home',
        //     address: `${addr.billing_Address}, ${addr.billing_City}, ${addr.billing_State} - ${addr.billing_Zip}`,
        //     // shippingAddress: `${addr.shipping_Address}, ${addr.shipping_City}, ${addr.shipping_State} - ${addr.shipping_Zip}`,
        //     icon:
        //       addr.address_type?.toLowerCase() === 'office'
        //         ? 'storefront-outline'
        //         : addr.address_type?.toLowerCase() === 'warehouse'
        //         ? 'business-outline'
        //         : 'home-outline',
        //     label: addr.address_type?.toLowerCase() || 'default',
        //   },
        // ];
        setAddresses(formattedAddresses);
        // setSelectedAddress(formattedAddresses?.address_type);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to fetch address',
        );
      }
    } catch (error) {
      console.error('API Error:', error?.response?.data || error.message);
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Unable to fetch addresses from server.',
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  const renderAddress = ({ item }) => (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Ionicons
            name={
              item.address_type === 'Work'
                ? 'business-outline'
                : item.address_type === 'Office'
                ? 'storefront-outline'
                : 'home-outline'
            }
            size={moderateScale(24)}
            color="#11A5D7"
          />
        </View>

        {/* Address Text */}
        <View style={styles.textSection}>
          <Text style={styles.typeText}>{item.address_type}</Text>

          <Text style={styles.address}>
            {item.billing_Address}, {item.billing_City}, {item.billing_State} -{' '}
            {item.billing_Zip}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewAddress', {
              editNewAddress: 'editNewAddress',
              user_address_id: item?.user_address_id,
            })
          }
        >
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Selection */}
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setSelectedAddress(item.address_type)}
      >
        <Ionicons
          name={
            selectedAddress === item.address_type
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={moderateScale(22)}
          color="#11A5D7"
        />
        <Text style={styles.defaultLabel}>Deliver to {item.address_type}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Saved Address" navigation={navigation} showBack={true} />

      {/* Loader */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#11A5D7" />
          <Text style={{ marginTop: moderateScale(10) }}>
            Loading Addresses...
          </Text>
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={renderAddress}
          contentContainerStyle={{ marginHorizontal: moderateScale(10) }}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                color: '#555',
                marginTop: moderateScale(2),
              }}
            >
              No saved addresses found.
            </Text>
          }
        />
      )}

      {/* Add Address Button */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddNewAddress', {
            addNewAddress: 'addNewAddress',
            type: selectedAddress,
          })
        }
        style={styles.addButton}
      >
        <Ionicons
          name="add-circle-outline"
          size={moderateScale(22)}
          color="#fff"
        />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Addresses;
