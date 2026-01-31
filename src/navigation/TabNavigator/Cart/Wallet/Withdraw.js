import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
import { moderateScale, scale } from 'react-native-size-matters';
import responsive from '../../../../constants/responsive';

export default function WithdrawScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [acholdername, setAcholdername] = useState('');
  const [accountno, setAccountno] = useState('');
  const [ifsccode, setIfsccode] = useState('');
  const [remark, setRemark] = useState('');
  const [transactionType, setTransactionType] = useState(
    'Select Transaction Type',
  );
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
    let checkmarkColor = '#1C9C48';
    let displayAmount = Number(item.amount || 0).toLocaleString();

    switch (item.payment_status_text) {
      case 'Withdraw Verified':
        icon = 'cash-plus';
        iconColor = '#1C9C48';
        checkmarkIcon = 'checkmark-circle-outline';
        checkmarkColor = '#1C9C48';
        displayAmount = `+ ₹ ${displayAmount}`;
        break;
      case 'Withdraw Pending':
        icon = 'timer-sand';
        iconColor = '#F6C344';
        checkmarkIcon = 'time-outline';
        checkmarkColor = '#F6C344';
        displayAmount = `₹ ${displayAmount}`;
        break;
      case 'Withdraw Rejected':
        icon = 'close-octagon-outline';
        iconColor = '#CB444B';
        checkmarkIcon = 'close-circle-outline';
        checkmarkColor = '#CB444B';
        displayAmount = `₹ ${displayAmount}`;
        break;
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={icon}
          size={rf(2)}
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
        <Ionicons name={checkmarkIcon} size={rf(2)} color={checkmarkColor} />
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <Header title="Withdraw" navigation={navigation} showBack />

      <FlatList
        data={refundHistory}
        renderItem={renderTransaction}
        keyExtractor={item => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        // 🔝 WITHDRAW FORM
        ListHeaderComponent={
          <>
            <View style={{ marginHorizontal: responsive.marginHorizontal(10) }}>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                {loading ? (
                  <ActivityIndicator color="#14AE5C" />
                ) : (
                  <Text style={styles.balanceValue}>₹{balance}</Text>
                )}
              </View>
              <View style={styles.card}>
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
                  <>
                    <Text style={styles.labelinput}>Enter UPI ID</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="XXXXXXXXX"
                      value={upi}
                      onChangeText={setUPI}
                      placeholderTextColor={'#1C9C48'}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <View style={styles.inputWrapper}>
                        <Text style={styles.labelinput}>Account Number</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="XXXXXXXXX"
                          keyboardType="number-pad"
                          value={accountno}
                          onChangeText={setAccountno}
                          placeholderTextColor={'#1C9C48'}
                        />
                      </View>
                      <View style={styles.inputWrapper}>
                        <Text style={styles.labelinput}>IFSC Code</Text>

                        <TextInput
                          style={styles.input}
                          placeholder="XXXXXXXXX"
                          autoCapitalize="characters"
                          value={ifsccode}
                          onChangeText={setIfsccode}
                          placeholderTextColor={'#1C9C48'}
                        />
                      </View>
                    </View>
                  </>
                )}
                <Text style={styles.labelinput}>Account Holder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="XXXXXXXXX"
                  value={acholdername}
                  onChangeText={setAcholdername}
                  placeholderTextColor={'#1C9C48'}
                />
                <Text style={styles.labelinput}>Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="XXXXXXXXX"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholderTextColor={'#1C9C48'}
                />
                <Text style={styles.labelinput}>Remark</Text>
                <TextInput
                  style={[styles.input]}
                  placeholder="XXXXXXXXX"
                  multiline
                  value={remark}
                  onChangeText={setRemark}
                  placeholderTextColor={'#1C9C48'}
                />

                <View
                  style={{
                    borderRadius: moderateScale(10),
                  }}
                >
                  <TouchableOpacity
                    style={styles.withdrawBtn}
                    onPress={handleWithdraw}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Text style={styles.withdrawText}>
                          Request Withdraw
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.noteContainer}>
                  <Text style={styles.bulletText}>
                    • Funds will be credited within 3–7 business days.
                  </Text>
                  <Text style={styles.bulletText}>
                    • Minimum withdrawal amount is ₹100.
                  </Text>
                  <Text style={styles.bulletText}>
                    • Amount can be withdrawn in the favor of account holder
                    only.
                  </Text>
                </View>
              </View>
            </View>

            {/* HISTORY TITLE */}
            <Text style={styles.sectionTitle}>
              History{' '}
              <Text
                style={{ fontSize: responsive.fontSize(10), fontWeight: '400' }}
              >
                (Showing only Withdrawal transactions)
              </Text>
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  card: {
    backgroundColor: '#fff',
    borderRadius: rw(3),
  },
  sectionTitle: {
    fontSize: responsive.fontSize(16),
    fontWeight: '450',
    marginBottom: rh(1),
    color: '#171D1C',
    backgroundColor: '#EAE6E5',
    padding: responsive.padding(8),
    borderTopWidth: scale(0.5),
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
  withdrawBtn: {
    backgroundColor: '#171D1C',
    paddingVertical: responsive.paddingVertical(10),
    borderRadius: responsive.borderRadius(12),
  },
  withdrawText: {
    fontSize: responsive.fontSize(17),
    color: '#fff',
    fontWeight: '600',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFBFA',
    borderRadius: rw(2),
    borderWidth: 1,
    borderColor: '#EAE6E5',
    paddingHorizontal: responsive.paddingHorizontal(10),
    paddingVertical: responsive.paddingVertical(12),
    marginBottom: rh(1.5),
    fontSize: responsive.fontSize(12),
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
  placeholderStyle: { fontSize: rf(1.8), color: '#666666' },
  selectedTextStyle: { fontSize: rf(1.8), color: '#666666' },
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
    paddingVertical: responsive.paddingVertical(5),
    paddingHorizontal: responsive.paddingHorizontal(10),
    borderColor: 'grey',
    borderBottomWidth: scale(0.3),
    marginBottom: responsive.marginBottom(5),
  },
  transactionIcon: { marginRight: rw(3) },
  amount: { fontSize: responsive.fontSize(17), fontWeight: '500' },
  label: {
    fontSize: responsive.fontSize(12),
    color: '#171D1C',
    fontWeight: '300',
  },
  date: { fontSize: responsive.fontSize(12), color: '#333333' },

  balanceContainer: {
    backgroundColor: '#FBFEFC',
    borderRadius: responsive.borderRadius(12),
    padding: scale(15),
    elevation: 2,
    marginTop: responsive.marginTop(2),
    marginBottom: responsive.marginBottom(10),

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
  labelinput: {
    color: '#171D1C',
    marginBottom: responsive.marginBottom(10),
    fontSize: responsive.fontSize(16),
  },
  noteContainer: {
    paddingVertical: 8,
  },

  bulletText: {
    fontSize: responsive.fontSize(10),
    color: '#0D1C1C',
    lineHeight: 10,
    marginBottom: responsive.marginBottom(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:10
  },

  inputWrapper: {
    flex: 1,
  },
});
