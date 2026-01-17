import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { API_BASE_URL } from '../../../../utils/utils';
import { useRoute } from '@react-navigation/native';
import Header from '../../../../constants/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

const AddNewAddress = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const [zipLoading, setZipLoading] = useState(false);

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

  useEffect(() => {
    if (sameAsBilling) {
      // ✅ checkbox ON → copy billing to shipping
      setShipping(billing);
    } else {
      // ❌ checkbox OFF → clear shipping fields
      setShipping({
        address: '',
        zip: '',
        city: '',
        state: '',
      });
    }
  }, [sameAsBilling, billing]);

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

  // useEffect(() => {
  //   const fetchPostalDetails = async (zip, type) => {
  //     try {
  //       setZipLoading(true);

  //       const res = await axios.get(`${API_BASE_URL}/get-postal/${zip}`);

  //       console.log('res++++++++++++++++++++++++++==', res?.data?.data);

  //       if (
  //         res.data?.status === 'success' &&
  //         res.data?.data?.PostOffice?.length > 0
  //       ) {
  //         const postOffice = res.data.data.PostOffice[0];

  //         if (type === 'billing') {
  //           setBilling(prev => ({
  //             ...prev,
  //             city: postOffice.District || '',
  //             state: postOffice.State || '',
  //           }));
  //         } else {
  //           setShipping(prev => ({
  //             ...prev,
  //             city: postOffice.District || '',
  //             state: postOffice.State || '',
  //           }));
  //         }
  //       } else {
  //         handleInvalidZip(type);
  //       }
  //     } catch (error) {
  //       handleInvalidZip(type);
  //     } finally {
  //       setZipLoading(false);
  //     }
  //   };

  //   const handleInvalidZip = type => {
  //     if (type === 'billing') {
  //       setBilling(prev => ({
  //         ...prev,
  //         city: '',
  //         state: '',
  //       }));
  //       setErrors(prev => ({
  //         ...prev,
  //         billingZip: 'Invalid ZIP code',
  //       }));
  //     } else {
  //       setShipping(prev => ({
  //         ...prev,
  //         city: '',
  //         state: '',
  //       }));
  //       setErrors(prev => ({
  //         ...prev,
  //         shippingZip: 'Invalid ZIP code',
  //       }));
  //     }
  //   };

  //   // 🔥 Billing ZIP
  //   if (billing.zip.length === 6) {
  //     fetchPostalDetails(billing.zip, 'billing');
  //   }

  //   // 🔥 Shipping ZIP (only when not sameAsBilling)
  //   if (!sameAsBilling && shipping.zip.length === 6) {
  //     fetchPostalDetails(shipping.zip, 'shipping');
  //   }
  // }, [billing.zip, shipping.zip, sameAsBilling]);

  useEffect(() => {
    const fetchPostalDetails = async (zip, type) => {
      try {
        setZipLoading(true);

        const res = await axios.get(`${API_BASE_URL}/get-postal/${zip}`);

        if (
          res.data?.status === 'success' &&
          res.data?.data?.PostOffice?.length > 0
        ) {
          const postOffice = res.data.data.PostOffice[0];

          if (type === 'billing') {
            setBilling(prev => ({
              ...prev,
              city: postOffice.District || '',
              state: postOffice.State || '',
            }));

            // ✅ clear error on success
            setErrors(prev => ({
              ...prev,
              billingZip: '',
            }));
          } else {
            setShipping(prev => ({
              ...prev,
              city: postOffice.District || '',
              state: postOffice.State || '',
            }));

            setErrors(prev => ({
              ...prev,
              shippingZip: '',
            }));
          }
        } else {
          handleInvalidZip(type, res.data?.message || 'Invalid ZIP code');
        }
      } catch (error) {
        handleInvalidZip(
          type,
          error.response?.data?.message || 'Invalid ZIP code',
        );
      } finally {
        setZipLoading(false);
      }
    };

    const handleInvalidZip = (type, message) => {
      if (type === 'billing') {
        setBilling(prev => ({
          ...prev,
          city: '',
          state: '',
        }));

        setErrors(prev => ({
          ...prev,
          billingZip: message, // 🔴 API MESSAGE
        }));
      } else {
        setShipping(prev => ({
          ...prev,
          city: '',
          state: '',
        }));

        setErrors(prev => ({
          ...prev,
          shippingZip: message, // 🔴 API MESSAGE
        }));
      }
    };

    // 🔥 Billing ZIP
    if (billing.zip.length === 6) {
      fetchPostalDetails(billing.zip, 'billing');
    } else {
      setErrors(prev => ({ ...prev, billingZip: '' }));
    }

    // 🔥 Shipping ZIP
    if (!sameAsBilling && shipping.zip.length === 6) {
      fetchPostalDetails(shipping.zip, 'shipping');
    } else {
      setErrors(prev => ({ ...prev, shippingZip: '' }));
    }
  }, [billing.zip, shipping.zip, sameAsBilling]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
          style={[styles.input, errors.billingAddress && styles.inputError]}
          placeholder="Address"
          value={billing.address}
          onChangeText={text => handleBillingChange('address', text)}
          placeholderTextColor={'#000'}
        />
        {errors.billingAddress && (
          <Text style={styles.errorText}>{errors.billingAddress}</Text>
        )}
        {/* <TextInput
          style={[styles.input, errors.billingZip && styles.inputError]}
          placeholder="ZIP"
          value={billing.zip}
          onChangeText={text => handleBillingChange('zip', text)}
          placeholderTextColor={'#000'}
        /> */}
        {/* <TextInput
          style={[styles.input, errors.billingZip && styles.inputError]}
          placeholder="ZIP"
          value={billing.zip}
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={text =>
            handleBillingChange('zip', text.replace(/[^0-9]/g, ''))
          }
          placeholderTextColor="#000"
        />

        {errors.billingZip && (
          <Text style={styles.errorText}>{errors.billingZip}</Text>
        )} */}

        {/* <View style={styles.zipRow}> */}
          <TextInput
            style={[
              styles.input,
              styles.zipInput,
              errors.billingZip && styles.inputError,
            ]}
            placeholder="ZIP"
            value={billing.zip}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={text =>
              handleBillingChange('zip', text.replace(/[^0-9]/g, ''))
            }
            placeholderTextColor="#000"
          />

          {zipLoading && billing.zip.length === 6 && (
            <ActivityIndicator size="small" color="#29A9E0" />
          )}
          {/* {errors.billingCity && (
            <Text style={styles.errorText}>{errors.billingCity}</Text>
          )} */}
          {errors.billingZip && (
            <Text style={styles.errorText}>{errors.billingZip}</Text>
          )}
        {/* </View> */}

        <TextInput
          style={[styles.input, errors.billingCity && styles.inputError]}
          placeholder="City"
          value={billing.city}
          onChangeText={text => handleBillingChange('city', text)}
          placeholderTextColor={'#000'}
          editable={false}
        />
        {errors.billingCity && (
          <Text style={styles.errorText}>{errors.billingCity}</Text>
        )}
        <TextInput
          style={[styles.input, errors.billingState && styles.inputError]}
          placeholder="State"
          value={billing.state}
          onChangeText={text => handleBillingChange('state', text)}
          placeholderTextColor={'#000'}
          editable={false}
        />
        {errors.billingState && (
          <Text style={styles.errorText}>{errors.billingState}</Text>
        )}
        {/* Same as Billing */}
        <View style={styles.checkboxRow}>
          {/* <CheckBox value={sameAsBilling} onValueChange={setSameAsBilling} /> */}
          <CheckBox
            value={sameAsBilling}
            onValueChange={setSameAsBilling}
            tintColors={{
              true: '#14AE5C', // checked color
              false: '#999', // unchecked border
            }}
            onCheckColor="#fff" // iOS
            onFillColor="#14AE5C" // iOS
            onTintColor="#14AE5C" // iOS
            boxType="square" // iOS (optional)
            style={{
              transform:
                Platform.OS === 'ios' ? [{ scaleX: 0.9 }, { scaleY: 0.9 }] : [],
            }}
          />
          <Text style={styles.checkboxLabel}>Same as Billing Address</Text>
        </View>
        {/* Shipping */}
        <Text style={styles.heading}>Shipping Address</Text>
        <TextInput
          style={[styles.input, errors.shippingAddress && styles.inputError]}
          placeholder="Address"
          value={shipping.address}
          editable={!sameAsBilling}
          onChangeText={text => handleShippingChange('address', text)}
          placeholderTextColor={'#000'}
        />
        {errors.shippingAddress && (
          <Text style={styles.errorText}>{errors.shippingAddress}</Text>
        )}
        {/* <TextInput
          style={[styles.input, errors.shippingZip && styles.inputError]}
          placeholder="ZIP"
          value={shipping.zip}
          editable={!sameAsBilling}
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={text =>
            handleShippingChange('zip', text.replace(/[^0-9]/g, ''))
          }
          placeholderTextColor="#000"
        />

        {errors.shippingZip && (
          <Text style={styles.errorText}>{errors.shippingZip}</Text>
        )} */}
        <View style={styles.zipRow}>
          <TextInput
            style={[
              styles.input,
              styles.zipInput,
              errors.shippingZip && styles.inputError,
            ]}
            placeholder="ZIP"
            value={shipping.zip}
            editable={!sameAsBilling}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={text =>
              handleShippingChange('zip', text.replace(/[^0-9]/g, ''))
            }
            placeholderTextColor="#000"
          />

          {zipLoading && shipping.zip.length === 6 && !sameAsBilling && (
            <ActivityIndicator size="small" color="#29A9E0" />
          )}
        </View>

        <TextInput
          style={[styles.input, errors.shippingCity && styles.inputError]}
          placeholder="City"
          value={shipping.city}
          editable={false}
          onChangeText={text => handleShippingChange('city', text)}
          placeholderTextColor={'#000'}
        />
        {errors.shippingCity && (
          <Text style={styles.errorText}>{errors.shippingCity}</Text>
        )}

        <TextInput
          style={[styles.input, errors.shippingState && styles.inputError]}
          placeholder="State"
          value={shipping.state}
          editable={false}
          onChangeText={text => handleShippingChange('state', text)}
          placeholderTextColor={'#000'}
        />
        {errors.shippingState && (
          <Text style={styles.errorText}>{errors.shippingState}</Text>
        )}
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
    </View>
  );
};

export default AddNewAddress;

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
  inputError: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.6),
    marginTop: verticalScale(4),
  },
  zipRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  zipInput: {
    flex: 1,
    marginRight: moderateScale(10),
  },
});
