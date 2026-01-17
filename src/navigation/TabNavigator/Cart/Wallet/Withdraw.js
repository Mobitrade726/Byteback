import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../../constants/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../../../utils/utils';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';

export default function WithdrawScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [acholdername, setAcholdername] = useState('');
  const [accountno, setAccountno] = useState('');
  const [ifsccode, setIfsccode] = useState('');
  const [remark, setRemark] = useState('');
  const [transactionType, setTransactionType] = useState('0');
  const [upi, setUPI] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [refundHistory, setRefundHistory] = useState([]);
  const { balance } = useSelector(state => state.wallet);

  const transactionOptions = [
    { label: 'UPI', value: '0' },
    { label: 'NEFT', value: '1' },
    { label: 'IMPS', value: '2' },
  ];

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const fetchRefundHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/refundhistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.status === true) {
        setRefundHistory(response.data?.refund_history || []);
      } else {
        setRefundHistory([]);
      }
    } catch (error) {
      setRefundHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchRefundHistory();
  }, []);

  const handleWithdraw = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter withdrawal amount');
      return;
    }

    // ⭐ WALLET BALANCE CHECK
    if (Number(balance) === 0) {
      Alert.alert('Insufficient Balance', `Your wallet balance is ₹${balance}`);
      return;
    }

    if (Number(amount) > Number(balance)) {
      Alert.alert(
        'Insufficient Balance',
        `You only have ₹${balance}. Please enter a smaller amount.`,
      );
      return;
    }

    if (transactionType === '0' && !upi) {
      Alert.alert('Error', 'Please enter UPI ID');
      return;
    }

    if (transactionType !== '0' && (!acholdername || !accountno || !ifsccode)) {
      Alert.alert('Error', 'Please fill all account details');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        vendor_sales_id: userId,
        refund_type: transactionType,
        refund_amount: amount,
        refund_remarks: remark,
        refund_account_name: acholdername,
        ...(transactionType === '0'
          ? { refund_upi_id: upi }
          : { refund_account_no: accountno, refund_ifsc_code: ifsccode }),
      };

      const response = await axios.post(
        `${API_BASE_URL}/refund/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data?.status === true) {
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Withdrawal Request Submitted',
        });
        setAmount('');
        setUPI('');
        setAcholdername('');
        setAccountno('');
        setIfsccode('');
        setRemark('');
        fetchRefundHistory();
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to submit withdrawal',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }) => {
    let icon = 'cash-multiple';
    let iconColor = '#000';
    let checkmarkIcon = 'checkmark-circle-outline';
    let checkmarkColor = '#10B981';
    let displayAmount = Number(item.amount || 0).toLocaleString();

    switch (item.payment_status_text) {
      case 'Withdraw Verified':
        icon = 'cash-plus';
        iconColor = '#10B981';
        checkmarkIcon = 'checkmark-circle-outline';
        checkmarkColor = '#10B981';
        displayAmount = `+ ₹ ${displayAmount}`;
        break;
      case 'Withdraw Pending':
        icon = 'timer-sand';
        iconColor = '#FBBF24';
        checkmarkIcon = 'time-outline';
        checkmarkColor = '#FBBF24';
        displayAmount = `₹ ${displayAmount}`;
        break;
      case 'Withdraw Rejected':
        icon = 'close-octagon-outline';
        iconColor = '#EF4444';
        checkmarkIcon = 'close-circle-outline';
        checkmarkColor = '#EF4444';
        displayAmount = `₹ ${displayAmount}`;
        break;
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={icon}
          size={rf(3)}
          color={iconColor}
          style={styles.transactionIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.amount, { color: iconColor }]}>
            {displayAmount}
          </Text>
          <Text style={styles.label}>{item.payment_status_text || '--'}</Text>
          <Text style={styles.date}>{item.payment_date}</Text>
          <Text style={styles.date}>{item.payment_remarks}</Text>
        </View>
        <Ionicons name={checkmarkIcon} size={rf(3)} color={checkmarkColor} />
      </View>
    );
  };

  return (
    // <View style={styles.safeArea}>
    //   <ScrollView contentContainerStyle={styles.container}>
    //     <Header title="Withdraw" navigation={navigation} showBack={true} />

    //     {/* Withdrawal Form */}
    //     <View style={styles.card}>
    //       <Text style={styles.sectionTitle}>Account Details</Text>
    //       <Dropdown
    //         style={styles.dropdown}
    //         placeholderStyle={styles.placeholderStyle}
    //         selectedTextStyle={styles.selectedTextStyle}
    //         data={transactionOptions}
    //         labelField="label"
    //         valueField="value"
    //         placeholder="Select Transaction Type"
    //         value={transactionType}
    //         onChange={item => setTransactionType(item.value)}
    //       />
    //       {transactionType === '0' ? (
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Enter UPI ID"
    //           value={upi}
    //           onChangeText={setUPI}
    //         />
    //       ) : (
    //         <>
    //           <TextInput
    //             style={styles.input}
    //             placeholder="Account Number"
    //             value={accountno}
    //             keyboardType="number-pad"
    //             onChangeText={setAccountno}
    //           />
    //           <TextInput
    //             style={styles.input}
    //             placeholder="IFSC Code"
    //             value={ifsccode}
    //             autoCapitalize="characters"
    //             onChangeText={setIfsccode}
    //           />
    //         </>
    //       )}
    //       <TextInput
    //         style={styles.input}
    //         placeholder="Account Holder Name"
    //         value={acholdername}
    //         onChangeText={setAcholdername}
    //       />
    //       <TextInput
    //         style={styles.input}
    //         placeholder="Amount"
    //         keyboardType="numeric"
    //         value={amount}
    //         onChangeText={setAmount}
    //       />
    //       <TextInput
    //         style={[styles.input, { height: rh(10) }]}
    //         placeholder="Remark (optional)"
    //         multiline
    //         value={remark}
    //         onChangeText={setRemark}
    //       />
    //       {/* <TouchableOpacity
    //         style={styles.button}
    //         onPress={handleWithdraw}
    //         disabled={loading}
    //       >
    //         {loading ? (
    //           <ActivityIndicator color="#fff" />
    //         ) : (
    //           <>
    //             <Ionicons name="wallet-outline" size={rf(2.5)} color="#fff" />
    //             <Text style={styles.buttonText}>Withdraw Now</Text>
    //           </>
    //         )}
    //       </TouchableOpacity> */}

    //       <TouchableOpacity
    //         style={styles.button}
    //         onPress={handleWithdraw}
    //         disabled={loading}
    //       >
    //         {loading ? (
    //           <ActivityIndicator color="#fff" />
    //         ) : (
    //           <>
    //             <View style={{ marginTop: rf(2), paddingHorizontal: 10 }}>
    //               {/* Balance Row */}
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   justifyContent: 'space-between',
    //                   alignItems: 'center',
    //                   backgroundColor: '#f4f7ff',
    //                   paddingVertical: 12,
    //                   paddingHorizontal: 15,
    //                   borderRadius: 10,
    //                   marginBottom: 20,
    //                   elevation: 2,
    //                 }}
    //               >
    //                 <Text
    // style={{
    //   fontSize: rf(2),
    //   marginHorizontal: 5,
    //   fontWeight: '600',
    //   color: '#333',
    // }}
    //                 >
    //                   Available Wallet Balance
    //                 </Text>

    //                 <Text
    //                   style={{
    // fontSize: rf(2.5),
    // fontWeight: '700',
    // color: '#1e90ff',
    //                   }}
    //                 >
    //                   ₹{balance}
    //                 </Text>
    //               </View>

    //               {/* Withdraw Button */}
    //               <TouchableOpacity
    //                 style={{
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#1e90ff',
    // paddingVertical: 14,
    // borderRadius: 10,
    //                 }}
    //                 onPress={handleWithdraw}
    //                 disabled={loading}
    //               >
    //                 {loading ? (
    //                   <ActivityIndicator color="#fff" />
    //                 ) : (
    //                   <>
    //                     <Ionicons
    //                       name="wallet-outline"
    //                       size={rf(2.5)}
    //                       color="#fff"
    //                       style={{ marginRight: 8 }}
    //                     />
    //                     <Text
    //                       style={{
    // fontSize: rf(2.3),
    // color: '#fff',
    // fontWeight: '600',
    //                       }}
    //                     >
    //                       Withdraw Now
    //                     </Text>
    //                   </>
    //                 )}
    //               </TouchableOpacity>
    //             </View>
    //           </>
    //         )}
    //       </TouchableOpacity>
    //     </View>

    //     {/* History */}
    //     <View style={styles.historyCard}>
    //       <Text style={styles.sectionTitle}>
    //         History{' '}
    //         <Text style={{ fontSize: rf(1.2) }}>(Withdrawal transactions)</Text>
    //       </Text>
    //       {historyLoading ? (
    //         <ActivityIndicator color="#14AE5C" size="large" />
    //       ) : refundHistory.length === 0 ? (
    //         <Text style={styles.noHistory}>No withdrawal history found.</Text>
    //       ) : (
    //         <FlatList
    //           data={refundHistory}
    //           renderItem={renderTransaction}
    //           keyExtractor={item =>
    //             item.id?.toString() || Math.random().toString()
    //           }
    //           showsVerticalScrollIndicator={false}
    //           ItemSeparatorComponent={() => <View style={styles.separator} />}
    //         />
    //       )}
    //     </View>
    //   </ScrollView>
    // </View>
    <View style={styles.safeArea}>
      <Header title="Withdraw" navigation={navigation} showBack />

      <FlatList
        data={refundHistory}
        renderItem={renderTransaction}
        keyExtractor={item => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ marginHorizontal: 10 }}
        // 🔝 WITHDRAW FORM
        ListHeaderComponent={
          <>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Account Details</Text>

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={transactionOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Transaction Type"
                value={transactionType}
                onChange={item => setTransactionType(item.value)}
              />

              {transactionType === '0' ? (
                <TextInput
                  style={styles.input}
                  placeholder="Enter UPI ID"
                  value={upi}
                  onChangeText={setUPI}
                  placeholderTextColor={'#000'}
                />
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    keyboardType="number-pad"
                    value={accountno}
                    onChangeText={setAccountno}
                     placeholderTextColor={'#000'}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="IFSC Code"
                    autoCapitalize="characters"
                    value={ifsccode}
                    onChangeText={setIfsccode}
                     placeholderTextColor={'#000'}
                  />
                </>
              )}

              <TextInput
                style={styles.input}
                placeholder="Account Holder Name"
                value={acholdername}
                onChangeText={setAcholdername}
                 placeholderTextColor={'#000'}
              />

              <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                 placeholderTextColor={'#000'}
              />

              <TextInput
                style={[styles.input, { height: rh(10) }]}
                placeholder="Remark (optional)"
                multiline
                value={remark}
                onChangeText={setRemark}
                 placeholderTextColor={'#000'}
              />

              {/* BALANCE + BUTTON */}
              <View
                style={{
                  backgroundColor: '#333',
                  borderRadius: moderateScale(10),
                }}
              >
                <View style={styles.balanceRow}>
                  <Text style={styles.balanceLabel}>
                    Available Wallet Balance
                  </Text>
                  <Text style={styles.balanceValue}>₹{balance}</Text>
                </View>

                <TouchableOpacity
                  style={styles.withdrawBtn}
                  onPress={handleWithdraw}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Ionicons
                        name="wallet-outline"
                        size={rf(2.4)}
                        color="#fff"
                      />
                      <Text style={styles.withdrawText}>Withdraw Now</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* HISTORY TITLE */}
            <Text style={styles.sectionTitle}>
              History <Text style={{ fontSize: rf(1.2) }}>(Withdrawal)</Text>
            </Text>

            {historyLoading && (
              <ActivityIndicator
                color="#14AE5C"
                size="large"
                style={{ marginVertical: 20 }}
              />
            )}

            {!historyLoading && refundHistory.length === 0 && (
              <Text style={styles.noHistory}>No withdrawal history found.</Text>
            )}
          </>
        }
      />
    </View>
  );
}

// Responsive Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { paddingBottom: rh(4) },
  card: {
    backgroundColor: '#fff',
    borderRadius: rw(3),
    marginBottom: rh(2),
  },
  sectionTitle: {
    fontSize: rf(2),
    fontWeight: '600',
    marginBottom: rh(1),
    color: '#333',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 10,
    // marginVertical: 10,
  },
  balanceLabel: {
    fontSize: rf(1.5),
    marginHorizontal: 5,
    fontWeight: '600',
    color: '#fff',
  },
  balanceValue: {
    fontSize: rf(2),
    fontWeight: '700',
    color: '#fff',
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14AE5C',
    paddingVertical: 14,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  withdrawText: {
    fontSize: rf(1.5),
    color: '#fff',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: rw(2),
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: rw(3),
    paddingVertical: rh(1.5),
    marginBottom: rh(1.5),
    fontSize: rf(1.8),
  },
  dropdown: {
    backgroundColor: '#f9f9f9',
    borderRadius: rw(2),
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: rw(3),
    paddingVertical: rh(1.5),
    marginBottom: rh(1.5),
  },
  placeholderStyle: { fontSize: rf(1.8), color: '#999' },
  selectedTextStyle: { fontSize: rf(1.8), color: '#111' },
  button: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rh(1.8),
    borderRadius: rw(2),
  },
  buttonText: {
    color: '#fff',
    marginLeft: rw(2),
    fontSize: rf(1.8),
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: rw(4),
    borderRadius: rw(3),
    elevation: 3,
    marginBottom: rh(2),
  },
  noHistory: { textAlign: 'center', color: '#777', marginVertical: rh(2) },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(1.5),
  },
  transactionIcon: { marginRight: rw(3) },
  amount: { fontSize: rf(1.8), fontWeight: '700' },
  label: { fontSize: rf(1.6), color: '#000' },
  date: { fontSize: rf(1.4), color: 'gray' },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: rh(1) },
});
