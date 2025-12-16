import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        Alert.alert(
          `${selectedMethod.toUpperCase()} Selected`,
          'Please complete this transfer using your bank app or contact support.',
        );
        return;
      }
      // ✅ Launch Razorpay checkout
      RazorpayCheckout.open(options)
        .then(async data => {
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
          dispatch(fetchWalletBalance());
          setIsProcessing(false); // 🔓 Unlock
        })
        // .catch(err => {
        //   Alert.alert(
        //     'Payment Failed',
        //     err.description || 'Transaction cancelled.',
        //   );
        //   setIsProcessing(false); // 🔓 Unlock even if Razorpay closed
        // });
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
          } catch (cancelErr) {}

          setIsProcessing(false);
        });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong! Please try again.');
    }
  };

  const renderTransaction = ({ item }) => {
    let icon = 'cash-multiple';
    let iconColor = '#000';
    let checkmarkIcon = 'checkmark-circle-outline';
    let checkmarkColor = '#10B981'; // default green
    let displayAmount = Number(item.amount || 0).toLocaleString();

    switch (item.status_text) {
      case 'Money Added':
        icon = 'cash-plus';
        iconColor = '#10B981';
        checkmarkIcon = 'checkmark-circle-outline';
        checkmarkColor = '#10B981';
        displayAmount = `+ ₹ ${displayAmount}`;
        break;
      case 'Verification Pending':
        icon = 'timer-sand';
        iconColor = '#FBBF24';
        checkmarkIcon = 'time-outline';
        checkmarkColor = '#FBBF24';
        displayAmount = `₹ ${displayAmount}`;
        break;
      case 'Rejected':
        icon = 'close-octagon-outline';
        iconColor = '#EF4444';
        checkmarkIcon = 'close-circle-outline';
        checkmarkColor = '#EF4444';
        displayAmount = `₹ ${displayAmount}`;
        break;
      default:
        // fallback for credit/debit or unknown status
        icon = item.transaction_type === '1' ? 'cash-plus' : 'cash-minus';
        iconColor = item.transaction_type === '1' ? '#10B981' : '#EF4444';
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
          size={24}
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
          size={moderateScale(22)}
          color={checkmarkColor}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wallet : Add Money"
        navigation={navigation}
        showBack={true}
      />
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          {loading ? (
            <ActivityIndicator color="#14AE5C" />
          ) : (
            <Text style={styles.balanceValue}>₹{balance}</Text>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.subHeader}>Select Payment Method</Text>
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
          disabled={isProcessing} // ❌ disable double press
        >
          <Text style={styles.payButtonText}>Add Money</Text>
        </TouchableOpacity>

        <View style={styles.historyCard}>
          <Text style={{ fontSize: moderateScale(12) }}>
            History
            <Text style={{ fontSize: moderateScale(12) }}>
              (Showing only Add Money)
            </Text>
          </Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#1A9E41"
              style={{ marginTop: moderateScale(40) }}
            />
          ) : transactions.length === 0 ? (
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
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              showsVerticalScrollIndicator={false}
              keyExtractor={item =>
                item.id?.toString() || Math.random().toString()
              }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default WalletAddMoney;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#FBFEFC'},
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#000',
//     marginVertical: 10,
//   },
//   balanceContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 2,
//   },
//   balanceLabel: {fontSize: 16, color: '#888'},
//   balanceValue: {fontSize: 28, fontWeight: 'bold', color: '#14AE5C'},
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     fontSize: 16,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   subHeader: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   methodContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   methodButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     margin: 5,
//     backgroundColor: '#fff',
//   },
//   methodButtonActive: {
//     backgroundColor: '#14AE5C',
//     borderColor: '#14AE5C',
//   },
//   methodText: {color: '#333', fontWeight: '500'},
//   methodTextActive: {color: '#fff'},
//   payButton: {
//     backgroundColor: '#14AE5C',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   payButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
//   recentTitle: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#111',
//     marginVertical: 8,
//   },
//   transactionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//   },
//   transactionIcon: {
//     marginRight: 12,
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 14,
//     color: '#000',
//   },
//   date: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   separator: {
//     // height: 1,
//     backgroundColor: '#eee',
//   },
//   historyCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     elevation: 3,
//     marginVertical: 10,
//   },
//   historyRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   historyText: {color: '#333', fontSize: 15},
//   historyStatusSuccess: {color: 'green', fontWeight: '600'},
//   historyStatusPending: {color: '#f39c12', fontWeight: '600'},
//   historyStatusFailed: {color: '#e74c3c', fontWeight: '600'},

// });

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFEFC',
  },
  header: {
    fontSize: RF(2.8),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: verticalScale(10),
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(15),
    alignItems: 'center',
    marginBottom: verticalScale(20),
    elevation: 2,
  },
  balanceLabel: {
    fontSize: RF(2),
    color: '#888',
  },
  balanceValue: {
    fontSize: RF(4),
    fontWeight: 'bold',
    color: '#14AE5C',
    marginVertical: verticalScale(8),
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(15),
    fontSize: RF(2),
    marginBottom: verticalScale(20),
    elevation: 2,
  },
  subHeader: {
    fontSize: RF(2.2),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  methodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
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
    paddingVertical: verticalScale(15),
    borderRadius: scale(10),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  payButtonText: {
    color: '#fff',
    fontSize: RF(2),
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
  },
  transactionIcon: {
    marginRight: scale(12),
  },
  amount: {
    fontSize: RF(2),
    fontWeight: 'bold',
  },
  label: {
    fontSize: RF(1.8),
    color: '#000',
  },
  date: {
    fontSize: RF(1.6),
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
  historyText: {
    color: '#333',
    fontSize: RF(1.8),
  },
  historyStatusSuccess: {
    color: 'green',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
  historyStatusPending: {
    color: '#f39c12',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
  historyStatusFailed: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: RF(1.8),
  },
});
