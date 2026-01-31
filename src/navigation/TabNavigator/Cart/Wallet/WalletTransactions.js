// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL} from '../../../../utils/utils';

// export default function WalletTransactions({navigation, route}) {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch wallet transactions
//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('TOKEN');
//       const userId = await AsyncStorage.getItem('USERID');

//       const response = await axios.get(
//         `${API_BASE_URL}/ledgerhistory/${userId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (response.data?.status) {
//         setTransactions(response.data.ledger);
//       } else {
//         setTransactions([]);
//       }
//     } catch (error) {
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//  const renderTransaction = ({item}) => {
//   const isCredit = Number(item.credit) > 0;
//   const amountValue = isCredit ? item.credit : item.debit;

//   // Amount formatting
//   const formattedAmount = Number(amountValue || 0).toLocaleString();

//   // UI amount with prefix
//   const displayAmount = isCredit
//     ? `+ ₹ ${formattedAmount}`
//     : `- ₹ ${formattedAmount}`;

//   // Icons & Colors
//   const iconName = isCredit ? "cash-plus" : "cash-minus";
//   const iconColor = isCredit ? "#10B981" : "#EF4444";

//   return (
//     <View style={styles.txnContainer}>

//       {/* LEFT ICON */}
//       <View style={styles.leftIconWrapper}>
//         <MaterialCommunityIcons
//           name={iconName}
//           size={26}
//           color={iconColor}
//         />
//       </View>

//       {/* MIDDLE CONTENT */}
//       <View style={{flex: 1}}>

//         {/* Amount */}
//         <Text style={[styles.amountText, {color: iconColor}]}>
//           {displayAmount}
//         </Text>

//         {/* Description */}
//         <Text style={styles.titleText}>
//           {item.description || "--"}
//         </Text>

//         {/* Date */}
//         <Text style={styles.dateText}>
//           {item.date || "--"}
//         </Text>
//       </View>

//       {/* RIGHT CHECKMARK */}
//       <Ionicons
//         name="checkmark-circle-outline"
//         size={24}
//         color="#10B981"
//       />
//     </View>
//   );
// };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Ionicons name="chevron-back" size={22} color="#000" />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.headerTitle}>Wallet : Transactions</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//           <Ionicons name="search" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#1A9E41"
//           style={{marginTop: 40}}
//         />
//       ) : transactions.length === 0 ? (
//         <View style={{alignItems: 'center', marginTop: 40}}>
//           <Ionicons name="wallet-outline" size={50} color="#bbb" />
//           <Text style={{color: '#888', marginTop: 10}}>
//             No transactions found
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={item => item.id?.toString() || Math.random().toString()}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingTop: 15,
//   },
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

// txnContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   paddingVertical: 14,
//   paddingHorizontal: 10,
//   backgroundColor: '#fff',
// },

// leftIconWrapper: {
//   width: 40,
//   alignItems: 'center',
//   justifyContent: 'center',
// },

// amountText: {
//   fontSize: 18,
//   fontWeight: '700',
// },

// titleText: {
//   fontSize: 15,
//   fontWeight: '500',
//   color: '#111',
//   marginTop: 2,
// },

// dateText: {
//   fontSize: 13,
//   color: '#666',
//   marginTop: 2,
// },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../utils/utils';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Header from '../../../../constants/Header';

export default function WalletTransactions({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/ledgerhistory/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data?.status) {
        setTransactions(response.data.ledger);
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
    fetchTransactions();
  }, []);

  const renderTransaction = ({ item }) => {
    const isCredit = Number(item.credit) > 0;
    const amountValue = isCredit ? item.credit : item.debit;

    const formattedAmount = Number(amountValue || 0).toLocaleString();
    const displayAmount = isCredit
      ? `+ ₹ ${formattedAmount}`
      : `- ₹ ${formattedAmount}`;
    const iconName = isCredit ? 'cash-plus' : 'cash-minus';
    const iconColor = isCredit ? '#1C9C48' : '#CB444B';

    console.log('transactions----------------', transactions);

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
      <View style={styles.txnContainer}>
        <View style={styles.leftIconWrapper}>
          <MaterialCommunityIcons
            name={iconData.icon}
            size={moderateScale(18)}
            color={iconData.color}
            style={styles.transactionIcon}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.amountText, { color: iconColor }]}>
            {displayAmount}
          </Text>
          <Text style={styles.titleText}>{item.description || '--'}</Text>
          <Text style={styles.dateText}>{item.date || '--'}</Text>
        </View>

        <Ionicons
          name="checkmark-circle-outline"
          size={moderateScale(18)}
          color="#1C9C48"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <Header
        title="Wallet : Transactions"
        navigation={navigation}
        showBack={true}
      />
      <View style={{ paddingHorizontal: moderateScale(15) }}></View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1C9C48"
          style={{ marginTop: responsiveHeight(5) }}
        />
      ) : transactions.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: responsiveHeight(5) }}>
          <Ionicons
            name="wallet-outline"
            size={moderateScale(50)}
            color="#bbb"
          />
          <Text style={{ color: '#888', marginTop: verticalScale(10) }}>
            No transactions found
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  headerTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  txnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#fff',
  },
  leftIconWrapper: {
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
  titleText: {
    fontSize: responsiveFontSize(1.5),
    color: '#111',
    marginTop: verticalScale(2),
  },
  dateText: {
    fontSize: responsiveFontSize(1.5),
    color: '#333333',
    marginTop: verticalScale(2),
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

// import React, { useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFocusEffect } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { responsiveFontSize as RF } from 'react-native-responsive-dimensions';

// import Header from '../../../../constants/Header';
// import {
//   fetchLedgerBalance,
//   fetchWalletBalance,
//   fetchLatestWalletHistory,
// } from '../../../../redux/slices/walletSlice';
// import responsive from '../../../../constants/responsive';

// /* ================= ICON MAPPER ================= */
// const getTransactionIcon = description => {
//   const desc = description?.toLowerCase();

//   if (desc.includes('order cancelled')) {
//     return { icon: 'close-circle', color: '#CB444B' };
//   }

//   if (desc.includes('order')) {
//     return { icon: 'cart', color: '#1C9C48' };
//   }

//   if (desc.includes('refund')) {
//     return { icon: 'arrow-down', color: '#F9A825' };
//   }

//   if (desc.includes('added money')) {
//     return { icon: 'cash-plus', color: '#1C9C48' };
//   }

//   if (desc.includes('withdraw')) {
//     return { icon: 'cash-minus', color: '#D32F2F' };
//   }

//   return { icon: 'cash', color: '#999' };
// };

// export default function Wallet({ navigation }) {
//   const dispatch = useDispatch();
//   const { balance, ledgerbalance } = useSelector(state => state.wallet);

//   /* ================= API CALLS ================= */
//   useEffect(() => {
//     dispatch(fetchLedgerBalance());
//     dispatch(fetchWalletBalance());
//     dispatch(fetchLatestWalletHistory());
//   }, [dispatch]);

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(fetchLedgerBalance());
//     }, [dispatch]),
//   );

//   /* ================= RENDER ITEM ================= */
//   const renderTransaction = ({ item }) => {
//     const iconData = getTransactionIcon(item.description);

//     const credit = Number(item.credit || 0);
//     const debit = Number(item.debit || 0);

//     let displayAmount = '';

//     if (credit > 0) {
//       displayAmount = `+ ₹ ${credit.toLocaleString('en-IN')}`;
//     } else if (debit > 0) {
//       displayAmount = `- ₹ ${debit.toLocaleString('en-IN')}`;
//     }

//     return (
//       <>
//         <View style={styles.transactionRow}>
//           {/* LEFT ICON */}
//           <MaterialCommunityIcons
//             name={iconData.icon}
//             size={moderateScale(18)}
//             color={iconData.color}
//             style={styles.transactionIcon}
//           />

//           {/* CENTER */}
//           <View style={{ flex: 1 }}>
//             <Text style={[styles.amount, { color: iconData.color }]}>
//               {displayAmount}
//             </Text>

//             <Text style={styles.label}>{item.description}</Text>
//             <Text style={styles.date}>{item.date}</Text>
//           </View>

//           {/* RIGHT CHECK */}
//           <Ionicons
//             name="checkmark-circle"
//             size={moderateScale(18)}
//             color="#1C9C48"
//           />
//         </View>
//       </>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Wallet" navigation={navigation} showBack />

//       {/* ================= TRANSACTIONS ================= */}
//       <Text style={styles.recentTitle}>Recent Transactions</Text>
//       <Text style={styles.recentDesc}>
//         Only Verified Transactions Available
//       </Text>

//       <FlatList
//         data={ledgerbalance}
//         renderItem={renderTransaction}
//         keyExtractor={(item, index) => index.toString()}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={() => <View style={styles.dividerspecification} />}
//         ItemSeparatorComponent={() => (
//           <View style={styles.dividerspecification} />
//         )}
//         ListFooterComponent={() => <View style={styles.dividerspecification} />}
//       />
//     </View>
//   );
// }

// /* ================= STYLES ================= */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   balanceCard: {
//     margin: scale(12),
//     padding: scale(14),
//     borderRadius: scale(12),
//     backgroundColor: '#FFF',
//     elevation: 5,
//   },
//   balanceLabel: {
//     fontSize: RF(1.8),
//     color: '#777',
//   },
//   balanceAmount: {
//     fontSize: RF(3),
//     fontWeight: 'bold',
//     marginVertical: verticalScale(6),
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: scale(10),
//     marginTop: verticalScale(10),
//   },
//   addMoneyBtn: {
//     flex: 1,
//     backgroundColor: '#1C9C48',
//     padding: scale(10),
//     borderRadius: scale(10),
//     alignItems: 'center',
//   },
//   addMoneyText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   withdrawBtn: {
//     flex: 1,
//     backgroundColor: '#666',
//     padding: scale(10),
//     borderRadius: scale(10),
//     alignItems: 'center',
//   },
//   withdrawText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   recentTitle: {
//     fontSize: responsive.fontSize(16),
//     marginHorizontal: scale(14),
//     marginBottom: verticalScale(2),
//     textAlign: 'center',
//   },
//   recentDesc: {
//     fontSize: responsive.fontSize(10),
//     marginHorizontal: scale(14),
//     marginBottom: verticalScale(10),
//     textAlign: 'center',
//   },
//   transactionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(8),
//     marginHorizontal: scale(14),
//   },
//   transactionIcon: {
//     marginRight: scale(10),
//   },
//   amount: {
//     fontSize: RF(1.7),
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: RF(1.5),
//     color: '#000',
//   },
//   date: {
//     fontSize: RF(1.4),
//     color: '#777',
//   },
//   dividerspecification: {
//     height: 1,
//     backgroundColor: '#333', // dark grey / black
//     opacity: 0.6,
//   },
// });
