import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../constants/Header';
import { fetchOrderDetailsAPI } from '../../../../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const wp = p => (width * p) / 100; // width percentage
const hp = p => (height * p) / 100; // height percentage

const ProcessToPay = ({ navigation, route }) => {
  const { order_id } = route.params;
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector(state => state.orders);

  // let order_id_Number = orderDetails?.order_id;

  useEffect(() => {
    dispatch(fetchOrderDetailsAPI(order_id));
  }, [dispatch, order_id]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('Home');
        return true; // Default back को रोक दो
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => subscription.remove();
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header
          title="Order Confirmed!"
          navigation={navigation}
          showBack={true}
          showSearch
          onBackPress={() => navigation.navigate('Home')}
        />

        <View style={styles.whiteSection}>
          {/* Order ID */}
          <Text style={styles.orderId}>
            Order ID: #{orderDetails?.order_id_number}
          </Text>
          <View style={styles.separator} />

          {/* Clock Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/images/timer.png')} // Your custom clock image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackOrder', {
                  order_id: orderDetails?.order_id,
                  order_id_Number: orderDetails?.order_id_number,
                })
              }
              style={styles.blackButton}
            >
              <Text style={styles.buttonText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyorderDetails', {
                  order_id: orderDetails?.order_id,
                  order_id_Number: orderDetails?.order_id_number,
                })
              }
              style={styles.blackButton}
            >
              <Text style={styles.buttonText}>View Order</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Order Summary */}
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {orderDetails?.item_details?.map(item => (
            <View key={item.id} style={styles.productItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.gradeText}>{item.grade || '--'}</Text>
                <Text style={styles.productTitle}>{item.model_name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </View>
              <Image
                source={{ uri: item.model_image }}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.greenButton}
      >
        <Text style={styles.greenButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProcessToPay;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
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
//   confirmContainer: {
//     backgroundColor: '#2E9B4F',
//     padding: 24,
//   },
//   confirmTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   viewDetailsButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 10,
//     marginTop: 12,
//     width: '33%',
//   },
//   viewDetailsText: {
//     fontWeight: '600',
//     color: '#000',
//   },
//   whiteSection: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   orderId: {
//     fontWeight: '500',
//     textAlign: 'right',
//     fontSize: 14,
//     color: '#333',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderColor: '#000',
//     marginVertical: 10,
//   },
//   iconContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginBottom: 10,
//   },
//   blackButton: {
//     backgroundColor: '#222',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     marginTop: 5,
//     color: '#000',
//   },
//   productItem: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     alignItems: 'center',
//   },
//   gradeText: {
//     fontSize: 12,
//     color: '#777',
//   },
//   productTitle: {
//     fontWeight: '500',
//     marginTop: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   price: {
//     fontWeight: '600',
//     color: '#000',
//     marginRight: 10,
//   },
//   originalPrice: {
//     textDecorationLine: 'line-through',
//     color: '#999',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginLeft: 10,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   deliveryContainer: {
//     backgroundColor: '#F5FDF9',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   deliveryTitle: {
//     fontWeight: '500',
//     fontSize: 16,
//     color: '#222',
//   },
//   deliveryDate: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 6,
//   },
//   deliveryDays: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#11A5D7',
//   },
//   deliverySubText: {
//     fontSize: 14,
//     color: '#000',
//     fontWeight: '600',
//   },
//   greenButton: {
//     backgroundColor: '#2E9B4F',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//     marginHorizontal: 20,
//   },
//   greenButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
  },

  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: wp(7),
    padding: wp(2),
  },

  headerTitle: {
    fontSize: wp(4.5),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },

  whiteSection: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },

  orderId: {
    fontWeight: '500',
    textAlign: 'right',
    fontSize: wp(3.5),
    color: '#333',
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginVertical: hp(1.5),
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp(2),
  },

  blackButton: {
    backgroundColor: '#222',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.4),
    borderRadius: wp(2),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(3.8),
  },

  sectionTitle: {
    fontSize: wp(4.2),
    fontWeight: '600',
    marginBottom: hp(1),
    marginTop: hp(1),
    color: '#000',
  },

  productItem: {
    flexDirection: 'row',
    paddingVertical: hp(1.6),
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  gradeText: {
    fontSize: wp(3),
    color: '#777',
  },

  productTitle: {
    fontWeight: '500',
    fontSize: wp(3.6),
    marginTop: hp(0.5),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
  },

  price: {
    fontWeight: '600',
    color: '#000',
    marginRight: wp(2),
    fontSize: wp(3.8),
  },

  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: wp(3.2),
  },

  productImage: {
    width: wp(22),
    height: wp(22),
    marginLeft: wp(3),
    backgroundColor: '#f8f8f8',
    borderRadius: wp(2),
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },

  greenButton: {
    backgroundColor: '#2E9B4F',
    padding: hp(2),
    borderRadius: wp(3),
    alignItems: 'center',
    marginBottom: hp(6),
    marginHorizontal: wp(5),
  },

  greenButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});
