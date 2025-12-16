import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../utils/utils';
import { useRoute } from '@react-navigation/native';
import Header from '../../../../constants/Header';

const AddNewAddress = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const route = useRoute();
  const { editNewAddress, addNewAddress, type, user_address_id } =
    route.params || {};

  const [addressTag, setAddressTag] = useState(type || 'Home'); // Home / Work / Office

  const [billing, setBilling] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });

  const [shipping, setShipping] = useState({
    address: '',
    zip: '',
    city: '',
    state: '',
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleBillingChange = (key, value) =>
    setBilling({ ...billing, [key]: value });
  const handleShippingChange = (key, value) =>
    setShipping({ ...shipping, [key]: value });

  // Auto copy billing to shipping
  useEffect(() => {
    if (sameAsBilling) setShipping(billing);
  }, [billing, sameAsBilling]);

  // Fetch existing address only if editing
  useEffect(() => {
    const fetchAddress = async () => {
      if (!editNewAddress) return;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/buyer-address/${userId}/${user_address_id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data?.data) {
          const addr = response.data.data[0];
          setAddressTag(addr.address_type || 'Home');
          setBilling({
            address: addr.billing_Address || '',
            zip: addr.billing_Zip || '',
            city: addr.billing_City || '',
            state: addr.billing_State || '',
          });
          setShipping({
            address: addr.shipping_Address || '',
            zip: addr.shipping_Zip || '',
            city: addr.shipping_City || '',
            state: addr.shipping_State || '',
          });
        }
      } catch (error) {}
    };

    fetchAddress();
  }, [editNewAddress]);

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!billing.address.trim())
      newErrors.billingAddress = 'Billing address required';
    if (!billing.zip.trim()) newErrors.billingZip = 'Billing ZIP required';
    if (!billing.city.trim()) newErrors.billingCity = 'Billing city required';
    if (!billing.state.trim())
      newErrors.billingState = 'Billing state required';

    if (!sameAsBilling) {
      if (!shipping.address.trim())
        newErrors.shippingAddress = 'Shipping address required';
      if (!shipping.zip.trim()) newErrors.shippingZip = 'Shipping ZIP required';
      if (!shipping.city.trim())
        newErrors.shippingCity = 'Shipping city required';
      if (!shipping.state.trim())
        newErrors.shippingState = 'Shipping state required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save/Submit
  const handle = async () => {
    if (!validate()) return;

    setLoading(true);


    try {
      setLoading(true);

      let response;

      if (editNewAddress) {
        response = await axios.post(
          `${API_BASE_URL}/updatebuyer-address`,
          {
            user_address_id: user_address_id,
            address_type: addressTag,
            billing_Address: billing.address,
            billing_Zip: billing.zip,
            billing_City: billing.city,
            billing_State: billing.state,
            shipping_Address: shipping.address,
            shipping_Zip: shipping.zip,
            shipping_City: shipping.city,
            shipping_State: shipping.state,
            user_id: userId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/buyer-address`,
          {
            address_type: addressTag,
            billing_Address: billing.address,
            billing_Zip: billing.zip,
            billing_City: billing.city,
            billing_State: billing.state,
            shipping_Address: shipping.address,
            shipping_Zip: shipping.zip,
            shipping_City: shipping.city,
            shipping_State: shipping.state,
            vendor_sales_id: userId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      setLoading(false);
      Alert.alert('✅ Success', response.data.message);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      Alert.alert(
        '❌ Error',
        JSON.stringify(error.response?.data || error.message),
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        title={editNewAddress ? 'Update Address' : 'Saved Address'}
        navigation={navigation}
        showBack={true}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Address Tag Selector */}
        <View style={styles.tagContainer}>
          {['Home', 'Work', 'Office'].map(tag => (
            <TouchableOpacity
              key={tag}
              onPress={() => setAddressTag(tag)}
              style={[
                styles.tagButton,
                addressTag === tag && styles.tagButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  addressTag === tag && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Billing */}
        <Text style={styles.heading}>Billing Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={billing.address}
          onChangeText={text => handleBillingChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={billing.zip}
          onChangeText={text => handleBillingChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={billing.city}
          onChangeText={text => handleBillingChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={billing.state}
          onChangeText={text => handleBillingChange('state', text)}
        />

        {/* Same as Billing */}
        <View style={styles.checkboxRow}>
          <CheckBox value={sameAsBilling} onValueChange={setSameAsBilling} />
          <Text style={styles.checkboxLabel}>Same as Billing Address</Text>
        </View>

        {/* Shipping */}
        <Text style={styles.heading}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shipping.address}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={shipping.zip}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shipping.city}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={shipping.state}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('state', text)}
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handle}
          disabled={loading}
        >
          {editNewAddress ? (
            <Text style={styles.saveText}>
              {loading ? 'Saving...' : 'Update'}
            </Text>
          ) : (
            <Text style={styles.saveText}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddress;

// const styles = StyleSheet.create({
//   container: {padding: 0, paddingBottom: 0, marginHorizontal:10},
//   heading: {fontSize: 16, fontWeight: '600', marginTop: 20},
//   input: {
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 10,
//   },
//   saveBtn: {
//     backgroundColor: '#29A9E0',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   saveText: {color: '#fff', fontWeight: '600'},
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
//   checkboxRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
//   checkboxLabel: {marginLeft: 8},
//   tagContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   tagButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 8,
//     paddingVertical: 8,
//     marginHorizontal: 4,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   tagButtonSelected: {backgroundColor: '#29A9E0', borderColor: '#29A9E0'},
//   tagText: {color: '#000', fontWeight: '500'},
//   tagTextSelected: {color: '#fff'},
// });

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(10),
    paddingBottom: verticalScale(20),
  },
  heading: {
    fontSize: responsiveFontSize(2), // ~16
    fontWeight: '600',
    marginTop: verticalScale(20),
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginTop: verticalScale(10),
    fontSize: responsiveFontSize(1.8),
  },
  saveBtn: {
    backgroundColor: '#29A9E0',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  checkboxLabel: {
    marginLeft: moderateScale(8),
    fontSize: responsiveFontSize(1.8),
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  tagButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    marginHorizontal: moderateScale(4),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tagButtonSelected: {
    backgroundColor: '#29A9E0',
    borderColor: '#29A9E0',
  },
  tagText: {
    color: '#000',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8),
  },
  tagTextSelected: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
  },
});
