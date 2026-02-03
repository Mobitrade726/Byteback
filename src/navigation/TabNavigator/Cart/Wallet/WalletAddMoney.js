import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../../../utils/utils';
import Header from '../../../../constants/Header';
import { fetchWalletBalance } from '../../../../redux/slices/walletSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WalletAddMoney = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();
  const { balance } = useSelector(state => state.wallet);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wallet transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/wallet/totalhistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.status) {
        setTransactions(response.data.history);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchWalletBalance());
    fetchTransactions();
  }, [dispatch]);

  // ✅ Mapping between method name → transaction_type value
  const transactionTypeMap = {
    upi: '0',
    neft: '1',
    imps: '2',
    rtgs: '3',
    card: '4',
    netbanking: '5',
  };

  const handleAddMoney = async () => {
    if (isProcessing) return; // ❌ Prevent double click

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setIsProcessing(true); // 🔒 Lock button

    try {
      const payload = {
        buyer_id: userId,
        amount: amount,
        transaction_type: transactionTypeMap[selectedMethod], // ✅ numeric value
      };

      // ✅ Create Razorpay order
      const response = await axios.post(
        `${API_BASE_URL}/wallet/create-order`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const order = response.data;

      console.log('order?.razorpay_key============================>', order?.razorpay_key)

      const paymentMethods = {
        upi: selectedMethod === 'upi',
        card: selectedMethod === 'card',
        netbanking: selectedMethod === 'netbanking',
        wallet: false,
        emi: false,
        paylater: false,
      };

      const options = {
        description: 'Add Money to Wallet',
        currency: 'INR',
        key: order?.razorpay_key,
        amount: order.amount,
        name: 'Byteback Wallet',
        order_id: order.order_id,
        theme: { color: '#14AE5C' },
        method: paymentMethods,
      };

      // ✅ NEFT / IMPS / RTGS handled manually (offline)
      if (['neft', 'imps', 'rtgs'].includes(selectedMethod)) {
        setIsProcessing(false);
        Alert.alert(
          `${selectedMethod.toUpperCase()} Selected`,
          'Please complete this transfer using your bank app or contact support.',
        );
        return;
      }
      setIsProcessing(false);
      // ✅ Launch Razorpay checkout
      RazorpayCheckout.open(options)
        .then(async data => {
          setIsProcessing(true);
          // SUCCESS
          const verifyResponse = await axios.post(
            `${API_BASE_URL}/wallet/verify`,
            {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
              amount: amount,
              transaction_type: transactionTypeMap[selectedMethod],
              buyer_id: userId,
            },
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          Toast.show({
            type: 'success',
            text2: verifyResponse.data.message,
          });
          setAmount('');
          // ✅ REFRESH BOTH
          dispatch(fetchWalletBalance());
          await fetchTransactions(); // 🔥 THIS WAS MISSING
          setIsProcessing(false); // 🔓 Unlock
        })
        .catch(async err => {
          Toast.show({
            type: 'error',
            text2:
              err.description?.error ||
              'Wallet payment failed. Please try again',
          });
          // 🔥 ADD THIS: Cancel notify API
          try {
            await axios.post(
              `${API_BASE_URL}/wallet/cancel-order`,
              {
                order_id: order.order_id, // Razorpay ka order_id
              },
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            );
          } catch (cancelErr) {
            console.log('cancelErr---------------------------->', cancelErr?.response?.data);
          }
          setIsProcessing(false);
        });
    } catch (error) {
      setIsProcessing(false);
      console.log('error---------------------------->', error?.response?.data);
      Alert.alert('Error', 'Something went wrong! Please try again.');
    }
  };

  const renderTransaction = ({ item }) => {
    let icon = 'cash-multiple';
    let iconColor = '#000';
    let checkmarkIcon = 'checkmark-circle-outline';
    let checkmarkColor = '#1C9C48'; // default green
    let displayAmount = Number(item.amount || 0).toLocaleString();

    switch (item.status_text) {
      case 'Money Added':
        icon = 'cash-plus';
        iconColor = '#1C9C48';
        checkmarkIcon = 'checkmark-circle-outline';
        checkmarkColor = '#1C9C48';
        displayAmount = `+ ₹ ${displayAmount}`;
        break;
      case 'Verification Pending':
        icon = 'timer-sand';
        iconColor = '#F6C344';
        checkmarkIcon = 'time-outline';
        checkmarkColor = '#F6C344';
        displayAmount = `₹ ${displayAmount}`;
        break;
      case 'Rejected':
        icon = 'close-octagon-outline';
        iconColor = '#CB444B';
        checkmarkIcon = 'close-circle-outline';
        checkmarkColor = '#CB444B';
        displayAmount = `₹ ${displayAmount}`;
        break;
      default:
        // fallback for credit/debit or unknown status
        icon = item.transaction_type === '1' ? 'cash-plus' : 'cash-minus';
        iconColor = item.transaction_type === '1' ? '#1C9C48' : '#CB444B';
        checkmarkIcon =
          item.transaction_type === '1'
            ? 'checkmark-circle-outline'
            : 'close-circle-outline';
        checkmarkColor = iconColor;
        displayAmount =
          item.transaction_type === '1'
            ? `+ ₹ ${displayAmount}`
            : `- ₹ ${displayAmount}`;
        break;
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={icon}
          size={moderateScale(18)}
          color={iconColor}
          style={styles.transactionIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.amount, { color: iconColor }]}>
            {displayAmount}
          </Text>
          <Text style={styles.label}>{item.status_text || '--'}</Text>
          <Text style={styles.date}>
            {item.payment_date}{' '}
            {item.payment_time ? `, ${item.payment_time}` : ''}
          </Text>
        </View>
        <Ionicons
          name={checkmarkIcon}
          size={moderateScale(18)}
          color={checkmarkColor}
        />
        {/* <View style={styles.dividerspecification} /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Wallet : Add Money" navigation={navigation} showBack />

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              {loading ? (
                <ActivityIndicator color="#14AE5C" />
              ) : (
                <Text style={styles.balanceValue}>₹{balance}</Text>
              )}
            </View>
            <Text style={styles.subHeader}>Enter Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="XXXXXXXXX"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View
              style={{
                backgroundColor: '#F5F5F5',
                padding: responsive.padding(10),
                marginBottom: responsive.marginBottom(5),
              }}
            >
              <Text style={styles.subHeaderWallet}>Topup Wallet</Text>
            </View>
            <View style={styles.methodContainer}>
              {['upi', 'rtgs', 'card'].map(method => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.methodButton,
                    selectedMethod === method && styles.methodButtonActive,
                  ]}
                  onPress={() => setSelectedMethod(method)}
                >
                  <Text
                    style={[
                      styles.methodText,
                      selectedMethod === method && styles.methodTextActive,
                    ]}
                  >
                    {method.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={handleAddMoney}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.payButtonText}>Add Money</Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#EAE6E5',
                padding: responsive.padding(10),
              }}
            >
              <Text style={styles.historyTitle}>
                History{' '}
                <Text style={styles.historyText}>(Showing only Add Money)</Text>
              </Text>
            </View>
          </>
        }
        // 👇 EMPTY HISTORY
        ListEmptyComponent={
          !loading && (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Ionicons
                name="wallet-outline"
                size={moderateScale(50)}
                color="#bbb"
              />
              <Text style={{ color: '#888', marginTop: moderateScale(10) }}>
                No transactions found
              </Text>
            </View>
          )
        }
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#1A9E41"
          style={{ marginTop: moderateScale(20) }}
        />
      )}

      <Toast />
    </View>
  );
};

export default WalletAddMoney;

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';
import responsive from '../../../../constants/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: RF(2.8),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: verticalScale(10),
  },
  balanceContainer: {
    backgroundColor: '#FBFEFC',
    borderRadius: scale(12),
    padding: scale(15),
    marginHorizontal: responsive.marginHorizontal(10),
    marginVertical: responsive.marginVertical(5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  balanceLabel: {
    fontSize: responsive.fontSize(16),
    color: '#888',
  },
  balanceValue: {
    fontSize: responsive.fontSize(25),
    fontWeight: 'bold',
    color: '#1A1A2D',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    marginHorizontal: responsive.marginHorizontal(10),
    marginVertical: responsive.marginVertical(5),
    padding: responsive.padding(12),
    fontSize: responsive.fontSize(16),
    marginBottom: verticalScale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  subHeader: {
    fontSize: responsive.fontSize(20),
    fontWeight: '600',
    color: '#333',
    marginHorizontal: responsive.marginHorizontal(10),
    marginVertical: responsive.marginVertical(5),
  },
  subHeaderWallet: {
    fontSize: responsive.fontSize(20),
    fontWeight: '600',
    color: '#333',
  },
  methodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: responsive.padding(10),
    marginBottom: responsive.marginBottom(5),
  },
  methodButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(25),
    margin: scale(5),
    backgroundColor: '#fff',
  },
  methodButtonActive: {
    backgroundColor: '#14AE5C',
    borderColor: '#14AE5C',
  },
  methodText: {
    color: '#333',
    fontWeight: '500',
    fontSize: RF(1.8),
  },
  methodTextActive: {
    color: '#fff',
    fontSize: RF(1.8),
  },
  payButton: {
    backgroundColor: '#14AE5C',
    borderRadius: scale(10),
    alignItems: 'center',
    padding: responsive.padding(10),
    marginHorizontal: responsive.marginHorizontal(10),
    marginTop: responsive.marginTop(20),
    marginBottom: responsive.marginTop(20),
  },
  payButtonText: {
    color: '#fff',
    fontSize: responsive.fontSize(17),
    fontWeight: 'bold',
  },
  recentTitle: {
    textAlign: 'center',
    fontSize: RF(1.8),
    color: '#111',
    marginVertical: verticalScale(8),
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(15),
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 0.3,
  },
  transactionIcon: {
    marginRight: scale(12),
  },
  amount: {
    fontSize: responsive.fontSize(20),
    fontWeight: 'bold',
  },
  label: {
    fontSize: responsive.fontSize(17),
    color: '#000',
  },
  date: {
    fontSize: responsive.fontSize(15),
    color: 'gray',
  },
  separator: {
    backgroundColor: '#eee',
    height: verticalScale(1),
    marginHorizontal: scale(15),
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
    elevation: 3,
    marginVertical: verticalScale(10),
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },

  historyStatusSuccess: {
    color: 'green',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
  historyStatusPending: {
    color: '#F6C344',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
  historyStatusFailed: {
    color: '#CB444B',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
  historyTitle: {
    fontSize: responsive.fontSize(16),
  },
  historyText: {
    color: '#333',
    fontSize: responsive.fontSize(10),
  },
  dividerspecification: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
});
