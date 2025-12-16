import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../../constants/Header';
import {
  fetchLedgerBalance,
  fetchWalletBalance,
  fetchLatestWalletHistory,
} from '../../../../redux/slices/walletSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

export default function Wallet({ navigation }) {
  const dispatch = useDispatch();
  const { balance, ledgerbalance, latesthistory, loading, error } = useSelector(
    state => state.wallet,
  );

  // ✅ fetch when screen mounts
  useEffect(() => {
    dispatch(fetchLedgerBalance());
    dispatch(fetchWalletBalance());
    dispatch(fetchLatestWalletHistory());
  }, [dispatch]);

  // ✅ Auto refresh on screen focus
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchLedgerBalance());
      dispatch(fetchLatestWalletHistory());
    }, [dispatch]),
  );

  // const renderTransaction = ({item}) => {
  //   let displayAmount = '';
  //   let iconColor = 'gray'; // main icon color
  //   let checkmarkColor = 'green'; // default checkmark color

  //   // Determine amount and colors based on status_text
  //   if (item.description === 'Money Added') {
  //     displayAmount = `+ ₹ ${item.balance.toLocaleString()}`;
  //     iconColor = 'green';
  //     checkmarkColor = 'green';
  //   } else if (item.description === 'Verification Pending') {
  //     displayAmount = `₹ ${item.balance.toLocaleString()}`;
  //     iconColor = 'orange';
  //     checkmarkColor = 'orange';
  //   } else if (item.description === 'Rejected') {
  //     displayAmount = `₹ ${item.balance.toLocaleString()}`;
  //     iconColor = 'red';
  //     checkmarkColor = 'red';
  //   } else {
  //     // fallback for other statuses
  //     displayAmount =
  //       item.type === 'credit'
  //         ? `+ ₹ ${item.balance.toLocaleString()}`
  //         : `- ₹ ${item.balance.toLocaleString()}`;
  //     iconColor = item.type === 'credit' ? 'green' : 'red';
  //     checkmarkColor = item.type === 'credit' ? 'green' : 'red';
  //   }

  //   return (
  //     <View style={styles.transactionRow}>
  //       <MaterialCommunityIcons
  //         name={item.icon}
  //         size={24}
  //         color={iconColor}
  //         style={styles.transactionIcon}
  //       />
  //       <View style={{flex: 1}}>
  //         <Text style={[styles.balance, {color: iconColor}]}>
  //           {displayAmount}
  //         </Text>
  //         <Text style={styles.label}>{item.description}</Text>
  //         <Text style={styles.date}>{item.date}</Text>
  //       </View>
  //       <Ionicons
  //         name="checkmark-circle-outline"
  //         size={moderateScale(22)}
  //         color={checkmarkColor}
  //       />
  //     </View>
  //   );
  // };

  const renderTransaction = ({ item }) => {
    // 🟢 Convert credit/debit to numbers
    const credit = Number(item.credit || 0);
    const debit = Number(item.debit || 0);
    const balance = Number(item.balance || 0);

    let displayAmount = '';
    let iconColor = '';
    let checkmarkColor = '';
    let sign = '';

    // 🟢 If CREDIT happened → Money Added
    if (credit > 0) {
      displayAmount = `+ ₹ ${credit.toLocaleString('en-IN')}`;
      sign = '+';
      iconColor = 'green';
      checkmarkColor = 'green';

      // 🔴 If DEBIT happened → Money Deducted
    } else if (debit > 0) {
      displayAmount = `- ₹ ${debit.toLocaleString('en-IN')}`;
      sign = '-';
      iconColor = 'red';
      checkmarkColor = 'red';
    } else {
      // 🟡 Fallback
      displayAmount = `₹ ${balance.toLocaleString('en-IN')}`;
      iconColor = 'gray';
      checkmarkColor = 'gray';
    }

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name="cash-multiple"
          size={24}
          color={iconColor}
          style={styles.transactionIcon}
        />

        <View style={{ flex: 1 }}>
          <Text style={[styles.amount, { color: iconColor }]}>
            {displayAmount}
          </Text>

          <Text style={styles.label}>
            {[item?.description, item?.invoice_number]
              .filter(Boolean)
              .join(' - ')}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Ionicons
          name="checkmark-circle-outline"
          size={moderateScale(22)}
          color={checkmarkColor}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Wallet" navigation={navigation} showBack={true} />

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>₹{balance}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WalletAddMoney')}
            style={styles.addMoneyBtn}
          >
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Withdraw')}
            style={styles.withdrawBtn}
          >
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('WalletTransactions')}
          style={styles.allTransactionsBtn}
        >
          <Text style={styles.allTransactionsText}>View All Transactions</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.recentTitle}>Recent Transactions</Text>
      <FlatList
        data={ledgerbalance}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: moderateScale(25),
            }}
          >
            {/* 🔵 Circular Icon Box */}
            <View
              style={{
                width: scale(80),
                height: scale(80),
                borderRadius: scale(110 / 2),
                backgroundColor: '#FFF4DA',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: verticalScale(18),
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: verticalScale(4) },
                elevation: 6,
              }}
            >
              <Text
                style={{
                  fontSize: RF(4.5),
                  color: '#F5A623',
                  fontWeight: '900',
                }}
              >
                💰
              </Text>
            </View>

            {/* 🔹 Title */}
            <Text
              style={{
                fontSize: RF(2.5),
                fontWeight: '800',
                color: '#222',
                marginBottom: verticalScale(10),
                textAlign: 'center',
              }}
            >
              No Recent Transactions
            </Text>

            {/* 🔸 Subtitle */}
            <Text
              style={{
                fontSize: RF(1.9),
                textAlign: 'center',
                color: '#666',
                lineHeight: verticalScale(22),
                marginBottom: verticalScale(20),
              }}
            >
              Your wallet looks empty right now.{'\n'}
              Add money or make a purchase to see transactions here!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFEFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(20),
    padding: scale(6),
    left: 0,
  },
  headerTitle: {
    fontSize: RF(2),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  balanceCard: {
    backgroundColor: '#F9F9F9',
    padding: scale(20),
    borderRadius: scale(12),
    marginBottom: verticalScale(20),
    borderWidth: 0.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: scale(4),
    elevation: 3,
    marginVertical: verticalScale(10),
    marginHorizontal: scale(15),
  },
  balanceLabel: {
    fontSize: RF(1.8),
    color: 'gray',
  },
  balanceAmount: {
    fontSize: RF(3.5),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(10),
  },
  addMoneyBtn: {
    backgroundColor: 'green',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(40),
    borderRadius: scale(8),
  },
  addMoneyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.7),
  },
  withdrawBtn: {
    backgroundColor: '#444',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(40),
    borderRadius: scale(8),
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.7),
  },
  allTransactionsBtn: {
    backgroundColor: '#222',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
  },
  allTransactionsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.7),
    textAlign: 'center',
  },
  recentTitle: {
    fontSize: RF(1.8),
    fontWeight: '600',
    color: 'gray',
    marginBottom: verticalScale(10),
    marginHorizontal: scale(15),
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: scale(15),
  },
  transactionIcon: {
    marginRight: scale(10),
  },
  amount: {
    fontSize: RF(2),
    fontWeight: 'bold',
  },
  label: {
    fontSize: RF(1.7),
    color: '#000',
  },
  date: {
    fontSize: RF(1.5),
    color: 'gray',
  },
});
