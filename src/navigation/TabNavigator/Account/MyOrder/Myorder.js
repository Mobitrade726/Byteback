import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelOrderAPI,
  fetchOrdersAPI,
} from '../../../../redux/slices/orderSlice';
import Header from '../../../../constants/Header';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveHeight,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import ActivityLoader from '../../../../constants/Loader';

const Myorder = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  const { orderList, loading } = useSelector(state => state.orders);

  // useEffect(() => {
  //   if (userId) dispatch(fetchOrdersAPI(userId));
  // }, [dispatch, userId]);
  useFocusEffect(
    React.useCallback(() => {
      if (userId) dispatch(fetchOrdersAPI(userId));
    }, [userId]),
  );

  // Loading Screen
  if (loading)
    return (
      <ActivityLoader/>
    );

  const statusStyles = {
    'Order Placed': { bg: '#D9D9D9', color: '#5A5A5A' },
    'Payment Verified': { bg: '#9BD4F6', color: '#FFFFFF' },
    'Stock-out Requested': { bg: '#E4DCCF', color: '#5A4F3D' },
    'Under Process': { bg: '#C9B79A', color: '#FFFFFF' },
    Packed: { bg: '#C9B79A', color: '#FFFFFF' },
    'Ready for dispatch': { bg: '#EED8B8', color: '#6E5B3B' },
    Dispatched: { bg: '#A28F79', color: '#FFFFFF' },
    Delivered: { bg: '#3FAE49', color: '#FFFFFF' },
    Returned: { bg: '#E1B040', color: '#FFFFFF' },
    Cancelled: { bg: '#DD6B6B', color: '#FFFFFF' },

    // Pickup orders
    Confirmed: { bg: '#9BD4F6', color: '#FFFFFF' },
    'Ready for pick-up': { bg: '#EED8B8', color: '#6E5B3B' },
    'Picked by buyer': { bg: '#3FAE49', color: '#FFFFFF' },
  };

  const getActions = item => {
    const actions = [];

    const isPickup = item.delivery_type_value == 0;
    const isHome = item.delivery_type_value == 1;

    const payCOD = item.payment_mode_value == 0;
    const payOnline = item.payment_mode_value == 1;
    const payWallet = item.payment_mode_value == 2;

    const status = String(item.order_status).trim().toLowerCase();

    const allow = (...list) => list.map(s => s.toLowerCase()).includes(status);

    const pushDetails = () =>
      actions.push({ label: 'Details', screen: 'MyorderDetails' });

    // === HOME DELIVERY ===
    if (isHome) {
      // PREPAID
      if (payOnline || payWallet) {
        if (
          allow(
            'order placed',
            'payment verified',
            'stock-out requested',
            'under process',
            'packed',
            'ready for dispatch',
          )
        ) {
          actions.push({ label: 'Cancel', screen: 'YourOrderIsCancle' });
        }
        pushDetails();
        return actions;
      }

      // HOME COD
      if (payCOD) {
        if (
          allow(
            'order placed',
            'order confirmed',
            'stock-out requested',
            'under process',
            'packed',
            'ready for dispatch',
          )
        ) {
          actions.push({ label: 'Cancel', screen: 'YourOrderIsCancle' });
        }
        pushDetails();
        return actions;
      }
    }

    // === PICKUP ===
    if (isPickup) {
      // PICKUP + ONLINE
      if (payOnline) {
        if (
          allow(
            'order placed',
            'payment verified',
            'stock-out requested',
            'under process',
            'packed',
            'ready for pick-up',
          )
        ) {
          actions.push({ label: 'Cancel', screen: 'YourOrderIsCancle' });
        }
        pushDetails();
        return actions;
      }

      // PICKUP + WALLET
      if (payWallet) {
        if (
          allow(
            'order placed',
            'stock-out requested',
            'under process',
            'packed',
            'ready for pick-up',
          )
        ) {
          actions.push({ label: 'Cancel', screen: 'YourOrderIsCancle' });
        }
        pushDetails();
        return actions;
      }

      // PICKUP + COD
      if (payCOD) {
        if (
          allow(
            'order placed',
            'order confirmed',
            'stock-out requested',
            'under process',
            'packed',
            'ready for pick-up',
          )
        ) {
          actions.push({ label: 'Cancel', screen: 'YourOrderIsCancle' });
        }
        pushDetails();
        return actions;
      }
    }

    // Default
    pushDetails();
    return actions;
  };

  const renderOrder = ({ item }) => {
    const actions = getActions(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <Text style={styles.orderTitle}>#{item.order_id_Number}</Text>

          <View
            style={[
              styles.statusBox,
              {
                backgroundColor: statusStyles[item.order_status]?.bg || '#ccc',
              },
            ]}
          >
            <Text
              style={{
                color: statusStyles[item.order_status]?.color || '#000',
                fontWeight: '700', fontSize: RF(1.3),
              }}
            >
              {item.order_status}
            </Text>
          </View>
        </View>

        <Text style={styles.subText}>{item.order_date_time}</Text>
        <Text style={styles.subText}>Quantity: {item.order_quantity}</Text>
        <Text style={styles.subText}>Subtotal: ₹{item.total_amount}</Text>

        {/* BUTTONS */}
        <View style={styles.actions}>
          {actions.map((btn, index) => (
            // <TouchableOpacity
            //   key={index}
            //   onPress={() =>
            //     navigation.navigate(btn.screen, {
            //       order_id: item.order_id,
            //       order_id_Number: item.order_id_Number,
            //     })
            //   }
            //   style={styles.button}
            // >
            //   <Text style={styles.buttonText}>{btn.label}</Text>
            // </TouchableOpacity>
            // <TouchableOpacity
            //   key={index}
            //   onPress={() => {
            //     navigation.navigate('MyorderDetails', {
            //       from: btn.label === 'Cancel' ? 'cancel' : 'details',
            //       order_id: item.order_id,
            //       order_id_Number: item.order_id_Number,
            //       payment_mode_value: item.payment_mode_value,
            //       delivery_type_value: item.delivery_type_value,
            //       order_status: item.order_status,
            //     });
            //   }}
            //   style={styles.button}
            // >
            //   <Text style={styles.buttonText}>{btn.label}</Text>
            // </TouchableOpacity>

            <TouchableOpacity
              key={index}
              onPress={() => {
                const isCancel = btn.label.toLowerCase() === 'cancel';

                if (isCancel) {
                  Alert.alert('Cancel Order', 'Are you sure?', [
                    { text: 'No', style: 'cancel' },
                    {
                      text: 'Yes',
                      onPress: async () => {
                        try {
                          await dispatch(cancelOrderAPI(item.order_id));
                          await dispatch(fetchOrdersAPI()); // refresh orders list

                          // After cancel, navigate to details screen
                          navigation.navigate('MyorderDetails', {
                            from: 'cancel',
                            order_id: item.order_id,
                            order_id_Number: item.order_id_Number,
                            payment_mode_value: item.payment_mode_value,
                            delivery_type_value: item.delivery_type_value,
                            order_status: item.order_status,
                          });
                        } catch (e) {
                          console.log('Cancel API error:', e);
                        }
                      },
                    },
                  ]);
                } else {
                  // DETAILS button
                  navigation.navigate('MyorderDetails', {
                    from: 'details',
                    order_id: item.order_id,
                    order_id_Number: item.order_id_Number,
                    payment_mode_value: item.payment_mode_value,
                    delivery_type_value: item.delivery_type_value,
                    order_status: item.order_status,
                  });
                }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const EmptyOrders = ({ navigation }) => {
    return (
      <View style={styles.emptyBox}>
        <View style={styles.emptyIcon}>
          <Text style={{ fontSize: RF(5), fontWeight: '900' }}>🛒</Text>
        </View>

        <Text style={styles.emptyTitle}>No Orders Found</Text>

        <Text style={styles.emptySubtitle}>
          Start shopping and your order history will appear here!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.emptyButton}
        >
          <Text style={styles.emptyButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <Header title="My Orders" navigation={navigation} showBack={true} />
      <FlatList showsVerticalScrollIndicator={false}
        data={orderList || []}
        renderItem={renderOrder}
        removeClippedSubviews={false}
        keyExtractor={item => item.order_id_Number.toString()}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(16),
          paddingBottom: verticalScale(30), // ⭐ FIXED
        }}
        ListEmptyComponent={<EmptyOrders navigation={navigation} />}
      />
    </View>
  );
};

export default Myorder;

const styles = StyleSheet.create({
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Attractive Card
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(8),
    marginTop: moderateScale(5),
    padding: scale(10),
    marginBottom: verticalScale(5),
    borderWidth: scale(1), borderColor:"#f1f1f1",
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderTitle: {
    fontSize: RF(2),
    fontWeight: '800',
    color: '#111',
    marginBottom: verticalScale(8),
  },

  statusBox: {
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(15),
    borderRadius: scale(20),
  },

  subText: {
    fontSize: RF(1.5),
    color: '#444',
    marginTop: verticalScale(4),
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: verticalScale(16),
    flexWrap: 'wrap',
  },

  button: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    borderRadius: scale(25),
    backgroundColor: '#f1f1f1',
    shadowOffset: { width: 0, height: scale(3) },

  },

  buttonText: {
    fontSize: RF(1.5),
    color: '#000',
    fontWeight: '700',
  },

  // Empty UI
  emptyBox: {
    alignItems: 'center',
    marginTop: verticalScale(80),
    paddingHorizontal: scale(20),
  },

  emptyIcon: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),

    shadowColor: '#1C9C48',
    shadowOpacity: 0.2,
    shadowRadius: scale(10),
    shadowOffset: { width: 0, height: scale(4) },
    elevation: 6,
  },

  emptyTitle: {
    fontSize: RF(2.6),
    fontWeight: '800',
    color: '#1C1C1C',
    marginBottom: verticalScale(4),
  },

  emptySubtitle: {
    fontSize: RF(1.9),
    color: '#555',
    textAlign: 'center',
    marginBottom: verticalScale(20),
    lineHeight: verticalScale(22),
  },

  emptyButton: {
    backgroundColor: '#1C9C48',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(40),
    borderRadius: scale(30),
    elevation: 5,
  },

  emptyButtonText: {
    fontSize: RF(2),
    color: '#fff',
    fontWeight: '700',
  },
});
