// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {
//   removeFromCartAPI,
//   fetchCartAPI,
//   clearCartAPI,
//   checkoutAPI,
// } from './slices/cartSlice';
// import {fetchProfile} from './slices/profileSlice';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import Header from '../constants/Header';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {items: cartItems} = useSelector(state => state.cart);
//   const {data} = useSelector(state => state.profile);

//   const handleClear = () => {
//     dispatch(clearCartAPI()).then(() => {
//       dispatch(fetchCartAPI()); // refresh cart from backend ✅
//     });
//   };

//   const isKYCIncomplete = !data?.vendordocuments?.aadhaar_no;

//   // Fetch cart on mount
//   useEffect(() => {
//     dispatch(fetchCartAPI());
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   const handleCartCheckout = () => {
//     const productPrices = cartItems.map(item => item.price);
//     const productQuantities = cartItems.map(item => item.quantity);

//     cartItems.forEach(item => {
//       dispatch(
//         checkoutAPI({
//           type: 'cart_product',
//           barcode_id: item?.barcode_id,
//           cart_id: item?.cart_id,
//           // navigation,
//         }),
//       );
//     });

//     // 3) Navigate & Send Summary Data
//     navigation.navigate('Checkout', {
//       productPrices,
//       productQuantities,
//     });
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.cartItem}>
//       <Image source={{uri: item.feature_image}} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.model}</Text>
//         <Text style={styles.name}>
//           {item.ram || '-'} / {item.rom || '-'}
//         </Text>
//         <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
//       </View>
//       <TouchableOpacity
//         onPress={() =>
//           dispatch(removeFromCartAPI(item.barcode_id)).then(() =>
//             dispatch(fetchCartAPI()),
//           )
//         }
//         style={{alignItems: 'center', justifyContent: 'center'}}>
//         <Ionicons name="close" size={22} color="#555" />
//         <Text style={styles.price}>x{item.quantity}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   // KYC Card Component
//   const KYCStatusCard = ({
//     title,
//     subtitle,
//     buttonText,
//     icon,
//     bgColor,
//     iconColor,
//     buttonColor,
//     textColor,
//     isDisabled,
//   }) => {
//     const navigation = useNavigation();
//     return (
//       <View style={[styles.card, {backgroundColor: bgColor}]}>
//         <View style={styles.cardHeader}>
//           <Text style={[styles.titleS, {color: textColor}]}>{title}</Text>
//           <Ionicons
//             name={icon}
//             size={24}
//             color={iconColor}
//             style={styles.iconCircle}
//           />
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text style={[styles.subtitle, {color: textColor}]}>{subtitle}</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('KycCompleteStatus')}
//             style={[styles.button, {backgroundColor: buttonColor}]}
//             disabled={isDisabled}>
//             <Text style={styles.buttonText}>{buttonText}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Header title="Cart" navigation={navigation} showBack={true} />

//         {/* Business Banner */}
//         <ImageBackground
//           source={{uri: 'https://i.postimg.cc/d0Hky5p1/Depth-3-Frame-0.png'}}
//           style={styles.banner}
//           imageStyle={{borderRadius: 12}}>
//           <View style={{flex: 1, justifyContent: 'center'}}>
//             <Text style={styles.bannerTitle}>
//               Upgrade to{'\n'}Business Account
//             </Text>
//             <View style={{flexDirection: 'row'}}>
//               <View>
//                 <Text style={styles.bannerSubtitle}>
//                   Unlock exclusive dealer pricing and
//                 </Text>
//                 <Text style={styles.bannerSubtitle}>bulk order options.</Text>
//               </View>
//               <View
//                 onPress={() => navigation.navigate('UpgradeNow')}
//                 style={styles.upgradeBtn}>
//                 <Text style={styles.upgradeText}>Upgrade Now</Text>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>

//         <View style={{marginHorizontal: 10}}>
//           {/* Empty Cart */}
//           {cartItems.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
//             </View>
//           ) : (
//             <>
//               <FlatList
//                 data={cartItems}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.list}
//               />
//               <TouchableOpacity
//                 style={styles.clearBtn}
//                 onPress={() => handleClear()}>
//                 <Text style={styles.clearText}>🗑️ Clear Cart</Text>
//               </TouchableOpacity>
//             </>
//           )}
//           {/* KYC Section */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.carousel}>
//             {isKYCIncomplete ? (
//               <KYCStatusCard
//                 title="Your KYC is pending"
//                 subtitle="Complete your KYC to place orders and unlock business account benefits."
//                 buttonText="Complete now"
//                 icon="information-circle-outline"
//                 bgColor="#00A9E0"
//                 iconColor="#fff"
//                 buttonColor="#fff"
//                 textColor="#fff"
//                 isDisabled={false}
//               />
//             ) : null}
//           </ScrollView>
//         </View>
//       </ScrollView>
//       {/* Footer Buttons */}
//       {cartItems.length !== 0 ? (
//         <View style={{marginHorizontal: 10}}>
//           <TouchableOpacity
//             disabled={isKYCIncomplete}
//             onPress={handleCartCheckout}
//             style={[styles.footerBtn, {backgroundColor: '#666666'}]}>
//             <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('Home')}
//             style={[
//               styles.footerBtn,
//               {backgroundColor: '#333333', marginTop: 10},
//             ]}>
//             <Text style={styles.footerBtnText}>Continue Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
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
//   },
//   headerTitle: {fontSize: 16, fontWeight: '500', color: '#000'},
//   banner: {
//     backgroundColor: '#F6EAD9',
//     padding: 16,
//     borderRadius: 12,
//     height: 200,
//     marginBottom: 10,
//     marginHorizontal: 10,
//   },
//   bannerTitle: {fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 50},
//   bannerSubtitle: {fontSize: 12, color: '#fff', marginTop: 10},
//   upgradeBtn: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginTop: 30,
//     marginLeft: 60,
//   },
//   upgradeText: {fontWeight: '500', color: '#000'},
//   cartItem: {
//     flexDirection: 'row',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   image: {width: 70, height: 70, borderRadius: 8, marginRight: 12},
//   details: {flex: 1},
//   name: {fontSize: 16, fontWeight: '600'},
//   price: {color: '#444', marginTop: 4},
//   summary: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   summaryTitle: {fontSize: 18, fontWeight: '600', marginBottom: 12},
//   row: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6},
//   label: {fontSize: 16, color: '#555'},
//   value: {fontSize: 16, color: '#111'},
//   labelTotal: {fontSize: 18, fontWeight: 'bold'},
//   valueTotal: {fontSize: 18, fontWeight: 'bold'},
//   clearBtn: {
//     marginTop: 0,
//     padding: 10,
//     backgroundColor: '#ffe5e5',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   clearText: {color: '#cc0000', fontWeight: '600'},
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 200,
//   },
//   emptyText: {fontSize: 18, color: '#666'},
//   list: {paddingBottom: 0},
//   card: {
//     width: Dimensions.get('window').width * 0.95,
//     padding: 16,
//     borderRadius: 16,
//     minHeight: 100,
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   titleS: {fontSize: 18, fontWeight: '700', flex: 1, paddingRight: 10},
//   subtitle: {fontSize: 13, marginVertical: 10, width: '50%'},
//   iconCircle: {backgroundColor: '#ffffff20', padding: 6, borderRadius: 20},
//   button: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginTop: 35,
//   },
//   buttonText: {fontWeight: '600', fontSize: 12, color: '#000'},
//   carousel: {paddingBottom: 16, gap: 12},
//   footerBtn: {
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   footerBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
// });

// export default Cart;

// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {
//   removeFromCartAPI,
//   fetchCartAPI,
//   clearCartAPI,
//   checkoutAPI,
// } from './slices/cartSlice';
// import {fetchProfile} from './slices/profileSlice';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import Header from '../constants/Header';

// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {items: cartItems} = useSelector(state => state.cart);
//   const {data} = useSelector(state => state.profile);

//   const handleClear = () => {
//     dispatch(clearCartAPI()).then(() => dispatch(fetchCartAPI()));
//   };

//   const isKYCIncomplete = !data?.vendordocuments?.aadhaar_no;

//   useEffect(() => {
//     dispatch(fetchCartAPI());
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   const handleCartCheckout = () => {
//     cartItems.forEach(item => {
//       dispatch(
//         checkoutAPI({
//           type: 'cart_product',
//           barcode_id: item?.barcode_id,
//           cart_id: item?.cart_id,
//         }),
//       );
//     });

//     navigation.navigate('Checkout', {
//       productPrices: cartItems.map(item => item.price),
//       productQuantities: cartItems.map(item => item.quantity),
//     });
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.cartItem}>
//       <Image source={{uri: item.feature_image}} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.model}</Text>
//         <Text style={styles.name}>
//           {item.ram || '-'} / {item.rom || '-'}
//         </Text>
//         <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
//       </View>
//       <TouchableOpacity
//         onPress={() =>
//           dispatch(removeFromCartAPI(item.barcode_id)).then(() =>
//             dispatch(fetchCartAPI()),
//           )
//         }
//         style={styles.removeBtn}>
//         <Ionicons name="close" size={moderateScale(22)} color="#555" />
//         <Text style={styles.quantityText}>x{item.quantity}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const KYCStatusCard = ({
//     title,
//     subtitle,
//     buttonText,
//     icon,
//     bgColor,
//     iconColor,
//     buttonColor,
//     textColor,
//     isDisabled,
//   }) => {
//     const navigation = useNavigation();
//     return (
//       <View style={[styles.card, {backgroundColor: bgColor}]}>
//         <View style={styles.cardHeader}>
//           <Text style={[styles.titleS, {color: textColor}]}>{title}</Text>
//           <Ionicons
//             name={icon}
//             size={moderateScale(24)}
//             color={iconColor}
//             style={styles.iconCircle}
//           />
//         </View>
//         <View style={styles.cardFooter}>
//           <Text style={[styles.subtitle, {color: textColor}]}>{subtitle}</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('KycCompleteStatus')}
//             style={[styles.button, {backgroundColor: buttonColor}]}
//             disabled={isDisabled}>
//             <Text style={styles.buttonText}>{buttonText}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Header title="Cart" navigation={navigation} showBack={true} />

//         {/* Business Banner */}
//         <ImageBackground
//           source={{uri: 'https://i.postimg.cc/d0Hky5p1/Depth-3-Frame-0.png'}}
//           style={styles.banner}
//           imageStyle={{borderRadius: moderateScale(12)}}>
//           <View style={styles.bannerContent}>
//             <Text style={styles.bannerTitle}>Upgrade to{'\n'}Business Account</Text>
//             <View style={styles.bannerSubtitleContainer}>
//               <View>
//                 <Text style={styles.bannerSubtitle}>
//                   Unlock exclusive dealer pricing and
//                 </Text>
//                 <Text style={styles.bannerSubtitle}>bulk order options.</Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('UpgradeNow')}
//                 style={styles.upgradeBtn}>
//                 <Text style={styles.upgradeText}>Upgrade Now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ImageBackground>

//         <View style={{marginHorizontal: responsiveWidth(3), marginVertical: scale(5)}}>
//           {cartItems.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
//             </View>
//           ) : (
//             <>
//               <FlatList
//                 data={cartItems}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.list}
//               />
//               <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
//                 <Text style={styles.clearText}>🗑️ Clear Cart</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* KYC Section */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.carousel}>
//             {isKYCIncomplete && (
//               <KYCStatusCard
//                 title="Your KYC is pending"
//                 subtitle="Complete your KYC to place orders and unlock business account benefits."
//                 buttonText="Complete now"
//                 icon="information-circle-outline"
//                 bgColor="#00A9E0"
//                 iconColor="#fff"
//                 buttonColor="#fff"
//                 textColor="#fff"
//                 isDisabled={false}
//               />
//             )}
//           </ScrollView>
//         </View>
//               {/* Footer Buttons */}
//       {cartItems.length !== 0 && (
//         <View style={{marginHorizontal: responsiveWidth(3)}}>
//           <TouchableOpacity
//             disabled={isKYCIncomplete}
//             onPress={handleCartCheckout}
//             style={[styles.footerBtn, {backgroundColor: '#666666'}, {marginBottom: scale(5)}]}>
//             <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('Home')}
//             style={[styles.footerBtn, {backgroundColor: '#333333', marginTop: verticalScale(1)}]}>
//             <Text style={styles.footerBtnText}>Continue Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       </ScrollView>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   banner: {
//     backgroundColor: '#F6EAD9',
//     padding: moderateScale(16),
//     borderRadius: moderateScale(12),
//     height: responsiveHeight(25),
//     marginBottom: verticalScale(1),
//     marginHorizontal: responsiveWidth(3),
//     marginVertical: responsiveWidth(2),
//   },
//   bannerContent: {flex: 1, justifyContent: 'center'},
//   bannerTitle: {
//     fontSize: responsiveFontSize(2.5),
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: verticalScale(3),
//   },
//   bannerSubtitleContainer: {flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(2)},
//   bannerSubtitle: {fontSize: responsiveFontSize(1.5), color: '#fff'},
//   upgradeBtn: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-start',
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(8),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(25),
//   },
//   upgradeText: {fontWeight: '500', color: '#000', fontSize: responsiveFontSize(1.5)},
//   cartItem: {
//     flexDirection: 'row',
//     padding: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: moderateScale(10),
//     marginBottom: verticalScale(1.5),
//     marginTop:verticalScale(5),
//     alignItems: 'center',
//   },
//   image: {
//     width: responsiveWidth(18),
//     height: responsiveWidth(18),
//     borderRadius: moderateScale(8),
//     marginRight: responsiveWidth(3),
//   },
//   details: {flex: 1},
//   name: {fontSize: responsiveFontSize(1.8), fontWeight: '600'},
//   price: {color: '#444', marginTop: verticalScale(0.5), fontSize: responsiveFontSize(1.6)},
//   removeBtn: {alignItems: 'center', justifyContent: 'center', marginLeft: responsiveWidth(1)},
//   quantityText: {fontSize: responsiveFontSize(1.5), color: '#555'},
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: responsiveHeight(15),
//   },
//   emptyText: {fontSize: responsiveFontSize(2), color: '#666'},
//   list: {paddingBottom: verticalScale(1)},
//   card: {
//     width: responsiveWidth(90),
//     padding: moderateScale(16),
//     borderRadius: moderateScale(16),
//     minHeight: responsiveHeight(12),
//     justifyContent: 'space-between',
//     marginTop: verticalScale(1.5),
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   titleS: {fontSize: responsiveFontSize(2), fontWeight: '700', flex: 1, paddingRight: responsiveWidth(2)},
//   subtitle: {fontSize: responsiveFontSize(1.5), marginVertical: verticalScale(1), width: '50%'},
//   iconCircle: {backgroundColor: '#ffffff20', padding: moderateScale(6), borderRadius: moderateScale(20)},
//   cardFooter: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
//   button: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(1.5),
//     borderRadius: moderateScale(20),
//   },
//   buttonText: {fontWeight: '600', fontSize: responsiveFontSize(1.4), color: '#000'},
//   carousel: {paddingBottom: verticalScale(2), gap: responsiveWidth(3)},
//   footerBtn: {
//     paddingVertical: verticalScale(10),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     marginTop: verticalScale(1),
//   },
//   footerBtnText: {color: '#fff', fontWeight: '700', fontSize: responsiveFontSize(1.8)},
//   clearBtn: {
//     marginTop: verticalScale(1),
//     padding: moderateScale(10),
//     backgroundColor: '#ffe5e5',
//     alignItems: 'center',
//     borderRadius: moderateScale(8),
//     marginVertical: moderateScale(8),
//   },
//   clearText: {color: '#cc0000', fontWeight: '600', fontSize: responsiveFontSize(1.5)},
// });

// export default Cart;

import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCartAPI,
  fetchCartAPI,
  clearCartAPI,
  checkoutAPI,
  clearCart,
} from './slices/cartSlice';
import { fetchProfile } from './slices/profileSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../constants/Header';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import ActivityLoader from '../constants/Loader';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items: cartItems } = useSelector(state => state.cart);
  const { data, loading } = useSelector(state => state.profile);


  const handleClear = () => {
    dispatch(clearCartAPI()).then(() => dispatch(clearCart()));
  };

  const isKYCIncomplete = !data?.vendordocuments?.proof_of_identity;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCartAPI());
      dispatch(fetchProfile());
    }, [dispatch]),
  );

  const handleCartCheckout = () => {
    cartItems.forEach(item => {
      dispatch(
        checkoutAPI({
          type: 'cart_product',
          barcode_id: item?.barcode_id,
          cart_id: item?.cart_id,
        }),
      );
    });

    navigation.navigate('Checkout', {
      productPrices: cartItems.map(item => item.price),
      productQuantities: cartItems.map(item => item.quantity),
    });
  };

  // if (isKYCIncomplete) {
  //   Toast.show({
  //     type: 'error',
  //     text2: 'Please complete your KYC first.',
  //   });
  // }

  const handleCheckoutPress = () => {
    if (isKYCIncomplete) {
      Toast.show({
        type: 'error',
        text2: 'Please complete your KYC first.',
      });
      return; // stop further action
    }

    handleCartCheckout(); // proceed if KYC is complete
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.feature_image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.model}</Text>
        <Text style={styles.name}>
          {
            item.ram && item.rom
              ? `${item.ram} / ${item.rom}` // दोनों हैं → RAM / ROM
              : item.variant // नहीं हैं → सिर्फ variant
          }
        </Text>

        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        // onPress={() => dispatch(removeFromCartAPI(item.barcode_id))}
        onPress={() => {
          Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Remove',
                onPress: async () => {
                  await dispatch(removeFromCartAPI(item.barcode_id));
                  await dispatch(fetchCartAPI());
                },
              },
            ],
          );
        }}
        style={styles.removeBtn}
      >
        <Ionicons name="close" size={moderateScale(22)} color="#555" />
        <Text style={styles.quantityText}>x{item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  const KYCStatusCard = ({
    title,
    subtitle,
    buttonText,
    icon,
    bgColor,
    iconColor,
    buttonColor,
    textColor,
    isDisabled,
  }) => {
    const navigation = useNavigation();
    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.titleS, { color: textColor }]}>{title}</Text>
          <Ionicons
            name={icon}
            size={moderateScale(24)}
            color={iconColor}
            style={styles.iconCircle}
          />
        </View>
        <View style={styles.cardFooter}>
          <Text style={[styles.subtitle, { color: textColor }]}>
            {subtitle}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('KycCompleteStatus')}
            style={[styles.button, { backgroundColor: buttonColor }]}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading === true && data.length === 0) {
    return <ActivityLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          title="Cart"
          navigation={navigation}
          showBack={true}
          showSearch
        />

        {/* Business Banner */}
        {/* <ImageBackground
          source={{uri: 'https://i.postimg.cc/d0Hky5p1/Depth-3-Frame-0.png'}}
          style={styles.banner}
          imageStyle={{borderRadius: moderateScale(12)}}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Upgrade to{'\n'}Business Account</Text>
            <View style={styles.bannerSubtitleContainer}>
              <View>
                <Text style={styles.bannerSubtitle}>
                  Unlock exclusive dealer pricing and
                </Text>
                <Text style={styles.bannerSubtitle}>bulk order options.</Text>
              </View>
              <View
                onPress={() => navigation.navigate('UpgradeNow')}
                style={styles.upgradeBtn}>
                <Text style={styles.upgradeText}>Upgrade Now</Text>
              </View>
            </View>
          </View>
        </ImageBackground> */}

        <View
          style={{
            marginHorizontal: responsiveWidth(3),
            marginVertical: verticalScale(2),
          }}
        >
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyCard}>
                <View style={styles.iconCircle}>
                  <Text style={{ fontSize: responsiveFontSize(5) }}>🛒</Text>
                </View>

                <Text style={styles.emptyTitle}>Your Cart is Empty</Text>

                <Text style={styles.emptySubtitle}>
                  Looks like you haven’t added anything yet.
                </Text>

                {/* <TouchableOpacity
                  style={styles.shopBtn}
                  onPress={() => navigation.navigate('BottomNavigator')}
                >
                  <Text style={styles.shopBtnText}>Start Shopping</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.barcode_id?.toString()}
                contentContainerStyle={styles.list}
              />
            </>
          )}

          {/* KYC Section */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {isKYCIncomplete && (
              <KYCStatusCard
                title="Your KYC is pending"
                subtitle="Complete your KYC to place orders and unlock business account benefits."
                buttonText="Complete now"
                icon="information-circle-outline"
                bgColor="#00A9E0"
                iconColor="#fff"
                buttonColor="#fff"
                textColor="#fff"
                isDisabled={false}
              />
            )}
          </ScrollView>
        </View>

        {/* Footer Buttons */}
        {cartItems.length !== 0 && (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: moderateScale(10),
              bottom: 5,
            }}
          >
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.clearText}>🗑️ Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCheckoutPress}
              style={[styles.footerBtn, { backgroundColor: '#1C9C48' }]}
            >
              <Text style={styles.footerBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: {
    backgroundColor: '#F6EAD9',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    height: responsiveHeight(25),
    marginBottom: verticalScale(1),
    marginHorizontal: responsiveWidth(3),
    marginVertical: verticalScale(2),
  },
  bannerContent: { flex: 1, justifyContent: 'center' },
  bannerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: verticalScale(3),
  },
  bannerSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(2),
  },
  bannerSubtitle: { fontSize: responsiveFontSize(1.5), color: '#fff' },
  upgradeBtn: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(1.5),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(1),
  },
  upgradeText: {
    fontWeight: '500',
    color: '#000',
    fontSize: responsiveFontSize(1.5),
  },
  cartItem: {
    flexDirection: 'row',
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(1.5),
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: moderateScale(8),
    marginRight: responsiveWidth(3),
    resizeMode: 'contain',
  },
  details: { flex: 1 },
  name: { fontSize: responsiveFontSize(1.8), fontWeight: '600' },
  price: {
    color: '#444',
    marginTop: verticalScale(0.5),
    fontSize: responsiveFontSize(1.6),
  },
  removeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: responsiveWidth(1),
  },
  quantityText: { fontSize: responsiveFontSize(1.5), color: '#555' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    // backgroundColor: '#f8f9fb',
  },

  emptyCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
    alignItems: 'center',

    // Soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  iconCircle: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveHeight(6),
    backgroundColor: '#eaf3ff',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: responsiveHeight(2),
  },

  emptyTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: '#222',
    marginTop: responsiveHeight(1),
  },

  emptySubtitle: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2.5),
    lineHeight: responsiveHeight(2.5),
  },

  shopBtn: {
    backgroundColor: '#1C9C48',
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 10,

    shadowColor: '#1C9C48',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  shopBtnText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },

  list: { paddingBottom: verticalScale(1) },
  card: {
    width: responsiveWidth(90),
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    minHeight: responsiveHeight(12),
    justifyContent: 'space-between',
    marginTop: verticalScale(1.5),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleS: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.5),
    marginVertical: verticalScale(1),
    width: '50%',
  },
  iconCircle: {
    backgroundColor: '#ffffff20',
    padding: moderateScale(6),
    borderRadius: moderateScale(20),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(1.5),
    borderRadius: moderateScale(20),
  },
  buttonText: {
    fontWeight: '600',
    fontSize: responsiveFontSize(1.4),
    color: '#000',
  },
  carousel: {
    paddingBottom: verticalScale(2),
    gap: responsiveWidth(3),
    marginVertical: moderateScale(10),
  },
  footerBtn: {
    backgroundColor: '#ffe5e5',
    borderRadius: moderateScale(8),
    width: moderateScale(150),
  },
  clearBtn: {
    backgroundColor: '#ffe5e5',
    borderRadius: moderateScale(8),
    width: moderateScale(150),
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    padding: verticalScale(10),
  },
  clearText: {
    color: '#cc0000',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    padding: verticalScale(10),
  },
});

export default Cart;
