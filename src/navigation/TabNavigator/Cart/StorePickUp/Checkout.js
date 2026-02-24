// CheckoutScreen.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../../constants/Header'; // adjust path if needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkoutAPI,
  fetchCartAPI,
  checkoutDetailsAPI,
  clearCart,
  clearCartAPI,
} from '../../../../redux/slices/cartSlice';
import { fetchBuyerAddress } from '../../../../redux/slices/buyerAddressSlice';
import { fetchWalletBalance } from '../../../../redux/slices/walletSlice';
import { API_BASE_URL } from '../../../../utils/utils';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import responsive from '../../../../constants/responsive';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // redux state
  const {
    checkoutData,
    checkoutDetailsData,
    items: cartItems,
    loading,
  } = useSelector(state => state.cart);
  const { addresses } = useSelector(state => state.buyerAddress);
  const { balance } = useSelector(state => state.wallet); // wallet balance

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  // local states
  const [deliveryMode, setDeliveryMode] = useState('home'); // 'home' or 'pickup'
  const [selectedStore, setSelectedStore] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'online' | 'wallet'
  const [submitting, setSubmitting] = useState(false);

  // placeholder store data (replace with real API/store)
  const storeData = [
    {
      id: 1,
      name: 'Byteback Store - A',
      status: 'Open',
      distance: '5 km',
      address: '123 Market Rd, City',
    },
    {
      id: 2,
      name: 'Byteback Store - B',
      status: 'Open',
      distance: '10 km',
      address: '456 Mall St, City',
    },
  ];

  const hasFetchedCheckoutDetails = useRef(false);

  // FIRST: initial fetch
  useEffect(() => {
    dispatch(fetchWalletBalance());
    dispatch(checkoutAPI());
    dispatch(fetchCartAPI());
    dispatch(fetchBuyerAddress());
  }, [dispatch]);

  // SECOND: checkoutDetails API trigger
  useEffect(() => {
    if (checkoutData?.id && !hasFetchedCheckoutDetails.current) {
      hasFetchedCheckoutDetails.current = true;
      dispatch(checkoutDetailsAPI(checkoutData.id));
    }
  }, [checkoutData]);

  // helper strings for addresses
  const billingAddress = addresses?.length
    ? `${addresses[0].billing_Address}, ${addresses[0].billing_City}, ${addresses[0].billing_State} - ${addresses[0].billing_Zip}`
    : '';
  const shippingAddress = addresses?.length
    ? `${addresses[0].shipping_Address}, ${addresses[0].shipping_City}, ${addresses[0].shipping_State} - ${addresses[0].shipping_Zip}`
    : '';
  const deliveryAddressId = addresses?.[0]?.user_address_id || null;

  // Utility: safely parse number
  const toNumber = v => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  };

  // map payment option to API value (pass deliveryMode to disambiguate)
  const getPaymentOptionValue = (method, mode) => {
    // mode: 'home' -> Home Delivery, 'pickup' -> store pickup
    if (mode === 'home') {
      switch (method) {
        case 'cod':
          return '0';
        case 'online':
          return '1';
        case 'wallet':
          return '2';
        default:
          return '1';
      }
    } else {
      // store pickup
      switch (method) {
        case 'cod': // 'cod' in pickup context could mean 'pay at store'
          return '0';
        case 'online':
          return '1';
        case 'wallet':
          return '2';
        default:
          return '0';
      }
    }
  };

  const route = useRoute();
  const { product_barcode_id_id, product_barcode_price_p } = route.params || {};

  const handlePlaceOrder = useCallback(async () => {
    setSubmitting(true);
    try {
      // 1️⃣ Detect cart order vs direct order
      const isCartOrder = cartItems && cartItems.length > 0;

      // 2️⃣ Barcode IDs logic
      const barcode_ids = isCartOrder
        ? cartItems.map(i => ({
            barcode_id: i.barcode_id,
            barcode_price: i.price,
          }))
        : [
            {
              barcode_id: product_barcode_id_id,
              barcode_price: product_barcode_price_p,
            },
          ];
      const getTotalAmountFromServer = () =>
        toNumber(checkoutDetailsData?.total_amount);

      // determine numeric total from server (fallback to sum of items)
      const serverTotal = getTotalAmountFromServer();
      const computedTotal =
        serverTotal > 0
          ? serverTotal
          : barcode_ids.reduce((s, it) => s + toNumber(it.barcode_price), 0);
      // === WALLET CHECK: prevent order creation if wallet < required ===
      if (paymentMethod === 'wallet') {
        const walletBalance = toNumber(balance);
        const finalAmountToPay = computedTotal; // assuming server total is final
        if (walletBalance < finalAmountToPay) {
          Alert.alert(
            'Insufficient Wallet Balance',
            `Your wallet balance (₹${walletBalance}) is not enough to pay ₹${finalAmountToPay}. Please add money or choose another payment method.`,
          );
          setSubmitting(false);
          navigation.navigate('WalletAddMoney'); // or stay depending on UX
          return;
        }
        // else proceed — wallet enough
      }

      // Build order create payload
      const paymentOption = getPaymentOptionValue(paymentMethod, deliveryMode);
      const deliveryModeValue = deliveryMode === 'home' ? '1' : '0';

      const createPayload = {
        user_id: checkoutData?.user_id || userId,
        payment_mode: paymentOption,
        delivery_type: deliveryModeValue,
        delivery_address_id: deliveryAddressId,
        checkout_id: checkoutData?.id,
        barcode_ids: barcode_ids,
      };

      // Create order on backend
      const createOrderRes = await axios.post(
        `${API_BASE_URL}/orders/create`,
        createPayload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const createData = createOrderRes?.data;
      const orderBackend = createData?.data || {};
      const razorpayOrderId = orderBackend?.razorpay_order_id;
      const totalAmount = toNumber(orderBackend?.total_amount || computedTotal);
      const orderId = orderBackend?.order_id;

      // CASE A: Cash on Delivery / Pay at Store (no razorpay)
      if (paymentMethod === 'cod') {
        Toast.show({
          type: 'success',
          text2:
            deliveryMode === 'home'
              ? 'Order placed successfully with Cash on Delivery!'
              : 'Order placed successfully. Pay at store when you pick up.',
        });

        setSubmitting(false);
        navigation.navigate('ProcessToPay', { order_id: orderId });
        dispatch(clearCartAPI());
        dispatch(clearCart());
        return;
      }

      // CASE B: Wallet payment (we already ensured balance is enough)
      if (paymentMethod === 'wallet') {
        // Option A: backend already created & debited wallet on create
        // Show success based on backend response
        if (createData?.status === true || createData?.success) {
          Toast.show({
            type: 'success',
            text2: createData?.message || 'Payment successful via wallet.',
          });
          setSubmitting(false);
          navigation.navigate('ProcessToPay', { order_id: orderId });
          dispatch(clearCartAPI());
          dispatch(clearCart());
          return;
        } else {
          // Backend might handle wallet verification via separate endpoint
          // For safety, show message
          Toast.show({
            type: 'error',
            text2:
              createData?.message ||
              'Wallet payment failed. Please try again or contact support.',
          });
          setSubmitting(false);
          return;
        }
      }

      // CASE C: Online payment via Razorpay
      if (paymentMethod === 'online') {
        // Ensure we have a razorpay order id
        if (!razorpayOrderId) {
          Toast.show({
            type: 'error',
            text2: 'Payment cannot be processed right now. Try again later.',
          });
          setSubmitting(false);
          return;
        }

        const options = {
          description: 'Payment for Order',
          image: 'https://i.postimg.cc/3x3QzSGq/logo.png',
          currency: 'INR',
          // key: 'rzp_test_RLLrUG1OvG4YYd',  // testing key
          key: 'rzp_live_RBA9jadId2klBP',     // live key
          amount: Math.round(totalAmount * 100), // in paise
          name: 'Byteback',
          order_id: razorpayOrderId,
          prefill: {
            email: checkoutData?.user_email || '',
            contact: checkoutData?.user_mobile || '',
            name: checkoutData?.user_name || '',
          },
          theme: { color: '#1C9C48' },
        };

        RazorpayCheckout.open(options)
          .then(async data => {
            // data contains razorpay_payment_id, razorpay_order_id, razorpay_signature
            const paymentStatus =
              data?.razorpay_payment_id && data?.razorpay_signature
                ? 'success'
                : 'failed';

            try {
              const verifyResponse = await axios.post(
                `${API_BASE_URL}/orders/verify-payment`,
                {
                  razorpay_payment_id: data?.razorpay_payment_id || null,
                  razorpay_order_id: data?.razorpay_order_id || razorpayOrderId,
                  razorpay_signature: data?.razorpay_signature || null,
                  order_id: orderId,
                  status: paymentStatus,
                  user_id: userId,
                  checkout_id: checkoutData?.id,
                  delivery_type: deliveryModeValue,
                  barcode_ids: barcode_ids,
                  payment_mode: paymentOption,
                  delivery_address_id: deliveryAddressId,
                },
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              const verifyData = verifyResponse?.data;
              const verify_order_id = verifyData?.data?.wallet?.order_id;
              if (verifyData?.status === true || verifyData?.success) {
                Toast.show({
                  type: 'success',
                  text2:
                    verifyData?.message || 'Payment verified successfully.',
                });
                setSubmitting(false);
                navigation.navigate('ProcessToPay', {
                  order_id: verify_order_id,
                });
                dispatch(clearCartAPI());
                dispatch(clearCart());
              } else {
                Toast.show({
                  type: 'error',
                  text2:
                    verifyData?.message ||
                    'Payment verification failed on server.',
                });
                setSubmitting(false);
              }
            } catch (err) {
              Toast.show({
                type: 'error',
                text2:
                  err?.response?.data?.message || 'Server verification failed.',
              });
              setSubmitting(false);
            }
          })
          .catch(err => {
            Toast.show({
              type: 'error',
              text2: 'Payment cancelled or failed.',
            });
            setSubmitting(false);
          });

        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || error.message,
      });
      setSubmitting(false);
    }
  }, [
    balance,
    cartItems,
    checkoutData,
    checkoutDetailsData,
    deliveryAddressId,
    deliveryMode,
    dispatch,
    navigation,
    paymentMethod,
    checkoutData?.user_id,
  ]);

  return (
    <View style={styles.container}>
      <Header title="Checkout" navigation={navigation} showSearch showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.Scrollcontainer}
      >
        {/* Delivery Options */}
        <Text style={styles.sectionTitle}>Delivery Options</Text>
        <TouchableOpacity
          style={[
            styles.radioBox,
            deliveryMode === 'home' && styles.selectedBox,
          ]}
          onPress={() => setDeliveryMode('home')}
        >
          <Ionicons
            name={
              deliveryMode === 'home' ? 'radio-button-on' : 'radio-button-off'
            }
            size={moderateScale(12)}
            color="#00A859"
          />
          <Text style={styles.optionText}>Home Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioBox,
            deliveryMode === 'pickup' && styles.selectedBox,
          ]}
          onPress={() => setDeliveryMode('pickup')}
        >
          <Ionicons
            name={
              deliveryMode === 'pickup' ? 'radio-button-on' : 'radio-button-off'
            }
            size={moderateScale(12)}
            color="#00A859"
          />
          <Text style={styles.optionText}>Store Pickup</Text>
        </TouchableOpacity>

        {/* Pickup Locations */}
        {deliveryMode === 'pickup' && (
          <>
            {/* <View style={styles.containerImage}>
              <View style={styles.textContainerImage}>
                <Text style={styles.titleImage}>
                  Available Pickup Locations
                </Text>
                <Text style={styles.subtitleImage}>
                  This item is currently available in {storeData.length}{' '}
                  locations near you.
                </Text>
              </View>
              <Image
                source={{
                  uri: 'https://i.postimg.cc/JnmLKcrv/Depth-4-Frame-1-10.png',
                }}
                style={styles.imageImage}
                resizeMode="contain"
              />
            </View> */}

            {selectedStore === 1 ? (
              <View style={styles.containerMoreKm}>
                <Image
                  source={require('../../../../../assets/images/question.png')}
                  style={styles.iconKM}
                />
                <View style={styles.textContainerKM}>
                  <Text style={styles.boldTextKM}>
                    Nearest Pickup location is more than away.
                  </Text>
                  <Text style={styles.subTextKM}>
                    Change location or choose{' '}
                    <Text
                      onPress={() => setDeliveryMode('home')}
                      style={styles.linkTextKM}
                    >
                      Home Delivery
                    </Text>
                  </Text>
                </View>
              </View>
            ) : (
              <>
                {storeData.map(store => (
                  <TouchableOpacity
                    key={store.id}
                    style={styles.storeItem}
                    onPress={() => setSelectedStore(store.id)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.storeName}>{store.name}</Text>
                      <Text style={styles.storeStatus}>{store.status}</Text>
                      <Text style={styles.storeDistance}>{store.distance}</Text>
                      <Text style={styles.storeAddress}>{store.address}</Text>
                    </View>
                    <Ionicons
                      name={
                        selectedStore === store.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={22}
                      color="#1A9E41"
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        )}

        {/* Address & Instructions */}
        <View
          onPress={() => navigation.navigate('SelectAddress')}
          style={styles.infoBox}
        >
          <View style={{ borderWidth: 1, padding: 5, borderRadius: 50 }}>
            <Ionicons name="location-outline" size={moderateScale(15)} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>
              {deliveryMode === 'home' ? 'Deliver to' : 'Billing Address'}
            </Text>
            <Text style={[styles.infoValue]}>
              {deliveryMode === 'home'
                ? shippingAddress || 'No address set'
                : billingAddress || 'No billing address'}
            </Text>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')}>
              <Ionicons name="chevron-forward" size={moderateScale(20)} />
            </TouchableOpacity> */}
        </View>

        {/* Payment Option */}
        <Text style={styles.sectionTitle}>Select Payment Option</Text>
        <View style={styles.optionGroup}>
          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'cod' && styles.selectedPayBox,
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Ionicons
              name={
                paymentMethod === 'cod' ? 'radio-button-on' : 'radio-button-off'
              }
              size={moderateScale(12)}
              color="#1A9E41"
            />
            <Text style={styles.optionText}>
              {deliveryMode === 'home' ? 'Cash on Delivery' : 'Pay at Store'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'online' && styles.selectedBox,
            ]}
            onPress={() => setPaymentMethod('online')}
          >
            <Ionicons
              name={
                paymentMethod === 'online'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={moderateScale(12)}
              color="#000"
            />
            <Text style={styles.optionText}>Pay Online</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioBox,
              paymentMethod === 'wallet' && styles.selectedBox,
            ]}
            onPress={() => setPaymentMethod('wallet')}
          >
            <Ionicons
              name={
                paymentMethod === 'wallet'
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={moderateScale(12)}
              color="#000"
            />
            <Text style={styles.optionText}>
              Pay via Wallet (₹{toNumber(balance)})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.bold}>
              ₹
              {Number(checkoutDetailsData?.subtotal || 0)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.summaryText}>GST</Text>
            {/* <Text style={styles.bold}>₹{}</Text> */}
            <Text style={styles.bold}>
              ₹
              {(Number(checkoutDetailsData?.igst_amount) > 0
                ? Number(checkoutDetailsData?.igst_amount)
                : Number(checkoutDetailsData?.cgst_amount || 0) +
                  Number(checkoutDetailsData?.sgst_amount || 0)
              )
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.summaryText}>Total</Text>
            <Text style={styles.bold}>
              ₹
              {Number(checkoutDetailsData?.total_amount || 0)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={[styles.placeOrderBtn, submitting && { opacity: 0.7 }]}
          disabled={loading || submitting}
        >
          {loading || submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>
              {deliveryMode === 'pickup' && paymentMethod === 'cod'
                ? 'Confirm Pickup'
                : paymentMethod === 'online'
                ? 'Pay'
                : paymentMethod === 'wallet'
                ? 'Pay with Wallet'
                : 'Place Order'}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By placing the order, you agree to our Terms & Return Policy.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  Scrollcontainer: { flex: 1, marginHorizontal: scale(10) },

  sectionTitle: {
    fontSize: responsive.fontSize(18), // approx 16px
    fontWeight: 'bold',
    marginVertical: responsive.marginVertical(15),
  },

  radioBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.padding(12),
    marginVertical: responsive.marginVertical(5),
  },
  selectedBox: { borderColor: '#1C9C48' },
  selectedPayBox: { borderColor: '#1C9C48', backgroundColor: '#CFE8D9' },

  optionText: {
    fontSize: responsive.fontSize(14), // approx 14px
    fontWeight: '500',
    marginLeft: scale(8),
  },

  containerImage: {
    backgroundColor: '#FDFDFD',
    borderRadius: moderateScale(10),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginVertical: verticalScale(5),
  },
  textContainerImage: { flex: 1, paddingRight: scale(10) },
  titleImage: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#111',
  },
  subtitleImage: {
    fontSize: responsiveFontSize(1.8),
    color: '#4B9B8F',
    marginTop: verticalScale(4),
    lineHeight: verticalScale(20),
  },
  imageImage: {
    width: scale(100),
    height: verticalScale(80),
    borderRadius: moderateScale(10),
  },

  containerMoreKm: { flexDirection: 'row', alignItems: 'flex-start', marginTop: responsive.marginTop(10) },
  iconKM: {
    width: scale(20),
    height: verticalScale(20),
    marginRight: scale(8),
    marginTop: verticalScale(5),
  },
  textContainerKM: { flex: 1, marginBottom: verticalScale(15) },
  boldTextKM: {
    fontWeight: 'bold',
    fontSize: responsive.fontSize(12),
    color: '#000',
  },
  subTextKM: {
    fontSize: responsive.fontSize(12),
    color: '#555',
    marginTop: verticalScale(4),
  },
  linkTextKM: {
    textDecorationLine: 'underline',
    color: '#000',
    fontSize: responsive.fontSize(12),
  },

  storeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
  },
  storeName: { fontWeight: '600', fontSize: responsiveFontSize(1.8) },
  storeStatus: {
    color: '#1C9C48',
    fontSize: responsiveFontSize(1.6),
    marginTop: verticalScale(2),
  },
  storeDistance: { fontSize: responsiveFontSize(1.5), color: '#555' },
  storeAddress: { fontSize: responsiveFontSize(1.5), color: '#777' },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.padding(12),
    borderWidth: moderateScale(1),
    borderColor: '#000',
    backgroundColor: '#FFFBFA',
    borderRadius: responsive.borderRadius(12),
    gap: moderateScale(8),  marginTop: responsive.marginTop(3)
  },
  infoTitle: {  fontSize: responsive.fontSize(14) },
  infoValue: { fontSize: responsive.fontSize(12), color: '#444', fontWeight:'bold' },

  priceSummary: {
    borderColor: '#eee',
    marginTop: verticalScale(0),
    paddingBottom: verticalScale(10),
  },
  summaryText: {
    fontSize: responsive.fontSize(14), fontWeight:'500', color:"#333333"
  },
  priceRow: {
    fontSize: responsiveFontSize(1.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(6),
  },
  bold: { fontSize: responsive.fontSize(14), color:"#666666" },

  placeOrderBtn: {
    backgroundColor: '#1C9C48',
    padding: responsive.padding(12),
    borderRadius: responsive.borderRadius(12),
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  placeOrderText: {
    color: '#FFFBFA',
    fontWeight: 'bold',
    fontSize: responsive.fontSize(16),
  },
  termsText: {
    fontSize: responsive.fontSize(12),
    color: '#666666',
    textAlign: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(40),
  },
});
