// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   View,
// //   Image,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// //   FlatList,
// //   Dimensions,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const {width} = Dimensions.get('window');

// // const RecentlyView = ({navigation}) => {
// //   const PRODUCTS = [
// //     {
// //       id: '1',
// //       image:
// //         'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
// //       name: 'Samsung Galaxy S21',
// //       color: 'Black',
// //       price: '₹20,999',
// //       originalPrice: '₹24,999',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //     {
// //       id: '2',
// //       image:
// //         'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
// //       name: 'Apple iPhone 13',
// //       color: 'Midnight',
// //       price: '₹69,900',
// //       originalPrice: '₹79,900',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //     {
// //       id: '3',
// //       image:
// //         'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
// //       name: 'OnePlus 9',
// //       color: 'Winter Mist',
// //       price: '₹44,999',
// //       originalPrice: '₹49,999',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //     {
// //       id: '4',
// //       image:
// //         'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
// //       name: 'OnePlus 9',
// //       color: 'Winter Mist',
// //       price: '₹44,999',
// //       originalPrice: '₹49,999',
// //       grade: 'A1',
// //       refurbished: true,
// //     },
// //   ];

// //   const ProductCard = ({item}) => (
// //     <View style={styles.cardD}>
// //       <View style={styles.imageContainerD}>
// //         <Image source={{uri: item.image}} style={styles.imageD} />
// //         {item.refurbished && (
// //           <Text style={styles.refurbishedLabelD}>PRE-OWNED</Text>
// //         )}
// //         <TouchableOpacity style={styles.heartIconD}>
// //           <Ionicons name="heart-outline" size={20} color="#333" />
// //         </TouchableOpacity>
// //       </View>
// //       <View style={styles.gradeBoxD}>
// //         <Text style={styles.gradeTextD}>Grade {item.grade}</Text>
// //       </View>
// //       <Text style={styles.productNameD}>{item.name}</Text>
// //       <Text style={styles.colorTextD}>● {item.color}</Text>
// //       <View style={styles.priceRowD}>
// //         <Text style={styles.priceD}>{item.price}</Text>
// //         <Text style={styles.originalPriceD}>{item.originalPrice}</Text>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {/* Scrollable content starts here */}
// //       <ScrollView>
// //         <View style={{margin: 10}}>
// //           {/* Header */}
// //           <View style={styles.header}>
// //             <TouchableOpacity
// //               onPress={() => navigation.goBack()}
// //               style={styles.backButton}>
// //               <Ionicons name="chevron-back" size={22} color="#000" />
// //             </TouchableOpacity>
// //             <View>
// //               <Text style={styles.headerTitle}>Recently Viewed</Text>
// //             </View>
// //             <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// //               <Ionicons name="search" size={24} color="#333" />
// //             </TouchableOpacity>
// //           </View>
// //           <>
// //             <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 10}}>
// //               Recently Viewed Products
// //             </Text>
// //             <FlatList
// //               data={PRODUCTS}
// //               renderItem={({item}) => <ProductCard item={item} />}
// //               keyExtractor={item => item.id}
// //               showsHorizontalScrollIndicator={false}
// //               numColumns={2}
// //               columnWrapperStyle={styles.row}
// //             />
// //           </>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {flex: 1, backgroundColor: '#fff'},
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 15,
// //     justifyContent: 'space-between',
// //     marginHorizontal: 10,
// //   },
// //   backButton: {
// //     backgroundColor: '#f5f5f5',
// //     borderRadius: 20,
// //     padding: 6,
// //     left: 0,
// //   },
// //   headerTitle: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#000',
// //     textAlign: 'center',
// //   },
// //   cardContainer: {
// //     width: (width - 36) / 2, // 2 cards per row with spacing
// //     marginBottom: 6,
// //     marginTop: 10,
// //   },

// //   cardImage: {
// //     width: '100%',
// //     height: 120,
// //     borderRadius: 12,
// //   },

// //   cardLabel: {
// //     marginTop: 8,
// //     fontSize: 14,
// //     fontWeight: '500',
// //     textAlign: 'center',
// //   },

// //   micIcon: {marginLeft: 'auto'},
// //   imagePlaceholder: {
// //     width: 100,
// //     height: 100,
// //     backgroundColor: '#eee',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 10,
// //     borderWidth: 1,
// //     borderColor: '#aaa',
// //   },
// //   imageIcon: {fontSize: 20},
// //   tabContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     borderBottomWidth: 1,
// //     paddingBottom: 10,
// //     marginTop: 10,
// //   },
// //   tabText: {fontWeight: '600', color: 'gray', fontSize: 16},
// //   activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
// //   productList: {padding: 10},
// //   productCard: {
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     margin: 5,
// //     padding: 10,
// //     alignItems: 'center',
// //     borderRadius: 10,
// //   },
// //   productName: {fontWeight: 'bold', fontSize: 14},
// //   productPrice: {fontSize: 14, color: 'gray'},
// //   timerWrapper: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 10,
// //     marginVertical: 10,
// //   },
// //   timeContainer: {
// //     alignItems: 'center',
// //   },
// //   timeBox: {
// //     backgroundColor: '#E8F5E8',
// //     paddingVertical: 20,
// //     paddingHorizontal: 25,
// //     borderRadius: 12,
// //     marginBottom: 5,
// //   },
// //   timeValue: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#000',
// //   },
// //   timeLabel: {
// //     fontSize: 14,
// //     color: '#000',
// //     fontWeight: '500',
// //   },

// //   headerButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'flex-start',
// //     gap: 12,
// //     marginVertical: 20,
// //   },
// //   sortButton: {
// //     borderWidth: 1,
// //     borderColor: '#bbb',
// //     borderRadius: 25,
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 6,
// //   },
// //   filterButton: {
// //     borderWidth: 1,
// //     borderColor: '#bbb',
// //     borderRadius: 25,
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 6,
// //   },
// //   sortText: {
// //     fontSize: 14,
// //     fontWeight: '500',
// //     color: '#000',
// //   },
// //   card_Flash: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 24,
// //     margin: 10,
// //   },
// //   leftSection: {
// //     flex: 1,
// //     paddingRight: 12,
// //   },
// //   discountText: {
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //   },
// //   name_Flash: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#222',
// //   },
// //   refurbished: {
// //     fontSize: 13,
// //     color: '#555',
// //     marginBottom: 4,
// //   },
// //   priceRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   price: {
// //     fontSize: 15,
// //     fontWeight: 'bold',
// //     color: '#222',
// //   },
// //   originalPrice: {
// //     fontSize: 13,
// //     color: '#777',
// //     textDecorationLine: 'line-through',
// //   },
// //   grade: {
// //     fontSize: 13,
// //     color: '#444',
// //     marginTop: 2,
// //   },
// //   rightSection: {
// //     width: 100,
// //     height: 100,
// //     position: 'relative',
// //   },
// //   image_Flash: {
// //     width: '100%',
// //     height: '100%',
// //     borderRadius: 12,
// //   },
// //   heartIcon: {
// //     position: 'absolute',
// //     top: 6,
// //     right: 6,
// //     backgroundColor: '#fff',
// //     padding: 5,
// //     borderRadius: 20,
// //     elevation: 2,
// //   },
// //   listContainerD: {
// //     padding: 10,
// //   },
// //   cardD: {
// //     width: 180,
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     marginRight: 15,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: {width: 0, height: 2},
// //     shadowRadius: 4,
// //     elevation: 3,
// //     marginVertical: 10,
// //   },
// //   cardM: {
// //     width: 200,
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     marginRight: 0,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: {width: 0, height: 2},
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   imageContainerD: {
// //     position: 'relative',
// //     backgroundColor: '#f4f4f4',
// //   },
// //   imageD: {
// //     width: '100%',
// //     height: 250,
// //     resizeMode: 'stretch',
// //   },
// //   imageM: {
// //     width: '90%',
// //     height: 200,
// //     resizeMode: 'stretch',
// //   },
// //   refurbishedLabelD: {
// //     position: 'absolute',
// //     alignSelf: 'center',
// //     fontSize: 12,
// //     color: '#000',
// //     backgroundColor: '#EAE6E5',
// //     width: '98%',
// //     textAlign: 'center',
// //     padding: 5,
// //   },
// //   heartIconD: {
// //     position: 'absolute',
// //     top: 25,
// //     right: 6,
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 5,
// //     elevation: 2,
// //   },
// //   badge: {
// //     position: 'absolute',
// //     left: -8,
// //     top: 10,
// //     backgroundColor: '#FF3C3C',
// //     paddingHorizontal: 6,
// //     paddingVertical: 2,
// //     borderRadius: 10,
// //   },
// //   badgeTextD: {
// //     color: '#fff',
// //     fontSize: 12,
// //     fontWeight: 'bold',
// //   },
// //   gradeBoxD: {
// //     paddingVertical: 2,
// //     position: 'absolute',
// //     marginTop: 225,
// //     alignSelf: 'center',
// //     backgroundColor: '#fff',
// //     width: '92%',
// //     borderRadius: 10,
// //     borderWidth: 0.2,
// //   },
// //   gradeTextD: {
// //     fontSize: 12,
// //     fontWeight: '500',
// //     color: '#555',
// //     textAlign: 'center',
// //   },
// //   productNameD: {
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //     marginTop: 6,
// //     marginHorizontal: 10,
// //     color: '#000',
// //   },
// //   colorTextD: {
// //     fontSize: 13,
// //     color: '#000',
// //     marginHorizontal: 10,
// //     marginTop: 2,
// //   },
// //   priceRowD: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginHorizontal: 10,
// //     marginTop: 4,
// //     marginBottom: 10,
// //   },
// //   priceD: {
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     marginRight: 6,
// //   },
// //   originalPriceD: {
// //     fontSize: 13,
// //     color: '#888',
// //     textDecorationLine: 'line-through',
// //   },

// //   cardr: {
// //     width: width * 0.4,
// //     height: 180,
// //     marginRight: 16,
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //   },
// //   imager: {
// //     borderRadius: 16,
// //   },
// //   overlayr: {
// //     // position: 'absolute',
// //     bottom: 0,
// //     width: '100%',
// //     padding: 10,
// //     // backgroundColor: 'rgba(0,0,0,0.4)',
// //   },
// //   titler: {
// //     color: '#000',
// //     fontSize: 15,
// //     fontWeight: '600',
// //   },
// //   specsr: {
// //     color: '#000',
// //     fontSize: 12,
// //     marginTop: 2,
// //   },
// // });

// // export default RecentlyView;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {addRecentlyViewed, fetchRecentlyViewed} from '../../../redux/slices/productSlice';
// import {useDispatch, useSelector} from 'react-redux';

// const {width} = Dimensions.get('window');

// const RecentlyView = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {recentlyview} = useSelector(state => state.product);

//   useEffect(() => {
//     dispatch(fetchRecentlyViewed());
//   }, [dispatch]);

//   const ProductCard = ({item}) => (
//     <TouchableOpacity
//       onPress={() => {
//         addRecentlyViewed(item.barcode_id); // Call API
//         navigation.navigate('ProductDetail', {barcode_id: item.barcode_id});
//       }}
//       style={styles.cardD}>
//       <View style={styles.imageContainerD}>
//         <Image source={{uri: item.feature_image}} style={styles.imageD} />
//         {item && <Text style={styles.refurbishedLabelD}>PRE-OWNED</Text>}
//         <TouchableOpacity style={styles.heartIconD}>
//           <Ionicons name="heart-outline" size={20} color="#333" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.gradeBoxD}>
//         <Text style={styles.gradeTextD}>Grade {item.grade_number}</Text>
//       </View>
//       <Text style={styles.productNameD}>{item.model_name}</Text>
//       <Text style={styles.colorTextD}>● {item.color_name}</Text>
//       <View style={styles.priceRowD}>
//         <Text style={styles.priceD}>{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={{margin: 10}}>
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.backButton}>
//               <Ionicons name="chevron-back" size={22} color="#000" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Recently Viewed</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//               <Ionicons name="search" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>

//           <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 10}}>
//             Recently Viewed Products
//           </Text>

//           <FlatList
//             data={recentlyview}
//             renderItem={({item}) => <ProductCard item={item} />}
//             keyExtractor={item => item.id}
//             showsHorizontalScrollIndicator={false}
//             numColumns={2}
//             columnWrapperStyle={styles.row}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// // Keep your existing styles here...
// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//   },
//   headerTitle: {fontSize: 16, fontWeight: '500', color: '#000'},
//   cardD: {
//     width: 180,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginRight: 15,
//     overflow: 'hidden',
//     marginVertical: 10,
//     elevation: 3,
//   },
//   imageContainerD: {position: 'relative', backgroundColor: '#f4f4f4'},
//   imageD: {width: '100%', height: 250, resizeMode: 'stretch'},
//   refurbishedLabelD: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontSize: 12,
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '98%',
//     textAlign: 'center',
//     padding: 5,
//   },
//   heartIconD: {
//     position: 'absolute',
//     top: 25,
//     right: 6,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 5,
//   },
//   gradeBoxD: {
//     paddingVertical: 2,
//     position: 'absolute',
//     marginTop: 225,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     width: '92%',
//     borderRadius: 10,
//     borderWidth: 0.2,
//   },
//   gradeTextD: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#555',
//     textAlign: 'center',
//   },
//   productNameD: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 6,
//     marginHorizontal: 10,
//     color: '#000',
//   },
//   colorTextD: {fontSize: 13, color: '#000', marginHorizontal: 10, marginTop: 2},
//   priceRowD: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 10,
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   priceD: {fontSize: 14, fontWeight: 'bold', color: '#000', marginRight: 6},
//   originalPriceD: {
//     fontSize: 13,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
//   row: {justifyContent: 'space-between'},
// });

// export default RecentlyView;

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchRecentlyViewed } from '../../../redux/slices/productSlice';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../../redux/slices/wishlistSlice';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  responsiveHeight as RH,
  responsiveWidth as RW,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import Header from '../../../constants/Header';
const { width, height } = Dimensions.get('window');
import { ProductCardStyles } from '../../../constants/ProductCardStyles';

// Scale function for fonts
const scaleFont = size => (size * width) / 375;

// Scale function for sizes (widths, heights)
const scaleSize = size => (size * width) / 375;

const RecentlyView = ({ navigation }) => {
  const dispatch = useDispatch();
  const { recentlyview } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchRecentlyViewed());
  }, [dispatch]);

  const ProductCard = ({ item }) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    // ✅ check product already in wishlist
    const isInWishlist = wishlistItems.some(
      w => w.barcode_id == item.barcode_id,
    );
    const handleWishlistToggle = () => {
      if (isInWishlist) {
        dispatch(removeFromWishlistAPI(item));
      } else {
        dispatch(addToWishlistAPI(item));
      }
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductList', {
            product_barcode_id: item?.barcode_id,
          })
        }
        style={ProductCardStyles.cardD}
      >
        {/* Image + Heart */}
        <View style={ProductCardStyles.imageContainerD}>
          {item && (
            <Text style={ProductCardStyles.refurbishedLabelD}>PRE-OWNED</Text>
          )}

          <Image
            source={{ uri: item.feature_image }}
            style={ProductCardStyles.imageD}
            resizeMode='contain'
          />

          {/* ❤️ Wishlist Button */}
          <TouchableOpacity
            style={ProductCardStyles.heartIconD}
            onPress={() => handleWishlistToggle()}
          >
            <AntDesign
              name={isInWishlist ? 'heart' : 'hearto'}
              size={moderateScale(20)}
              color={isInWishlist ? '#E74C3C' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* Grade Box */}
        {/* <View style={ProductCardStyles.gradeBoxD}> */}
        <Text style={ProductCardStyles.gradeTextD}>
          Grade {item.grade_number}
        </Text>
        {/* </View> */}

        {/* Product Info */}
        <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
        <View style={ProductCardStyles.priceRowD}>
          <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Recently Viewed"
        navigation={navigation}
        showBack={true}
        showSearch
      />
      <FlatList
        data={recentlyview}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
         alignSelf:'center'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(10),
    justifyContent: 'space-between',
    marginHorizontal: scaleSize(10),
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: scaleSize(20),
  },
  headerTitle: { fontWeight: '500', color: '#000' },
  gradeBoxD: {
    paddingVertical: verticalScale(2),
    position: 'absolute',
    marginTop: verticalScale(230),
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: moderateScale(10),
    borderWidth: scale(0.5),
  },

  gradeTextD: {
    fontSize: RF(1.4),
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },

  productNameD: {
    fontSize: RF(1.6),
    fontWeight: 'bold',
    marginTop: verticalScale(8),
    marginHorizontal: scale(10),
    color: '#000',
  },

  colorTextD: {
    fontSize: RF(1.5),
    color: '#000',
    marginHorizontal: scale(10),
    marginTop: verticalScale(2),
  },

  priceRowD: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(10),
  },

  priceD: {
    fontSize: RF(1.6),
    fontWeight: 'bold',
    color: '#000',
    marginRight: scale(6),
  },

  originalPriceD: {
    fontSize: RF(1.4),
    color: '#888',
    textDecorationLine: 'line-through',
  },

  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: RF(1.4),
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: moderateScale(5),
  },

  heartIconD: {
    position: 'absolute',
    top: verticalScale(30),
    right: scale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    elevation: 2,
  },

  imageContainerD: {
    position: 'relative',
    backgroundColor: '#f4f4f4',
  },

  imageD: {
    width: '100%',
    height: verticalScale(250),
    resizeMode: 'stretch',
  },

  listContainerD: {
    padding: scale(10),
  },

  cardD: {
    width: RW(45),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: scale(4),
    marginHorizontal: scale(5),
  },
});

export default RecentlyView;
