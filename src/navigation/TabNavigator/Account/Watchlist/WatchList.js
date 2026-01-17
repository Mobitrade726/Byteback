// // import React, {useEffect} from 'react';
// // import {
// //   View,
// //   FlatList,
// //   View,
// //   StyleSheet,
// //   Text,
// //   StatusBar,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Image,
// // } from 'react-native';
// // import {useSelector, useDispatch} from 'react-redux';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import {
// //   fetchWishlist,
// // } from '../../../../redux/slices/wishlistSlice';

// // const WishlistScreen = ({navigation}) => {
// //   const {items, loading} = useSelector(state => state.wishlist);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetchWishlist());
// //   }, [dispatch]);

// //   const renderItem = ({item, onRemove}) => (
// //     <View style={styles.card}>
// //       <View style={styles.row}>
// //         {/* Image & Grade */}
// //         <View style={styles.imageContainer}>
// //           <Image source={{uri: item.feature_image}} style={styles.image} />
// //           <View style={styles.gradeTag}>
// //             <Text style={styles.gradeText}>
// //               {item.grade_number ? item.grade_number : 'N/A'}
// //             </Text>
// //           </View>
// //         </View>

// //         {/* Details */}
// //         <View style={styles.detailsContainer}>
// //           <View style={styles.titleRow}>
// //             <Text style={styles.title}>{item.model_name}</Text>

// //             {/* Heart Button */}
// //             <TouchableOpacity
// //               style={styles.heartBtn}
// //               onPress={() => onRemove && onRemove(item.id)} // ✅ Check if function exists
// //             >
// //               <AntDesign name="heart" size={16} color="#E74C3C" />
// //             </TouchableOpacity>
// //           </View>

// //           <Text style={styles.subtitle}>PRE-OWNED</Text>
// //           <Text style={styles.specs}>
// //             {item?.os_name === 'iOS' || item?.os_name === 'Android' ? (
// //               <>
// //                 {item?.variant_name ? item.variant_name : 'N/A'} ●
// //                 {item?.color_name ? item?.color_name : 'N/A'}
// //               </>
// //             ) : (
// //               <>
// //                 {item?.ram ? item.ram : 'N/A'}/
// //                 {item?.storage ? item.storage : 'N/A'}
// //               </>
// //             )}
// //           </Text>
// //           <View style={styles.priceRow}>
// //             <Text style={styles.price}>₹ {item.price}</Text>
// //           </View>

// //           {/* <Text style={styles.warranty}>{data.warranty}</Text> */}

// //           {/* Compare Button */}
// //           <TouchableOpacity style={styles.compareBtn}>
// //             <Ionicons name="cart-outline" size={14} color="#333" />
// //             <Text style={styles.compareText}>Move to Cart</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       {/* Move to Cart */}
// //       {/* <TouchableOpacity style={styles.cartBtn}>
// //             <Ionicons name="cart-outline" size={16} color="#fff" />
// //             <Text style={styles.cartText}>Move to Cart</Text>
// //           </TouchableOpacity> */}
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.backButton}>
// //           <Ionicons name="chevron-back" size={22} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>My Wishlist</Text>
// //       </View>

// //       {/* Loader */}
// //       {loading && (
// //         <ActivityIndicator size="large" color="#000" style={{marginTop: 20}} />
// //       )}

// //       {/* If empty */}
// //       {!loading && items.length === 0 ? (
// //         <View style={styles.emptyContainer}>
// //           <Text style={styles.emptyText}>No items in wishlist</Text>
// //         </View>
// //       ) : (
// //         <FlatList
// //           data={items}
// //           renderItem={renderItem}
// //           keyExtractor={item => item.id?.toString()}
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={{paddingBottom: 80}}
// //         />
// //       )}

// //       {/* Bottom Button */}
// //       {/* <TouchableOpacity
// //         onPress={() => navigation.navigate("SubWatchList")}
// //         style={styles.bottomButton}>
// //         <Text style={styles.continueText}>Continue Shopping</Text>
// //       </TouchableOpacity> */}
// //     </View>
// //   );
// // };

// // export default WishlistScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     paddingTop: StatusBar.currentHeight || 10,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingVertical: 10,
// //     position: 'relative',
// //     height: 50,
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     left: 15,
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 6,
// //     elevation: 3,
// //   },
// //   headerTitle: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#000',
// //     textAlign: 'center',
// //   },
// //   emptyContainer: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   emptyText: {
// //     fontSize: 16,
// //     color: '#888',
// //   },
// //   bottomButton: {
// //     backgroundColor: '#1C1C1C',
// //     paddingVertical: 16,
// //     margin: 14,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   continueText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     marginHorizontal: 14,
// //     marginBottom: 16,
// //     padding: 10,
// //     borderRadius: 16,
// //     elevation: 4,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     borderWidth: 0.5,
// //   },
// //   row: {flexDirection: 'row'},
// //   imageContainer: {
// //     width: 140,
// //     height: 140,
// //     borderRadius: 8,
// //     overflow: 'hidden',
// //     position: 'relative',
// //   },
// //   image: {width: '100%', height: '100%', resizeMode: 'stretch'},
// //   gradeTag: {
// //     position: 'absolute',
// //     bottom: 2,
// //     alignSelf: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 7,
// //     paddingHorizontal: 12,
// //     paddingVertical: 4,
// //     elevation: 2,
// //     width: '98%',
// //   },
// //   gradeText: {fontWeight: '600', fontSize: 12, textAlign: 'center'},
// //   detailsContainer: {
// //     flex: 1,
// //     paddingLeft: 12,
// //     justifyContent: 'space-between',
// //   },
// //   titleRow: {flexDirection: 'row', justifyContent: 'space-between'},
// //   title: {fontWeight: 'bold', fontSize: 14, flex: 1, paddingRight: 20},
// //   heartBtn: {
// //     position: 'absolute',
// //     top: -4,
// //     right: -0,
// //     backgroundColor: '#fff',
// //     padding: 6,
// //     borderRadius: 20,
// //     elevation: 15,
// //   },
// //   subtitle: {fontSize: 12, color: '#777', marginTop: 2},
// //   specs: {fontSize: 12, marginTop: 6},
// //   priceRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //     marginTop: 6,
// //   },
// //   price: {fontWeight: 'bold', fontSize: 16, color: '#000'},
// //   originalPrice: {
// //     fontSize: 13,
// //     color: '#999',
// //     textDecorationLine: 'line-through',
// //   },
// //   warranty: {fontSize: 12, color: '#777', marginTop: 4},
// //   compareBtn: {
// //     flexDirection: 'row',
// //     borderColor: '#666666',
// //     borderWidth: 2,
// //     borderRadius: 20,
// //     paddingVertical: 6,
// //     paddingHorizontal: 16,
// //     marginTop: 8,
// //     gap: 6,
// //     justifyContent: 'center',
// //     width: '70%',
// //   },
// //   compareText: {fontSize: 12, color: '#333'},
// //   cartBtn: {
// //     marginTop: 12,
// //     backgroundColor: '#1C1C1C',
// //     paddingVertical: 12,
// //     borderRadius: 10,
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   cartText: {color: '#fff', fontWeight: '600'},
// // });

// import React, {useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   View,
//   StyleSheet,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {
//   fetchWishlist,
//   removeFromWishlistAPI,
// } from '../../../../redux/slices/wishlistSlice';
// import Header from '../../../../constants/Header';

// const WishlistScreen = ({navigation}) => {
//   const {items, loading} = useSelector(state => state.wishlist);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   // ⭐ Remove Item Function (API + Redux Update)
//   const handleRemove = item => {
//     dispatch(removeFromWishlistAPI(item));
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.card}>
//       <View style={styles.row}>
//         {/* Image */}
//         <View style={styles.imageContainer}>
//           <Image source={{uri: item.feature_image}} style={styles.image} />
//           <View style={styles.gradeTag}>
//             <Text style={styles.gradeText}>
//               {item.grade_number ? item.grade_number : 'N/A'}
//             </Text>
//           </View>
//         </View>

//         {/* Details */}
//         <View style={styles.detailsContainer}>
//           <View style={styles.titleRow}>
//             <Text style={styles.title}>{item.model_name}</Text>

//             {/* ❤️ Remove From Wishlist */}
//             <TouchableOpacity
//               style={styles.heartBtn}
//               onPress={() => handleRemove(item)}>
//               <AntDesign name="heart" size={16} color="#E74C3C" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.subtitle}>PRE-OWNED</Text>
//           <Text style={styles.specs}>
//             {item?.variant_name ? item.variant_name : 'N/A'} ●
//             {item?.color_name ? item.color_name : 'N/A'}
//           </Text>

//           <View style={styles.priceRow}>
//             <Text style={styles.price}>₹ {item.price}</Text>
//           </View>

//           {/* Move to Cart */}
//           <TouchableOpacity style={styles.compareBtn}>
//             <Ionicons name="cart-outline" size={14} color="#333" />
//             <Text style={styles.compareText}>Move to Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Header title="My Wishlist" navigation={navigation} showBack={true} showSearch={true} />

//       {/* Loader */}
//       {loading && (
//         <ActivityIndicator size="large" color="#000" style={{marginTop: 20}} />
//       )}

//       {/* Empty */}
//       {!loading && items.length === 0 ? (
//         // <View style={styles.emptyContainer}>
//         //   <Text style={styles.emptyText}>No items in wishlist</Text>
//         // </View>
//         <View style={styles.emptyCard}>
//           <Image
//             source={require('../../../../../assets/images/wishlist.png')}
//             style={styles.emptyImg}
//           />

//           <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
//           <Text style={styles.emptySubtitle}>
//             Add items you like and revisit them anytime.
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={items}
//           renderItem={renderItem}
//           keyExtractor={item => item.id?.toString()}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom: 80}}
//         />
//       )}
//     </View>
//   );
// };

// export default WishlistScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     position: 'relative',
//     height: 50,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 15,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     elevation: 3,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//   },
//   emptyCard: {
//     margin: 20,
//     padding: 20,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },

//   emptyImg: {
//     width: 180,
//     height: 180,
//     resizeMode: 'contain',
//     marginBottom: 20,
//     opacity: 0.9,
//   },

//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1C1C1C',
//     marginBottom: 6,
//   },

//   emptySubtitle: {
//     fontSize: 14,
//     color: '#777',
//     textAlign: 'center',
//     marginBottom: 20,
//     width: '80%',
//   },

//   shopNowBtn: {
//     backgroundColor: '#1C1C1C',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//     elevation: 4,
//   },

//   shopNowText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },

//   bottomButton: {
//     backgroundColor: '#1C1C1C',
//     paddingVertical: 16,
//     margin: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 14,
//     marginVertical: 8,
//     padding: 10,
//     borderRadius: 16,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     borderWidth: 0.5,
//   },
//   row: {flexDirection: 'row'},
//   imageContainer: {
//     width: 140,
//     height: 140,
//     borderRadius: 8,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   image: {width: '100%', height: '100%', resizeMode: 'stretch'},
//   gradeTag: {
//     position: 'absolute',
//     bottom: 2,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 7,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     elevation: 2,
//     width: '98%',
//   },
//   gradeText: {fontWeight: '600', fontSize: 12, textAlign: 'center'},
//   detailsContainer: {
//     flex: 1,
//     paddingLeft: 12,
//     justifyContent: 'space-between',
//   },
//   titleRow: {flexDirection: 'row', justifyContent: 'space-between'},
//   title: {fontWeight: 'bold', fontSize: 14, flex: 1, paddingRight: 20},
//   heartBtn: {
//     position: 'absolute',
//     top: -4,
//     right: -0,
//     backgroundColor: '#fff',
//     padding: 6,
//     borderRadius: 20,
//     elevation: 15,
//   },
//   subtitle: {fontSize: 12, color: '#777', marginTop: 2},
//   specs: {fontSize: 12, marginTop: 6},
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 6,
//   },
//   price: {fontWeight: 'bold', fontSize: 16, color: '#000'},
//   originalPrice: {
//     fontSize: 13,
//     color: '#999',
//     textDecorationLine: 'line-through',
//   },
//   warranty: {fontSize: 12, color: '#777', marginTop: 4},
//   compareBtn: {
//     flexDirection: 'row',
//     borderColor: '#666666',
//     borderWidth: 2,
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     marginTop: 8,
//     gap: 6,
//     justifyContent: 'center',
//     width: '70%',
//   },
//   compareText: {fontSize: 12, color: '#333'},
//   cartBtn: {
//     marginTop: 12,
//     backgroundColor: '#1C1C1C',
//     paddingVertical: 12,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 8,
//   },
//   cartText: {color: '#fff', fontWeight: '600'},
// });

import React, { useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  fetchWishlist,
  removeFromWishlistAPI,
} from '../../../../redux/slices/wishlistSlice';
import Header from '../../../../constants/Header';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ActivityLoader from '../../../../constants/Loader';
import { addToCartAPI, fetchCartAPI } from '../../../../redux/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import responsive from '../../../../constants/responsive';

const WishlistScreen = ({ navigation }) => {
  const { items, loading } = useSelector(state => state.wishlist);
  const { items: cartItems } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCartAPI());
      dispatch(fetchWishlist());
    }, [dispatch]),
  );

  // useEffect(() => {
  //   dispatch(fetchWishlist());
  //   dispatch(fetchCartAPI());
  // }, [dispatch]);

  const handleRemove = item => {
    dispatch(removeFromWishlistAPI(item));
  };

  const renderItem = ({ item }) => (
    <>
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={
                item?.feature_image
                  ? { uri: item.feature_image }
                  : require('../../../../../assets/images/empty.jpeg')
              }
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.gradeTag}>
              <Text style={styles.gradeText}>
                <Text style={{ color: '#666666' }}>Grade</Text>{' '}
                {item.grade_number ? item.grade_number : 'N/A'}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.model_name}</Text>

              {/* ❤️ Remove From Wishlist */}
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => handleRemove(item)}
              >
                <AntDesign
                  name="heart"
                  size={moderateScale(16)}
                  color="#E74C3C"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.preowned}>(PRE-OWNED)</Text>
            <Text style={styles.specs}>
              {item?.variant_name ? item.variant_name : item?.storage} ●{' '}
              {item?.color_name ? item.color_name : '--'}
            </Text>

            <Text style={styles.price}>₹ {item.price}</Text>
            <Text style={styles.warrenty}>30-day warranty</Text>

            {/*  Campare */}
            <View style={{marginTop: responsive.marginTop(10)}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderWidth: moderateScale(1),
                  paddingVertical: moderateScale(3),
                  paddingHorizontal: moderateScale(10),
                  borderRadius: moderateScale(10), borderColor:"#666666", alignItems:'center', justifyContent:'center'
                }}
              >
                <Ionicons name="swap-horizontal" size={moderateScale(10)} color="#666666" />
                <Text style={styles.compareText}>Compare</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Move to Cart */}
        <TouchableOpacity style={{marginTop: responsive.marginTop(3)}}
          onPress={() => {
            const wishlistproduct = {
              barcode_id: item.barcode_id,
              user_id: item?.user_id,
              quantity: 1,
              price: item.price,
            };

            const exists = cartItems.some(
              c => String(c.barcode_id) === String(item.barcode_id),
            );

            if (exists) {
              Toast.show({
                type: 'error',
                text1: 'Already in Cart',
                text2: `${item.model_name} is already added.`,
              });
              return; // ❌ DO NOT NAVIGATE
            }
            dispatch(
              addToCartAPI({
                product: null, // product screen se nhi
                wishlistproduct: wishlistproduct, // yahi wishlist ka data hai
                navigation, // agar chaiye
              }),
            );
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#333333',
              borderWidth: moderateScale(1),
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(10),
              borderRadius: moderateScale(10), justifyContent:'center'
            }}
          >
            <Ionicons name="cart-outline" size={moderateScale(10)} color="#FFFBFA" />
            <Text style={styles.movetocart}>Move to Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="My Wishlist"
        navigation={navigation}
        showBack={true}
        showSearch={true}
      />

      {/* Empty */}
      {!loading && items.length === 0 ? (
        <View style={styles.emptyCard}>
          <Image
            source={require('../../../../../assets/images/wishlist.png')}
            style={styles.emptyImg}
          />

          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items you like and revisit them anytime.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
        />
      )}
      {/* Loader */}
      {loading && <ActivityLoader />}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFA',
  },
  emptyCard: {
    margin: responsiveWidth(5),
    padding: responsiveWidth(5),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: responsiveWidth(45),
    height: responsiveWidth(45),
    resizeMode: 'contain',
    marginBottom: responsiveHeight(2),
    opacity: 0.9,
  },
  emptyTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: verticalScale(4),
  },
  emptySubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#777',
    textAlign: 'center',
    marginBottom: verticalScale(2),
    width: '80%',
  },
  card: {
    backgroundColor: '#FFFBFA',
    marginHorizontal: responsiveWidth(3.5),
    marginVertical: verticalScale(6),
    padding: moderateScale(8),
    borderRadius: moderateScale(8),

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 8,

    // Optional (clean look)
    borderWidth: 1,
    borderColor: '#eee',
  },

  row: {
    flexDirection: 'row',
    marginBottom: responsive.marginBottom(5),
    backgroundColor: '#FFFBFA',
  },
  imageContainer: {
    borderRadius: responsive.borderRadius(8),
    overflow: 'hidden',
    position: 'relative', // 🔥 required for overlay
    borderWidth: 0,
    borderColor: '#f1f1f1',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 8,
  },

  image: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
  },
  gradeTag: {
    position: 'absolute',
    bottom: verticalScale(0),
    alignSelf: 'center',
    backgroundColor: '#FFFBFA',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: responsive.borderRadius(8),
    padding: responsive.padding(1),
    borderColor: '#FFFBFA',
  },
  gradeText: {
    fontWeight: '600',
    fontSize: responsive.fontSize(10),
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    marginTop: responsive.marginTop(10),
  },
  titleRow: { flexDirection: 'row' },
  title: {
    fontWeight: 'bold',
    fontSize: responsive.fontSize(14),
    flex: 1,
    paddingRight: responsiveWidth(3),
  },
  heartBtn: {
    position: 'absolute',
    top: verticalScale(-4),
    right: 0,
    backgroundColor: '#fff',
    padding: moderateScale(6),
    borderRadius: moderateScale(20),
    elevation: 6,
  },
  subtitle: {
    fontSize: responsive.fontSize(8),
    color: '#777',
  },
  preowned: {
    fontSize: responsive.fontSize(8),
    color: '#777',
    marginBottom: responsive.marginBottom(8), marginTop: responsive.marginTop(3)
  },
  specs: {
    fontSize: responsive.fontSize(11),
    marginBottom: responsive.marginBottom(5),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: responsive.fontSize(16),
    color: '#000',
    marginBottom: responsive.marginBottom(5),
  },
  warrenty: {
    fontSize: responsive.fontSize(10),
    color: '#666666',
  },
  movetocart: {
    fontSize: responsive.fontSize(11),
    color: '#FFFBFA',
    textAlign: 'center', marginLeft:5, 
  },
  compareText: {
    fontSize: responsive.fontSize(11),
    color: '#666666',
    textAlign: 'center',  marginLeft:5
  },
});
