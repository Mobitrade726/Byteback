import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

    const getTransactionIcon = description => {
      const desc = description?.toLowerCase();

      if (desc.includes('order cancelled')) {
        return { icon: 'close-circle', color: '#CB444B' };
      }

      if (desc.includes('order')) {
        return { icon: 'cart', color: '#1C9C48' };
      }

      if (desc.includes('refund')) {
        return { icon: 'arrow-down', color: '#F9A825' };
      }

      if (desc.includes('added money')) {
        return { icon: 'cash-plus', color: '#1C9C48' };
      }

      if (desc.includes('withdraw')) {
        return { icon: 'cash-minus', color: '#D32F2F' };
      }

      return { icon: 'cash', color: '#999' };
    };

    const iconData = getTransactionIcon(item.description);

    return (
      <View style={styles.transactionRow}>
        <MaterialCommunityIcons
          name={iconData.icon}
          size={moderateScale(18)}
          color={iconData.color}
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
          size={moderateScale(18)}
          color={checkmarkColor}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Wallet" navigation={navigation} showBack={true} />

      {/* Balance Card */}
      <View style={[ProductCardStyles.cardShadow, { marginTop: 5 }]}>
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
            <Text style={styles.allTransactionsText}>
              View All Transactions
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.recentTitle}>Recent Transactions</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ledgerbalance}
        renderItem={renderTransaction}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
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
    </View>
  );
}
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';
import responsive from '../../../../constants/responsive';
import { ProductCardStyles } from '../../../../constants/ProductCardStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    padding: responsive.padding(10),
    borderRadius: responsive.borderRadius(12),
    borderWidth: 0,
    overflow: 'hidden',
    marginHorizontal: scale(10),
    marginBottom: responsive.marginBottom(10),
    borderColor: '#ffffff',
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  balanceLabel: {
    fontSize: responsive.fontSize(15),
    color: 'gray',
  },
  balanceAmount: {
    fontSize: responsive.fontSize(25),
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  buttonRow: {
    gap: scale(1),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addMoneyBtn: {
    backgroundColor: '#1C9C48',
    // paddingVertical: verticalScale(8),
    borderRadius: responsive.borderRadius(12),
    padding: responsive.padding(10),
    flex: 1,
    alignItems: 'center',
    marginHorizontal: responsive.marginHorizontal(2),
  },
  addMoneyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsive.fontSize(16),
  },
  withdrawBtn: {
    backgroundColor: '#666666',
    borderRadius: responsive.borderRadius(12),
    padding: responsive.padding(10),
    flex: 1,
    alignItems: 'center',
    marginHorizontal: responsive.marginHorizontal(2),
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.5),
  },
  allTransactionsBtn: {
    backgroundColor: '#333333',
    padding: responsive.padding(10),
    marginHorizontal: responsive.marginHorizontal(2),
    borderRadius: responsive.borderRadius(12),
  },
  allTransactionsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RF(1.5),
    textAlign: 'center',
  },
  recentTitle: {
    fontSize: responsive.fontSize(16),
    color: '#171D1C',
    marginBottom: verticalScale(10),
    marginHorizontal: scale(15),
    textAlign: 'center',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: scale(15),
  },
  transactionIcon: {
    marginRight: scale(10),
  },
  amount: {
    fontSize: RF(1.5),
    fontWeight: 'bold',
  },
  label: {
    fontSize: RF(1.5),
    color: '#000',
  },
  date: {
    fontSize: RF(1.5),
    color: 'gray',
  },
});
