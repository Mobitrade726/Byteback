// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlistAPI,
//   removeFromWishlistAPI,
//   fetchWishlist,
// } from '../../../redux/slices/wishlistSlice';
// import { fetchProductList } from '../../../redux/slices/productSlice';
// import Header from '../../../constants/Header';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import {
//   responsiveHeight as RH,
//   responsiveWidth as RW,
//   responsiveFontSize as RF,
// } from 'react-native-responsive-dimensions';
// import { ProductCardStyles } from '../../../constants/ProductCardStyles';

// const { width } = Dimensions.get('window');

// const budgetOptions = [
//   { id: 1, label: 'Under ₹10,000' },
//   { id: 2, label: '₹10,000 - ₹20,000' },
//   { id: 3, label: '₹20,000 - ₹30,000' },
//   { id: 4, label: 'Above ₹30,000' },
// ];

// const ShopByBudget = ({ navigation }) => {
//   const route = useRoute();
//   const { osName, catId, priceId, catName, rangeLabel } = route.params || {};
//   const { catList } = useSelector(state => state.home);
//   const [selectedOS, setSelectedOS] = useState(osList?.[0]?.os_name || null);
//   const [selectedPriceRange, setSelectedPriceRange] = useState(rangeLabel);

//   const dispatch = useDispatch();
//   const { productData } = useSelector(state => state.product);
//   const wishlistItems = useSelector(state => state.wishlist.items);

// const selectedCategoryData = catList.find(
//   item => item.category_name === catName,
// );

//   const osList = selectedCategoryData?.os_list || [];

//   // Fetch wishlist and products
//   useEffect(() => {
//     dispatch(fetchWishlist());
//     dispatch(fetchProductList());
//   }, [dispatch]);

//   // Filter products by selected OS
//   const filteredByOS = useMemo(() => {
//     if (!selectedOS) return productData || [];
//     return productData.filter(
//       item =>
//         item.operating_systems &&
//         item.operating_systems.toLowerCase() === selectedOS.toLowerCase(),
//     );
//   }, [selectedOS, productData]);

//   // Filter products by selected price range
//   const finalFilteredProducts = useMemo(() => {
//     if (!filteredByOS || filteredByOS.length === 0) return [];

//     switch (selectedPriceRange) {
//       case 'Under ₹10,000':
//         return filteredByOS.filter(item => parseFloat(item.price) < 10000);
//       case '₹10,000 - ₹20,000':
//         return filteredByOS.filter(
//           item =>
//             parseFloat(item.price) >= 10000 && parseFloat(item.price) <= 20000,
//         );
//       case '₹20,000 - ₹30,000':
//         return filteredByOS.filter(
//           item =>
//             parseFloat(item.price) > 20000 && parseFloat(item.price) <= 30000,
//         );
//       case 'Above ₹30,000':
//         return filteredByOS.filter(item => parseFloat(item.price) > 30000);
//       default:
//         return filteredByOS;
//     }
//   }, [selectedPriceRange, filteredByOS]);

//   // Product card component
//   const ProductCard = ({ item }) => {
//     const isInWishlist = wishlistItems.some(
//       w => w.barcode_id === item.barcode_id,
//     );

//     const handleWishlistToggle = () => {
//       if (isInWishlist) dispatch(removeFromWishlistAPI(item));
//       else dispatch(addToWishlistAPI(item));
//     };

//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             product_barcode_id: item?.barcode_id,
//           })
//         }
//         style={ProductCardStyles.cardD}
//       >
//         <View style={ProductCardStyles.imageContainerD}>
//           {item && (
//             <Text style={ProductCardStyles.refurbishedLabelD}>
//               PRE-OWNED
//             </Text>
//           )}

//           <Image
//             source={{ uri: item.feature_image }}
//             style={ProductCardStyles.imageD}
//           />

//           <TouchableOpacity
//             style={ProductCardStyles.heartIconD}
//             onPress={handleWishlistToggle}
//           >
//             <AntDesign
//               name={isInWishlist ? 'heart' : 'hearto'}
//               size={moderateScale(20)}
//               color={isInWishlist ? '#E74C3C' : '#999'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* <View style={ProductCardStyles.gradeBoxD}> */}
//         <Text style={ProductCardStyles.gradeTextD}>
//           Grade {item.grade_number}
//         </Text>
//         {/* </View> */}

//         <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
//         <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
//         <View style={ProductCardStyles.priceRowD}>
//           <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Shop by Budget"
//         navigation={navigation}
//         showBack
//         showSearch
//       />
//       <ScrollView>
//         {/* Category Name */}
//         {/* <Text
//           style={{
//             fontWeight: 'bold',
//             marginBottom: verticalScale(10),
//             marginLeft: scale(15),
//             fontSize: moderateScale(16),
//           }}
//         >
//           {catName}
//         </Text> */}

//         {/* OS Pills */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.container_shop}
//         >
//           {osList?.map((os, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.pill_shop,
//                 selectedOS === os.os_name
//                   ? styles.pillSelected_shop
//                   : styles.pillUnselected_shop,
//               ]}
//               onPress={() => setSelectedOS(os.os_name)}
//             >
//               <Text
//                 style={[
//                   styles.pillText_shop,
//                   selectedOS === os.os_name
//                     ? styles.textSelected_shop
//                     : styles.textUnselected_shop,
//                 ]}
//               >
//                 {os.os_name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Price Range Pills */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.container_shop}
//         >
//           {budgetOptions.map((range, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.pill_shop,
//                 selectedPriceRange === range.label
//                   ? styles.pillSelected_shop
//                   : styles.pillUnselected_shop,
//               ]}
//               onPress={() => setSelectedPriceRange(range.label)}
//             >
//               <Text
//                 style={[
//                   styles.pillText_shop,
//                   selectedPriceRange === range.label
//                     ? styles.textSelected_shop
//                     : styles.textUnselected_shop,
//                 ]}
//               >
//                 {range.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Products List */}
//         {finalFilteredProducts.length > 0 ? (
//           <FlatList
//             data={finalFilteredProducts}
//             renderItem={({ item }) => <ProductCard item={item} />}
//             keyExtractor={(item, index) =>
//               item.id?.toString() ?? index.toString()
//             }
//             numColumns={2}
//             contentContainerStyle={{
//               paddingHorizontal: moderateScale(10),
//               paddingBottom: moderateScale(80),
//               justifyContent:
//                 finalFilteredProducts.length === 1
//                   ? 'flex-start'
//                   : 'space-between',
//             }}
//           />
//         ) : (
//           <View style={{ alignItems: 'center', marginTop: verticalScale(60) }}>
//             <Ionicons
//               name="alert-circle-outline"
//               size={moderateScale(50)}
//               color="#777"
//             />
//             <Text
//               style={{
//                 fontSize: moderateScale(16),
//                 color: '#777',
//                 marginTop: verticalScale(10),
//               }}
//             >
//               No products available in this range.
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#fff', flex: 1 },

//   container_shop: {
//     paddingHorizontal: scale(10),
//     marginBottom: verticalScale(10),
//   },
//   pill_shop: {
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(16),
//     borderRadius: scale(20),
//     marginRight: scale(10),
//   },
//   pillSelected_shop: { backgroundColor: '#4B4B4B' },
//   pillUnselected_shop: { backgroundColor: '#EFECEC' },
//   pillText_shop: { fontSize: moderateScale(14), fontWeight: '600' },
//   textSelected_shop: { color: 'white' },
//   textUnselected_shop: { color: '#222' },

//   gradeBoxD: {
//     paddingVertical: verticalScale(2),
//     position: 'absolute',
//     marginTop: verticalScale(230),
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     width: '100%',
//     borderRadius: moderateScale(10),
//     borderWidth: scale(0.2),
//   },

//   gradeTextD: {
//     fontSize: RF(1.4),
//     fontWeight: '500',
//     color: '#555',
//     textAlign: 'center',
//   },

//   productNameD: {
//     fontSize: RF(1.6),
//     fontWeight: 'bold',
//     marginTop: verticalScale(6),
//     marginHorizontal: scale(10),
//     color: '#000',
//   },

//   colorTextD: {
//     fontSize: RF(1.5),
//     color: '#000',
//     marginHorizontal: scale(10),
//     marginTop: verticalScale(2),
//   },

//   priceRowD: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: scale(10),
//     marginTop: verticalScale(4),
//     marginBottom: verticalScale(10),
//   },

//   priceD: {
//     fontSize: RF(1.6),
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: scale(6),
//   },

//   originalPriceD: {
//     fontSize: RF(1.4),
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },

//   refurbishedLabelD: {
//     alignSelf: 'center',
//     fontSize: RF(1.4),
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '100%',
//     textAlign: 'center',
//     padding: moderateScale(5),
//   },

//   heartIconD: {
//     position: 'absolute',
//     top: verticalScale(30),
//     right: scale(6),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(20),
//     padding: moderateScale(5),
//     elevation: 2,
//   },

//   imageContainerD: { position: 'relative' },

//   imageD: {
//     width: '100%',
//     height: verticalScale(90),
//     resizeMode: 'contain',
//     backgroundColor: '#fff',
//   },

//   listContainerD: {
//     padding: scale(10),
//   },

//   cardD: {
//     width: width / 2.2,
//     borderRadius: moderateScale(12),
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowRadius: moderateScale(4),
//     marginHorizontal: moderateScale(5),
//     marginVertical: moderateScale(5),
//     borderWidth: moderateScale(0.5),
//   },
// });

// export default ShopByBudget;

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import { useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlistAPI,
//   removeFromWishlistAPI,
//   fetchWishlist,
// } from '../../../redux/slices/wishlistSlice';
// import { fetchProductList, loading } from '../../../redux/slices/productSlice';
// import Header from '../../../constants/Header';
// import { ProductCardStyles } from '../../../constants/ProductCardStyles';
// import { moderateScale } from 'react-native-size-matters';

// const budgetOptions = [
//   { id: 1, label: 'Under ₹10,000' },
//   { id: 2, label: '₹10,000 - ₹20,000' },
//   { id: 3, label: '₹20,000 - ₹30,000' },
//   { id: 4, label: 'Above ₹30,000' },
// ];

// const HomeShopByBudget = ({ navigation }) => {
//   const route = useRoute();
//   const {
//     budget,
//     osname,
//     arrayosname,
//     priceId,
//     rangeLabel,
//     rangeLabeldefault,
//   } = route.params || {};
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selected, setSelected] = useState(rangeLabel || rangeLabeldefault);
//   const dispatch = useDispatch();
//   const { productData } = useSelector(state => state.product);
//   const wishlistItems = useSelector(state => state.wishlist.items);

//   // Set selected budget from route param
//   useEffect(() => {
//     if (priceId) {
//       const selectedBudget = budgetOptions.find(item => item.id === priceId);
//       if (selectedBudget) setSelected(selectedBudget.label);
//     }
//     if (budget) setSelected(budget);
//   }, [priceId, budget]);

//   useEffect(() => {
//     dispatch(fetchWishlist()); // fetch wishlist on screen load
//     dispatch(fetchProductList()); // fetch wishlist on screen load
//   }, [dispatch]);

//   // Filter products by OS
//   const products = useMemo(() => {
//     if (!productData || productData.length === 0) return [];

//     if (arrayosname && Array.isArray(arrayosname) && arrayosname.length > 0) {
//       return productData.filter(item =>
//         arrayosname.some(
//           os =>
//             item.operating_systems &&
//             String(item.operating_systems).toLowerCase() ===
//               String(os).toLowerCase(),
//         ),
//       );
//     }
//     if (osname) {
//       return productData.filter(
//         item =>
//           item.operating_systems &&
//           String(item.operating_systems).toLowerCase() ===
//             String(osname).toLowerCase(),
//       );
//     }
//     return productData;
//   }, [productData, osname, arrayosname]);

//   // Filter by price
//   useEffect(() => {
//     if (!products || products.length === 0) {
//       setFilteredProducts([]);
//       return;
//     }

//     let filtered = [];
//     switch (selected) {
//       case 'Under ₹10,000':
//         filtered = products.filter(item => parseFloat(item.price) < 10000);
//         break;
//       case '₹10,000 - ₹20,000':
//         filtered = products.filter(
//           item =>
//             parseFloat(item.price) >= 10000 && parseFloat(item.price) <= 20000,
//         );
//         break;
//       case '₹20,000 - ₹30,000':
//         filtered = products.filter(
//           item =>
//             parseFloat(item.price) > 20000 && parseFloat(item.price) <= 30000,
//         );
//         break;
//       case 'Above ₹30,000':
//         filtered = products.filter(item => parseFloat(item.price) > 30000);
//         break;
//     }
//     setFilteredProducts(filtered);
//   }, [selected, products]);

//   // Product card component
//   const ProductCardFilter = ({ item }) => {
//     const isInWishlist = wishlistItems.some(
//       w => w.barcode_id === item.barcode_id,
//     );

//     const handleWishlistToggle = () => {
//       if (isInWishlist) dispatch(removeFromWishlistAPI(item));
//       else dispatch(addToWishlistAPI(item));
//     };

//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             product_barcode_id: item?.barcode_id,
//           })
//         }
//         style={ProductCardStyles.cardD}
//       >
//         <View style={ProductCardStyles.imageContainerD}>
//           {item && (
//             <Text style={ProductCardStyles.refurbishedLabelD}>
//               PRE-OWNED
//             </Text>
//           )}

//           <Image
//             source={{ uri: item.feature_image }}
//             style={ProductCardStyles.imageD}
//           />

//           <TouchableOpacity
//             style={ProductCardStyles.heartIconD}
//             onPress={handleWishlistToggle}
//           >
//             <AntDesign
//               name={isInWishlist ? 'heart' : 'hearto'}
//               size={20}
//               color={isInWishlist ? '#E74C3C' : '#999'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* <View style={ProductCardStyles.gradeBoxD}> */}
//         <Text style={ProductCardStyles.gradeTextD}>
//           Grade {item.grade_number}
//         </Text>
//         {/* </View> */}

//         <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
//         <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
//         <View style={ProductCardStyles.priceRowD}>
//           <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // return (
//   //   <View style={styles.container}>
//   //     <ScrollView>
//   //       <Header
//   //         title="Shop by Budget"
//   //         navigation={navigation}
//   //         showBack={true}
//   //       />
//   //       <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 15 }}>
//   //         {osname}
//   //       </Text>

//   //       {/* Price Range Pills */}
//   //       <ScrollView
//   //         horizontal
//   //         showsHorizontalScrollIndicator={false}
//   //         style={styles.container_shop}
//   //       >
//   //         {budgetOptions.map((range, index) => (
//   //           <TouchableOpacity
//   //             key={index}
//   //             style={[
//   //               styles.pill_shop,
//   //               selected === range.label
//   //                 ? styles.pillSelected_shop
//   //                 : styles.pillUnselected_shop,
//   //             ]}
//   //             onPress={() => setSelected(range.label)}
//   //           >
//   //             <Text
//   //               style={[
//   //                 styles.pillText_shop,
//   //                 selected === range.label
//   //                   ? styles.textSelected_shop
//   //                   : styles.textUnselected_shop,
//   //               ]}
//   //             >
//   //               {range.label}
//   //             </Text>
//   //           </TouchableOpacity>
//   //         ))}
//   //       </ScrollView>

//   //       {/* Product List */}
//   //       {filteredProducts.length > 0 ? (
//   //         <FlatList
//   //           data={filteredProducts}
//   //           renderItem={({ item }) => <ProductCardFilter item={item} />}
//   //           keyExtractor={(item, index) =>
//   //             item.id?.toString() ?? index.toString()
//   //           }
//   //           numColumns={2}
//   //           contentContainerStyle={{
//   //             paddingHorizontal: moderateScale(15),
//   //             paddingBottom: moderateScale(80),
//   //             justifyContent:
//   //               filteredProducts.length === 1 ? 'flex-start' : 'space-between',
//   //           }}
//   //         />
//   //       ) : (
//   //         <View style={{ alignItems: 'center', marginTop: 60 }}>
//   //           <Ionicons name="alert-circle-outline" size={50} color="#777" />
//   //           <Text style={{ fontSize: 16, color: '#777', marginTop: 10 }}>
//   //             No products available in this range.
//   //           </Text>
//   //         </View>
//   //       )}
//   //     </ScrollView>
//   //   </View>
//   // );
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={filteredProducts}
//         keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
//         numColumns={2}
//         renderItem={({ item }) => <ProductCardFilter item={item} />}
//         contentContainerStyle={{
//           paddingHorizontal: moderateScale(15),
//           paddingBottom: moderateScale(80),
//         }}
//         ListHeaderComponent={
//           <>
//             <Header
//               title="Shop by Budget"
//               navigation={navigation}
//               showBack={true}
//             />

//             {osname ? <Text style={styles.osText}>{osname}</Text> : null}

//             {/* Budget Pills */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.container_shop}
//             >
//               {budgetOptions.map(range => (
//                 <TouchableOpacity
//                   key={range.id}
//                   style={[
//                     styles.pill_shop,
//                     selected === range.label
//                       ? styles.pillSelected_shop
//                       : styles.pillUnselected_shop,
//                   ]}
//                   onPress={() => setSelected(range.label)}
//                   activeOpacity={0.8}
//                 >
//                   <Text
//                     style={[
//                       styles.pillText_shop,
//                       selected === range.label
//                         ? styles.textSelected_shop
//                         : styles.textUnselected_shop,
//                     ]}
//                     numberOfLines={1}
//                   >
//                     {range.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </>
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyBox}>
//             <Ionicons name="alert-circle-outline" size={50} color="#777" />
//             <Text style={styles.emptyText}>
//               No products available in this range.
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#fff', flex: 1 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: { backgroundColor: '#f5f5f5', borderRadius: 20, padding: 6 },
//   headerTitle: { fontSize: 16, fontWeight: '500', color: '#000' },
//   imageContainerD: { position: 'relative', backgroundColor: '#f4f4f4' },
//   imageD: { width: '100%', height: 250, resizeMode: 'stretch' },
//   cardD: {
//     width: 190,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowRadius: 4,
//     marginHorizontal: 5,
//   },
//   refurbishedLabelD: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontSize: 12,
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '100%',
//     textAlign: 'center',
//     padding: 5,
//   },
//   gradeBoxD: {
//     paddingVertical: 2,
//     position: 'absolute',
//     marginTop: 225,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     width: '100%',
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
//   colorTextD: {
//     fontSize: 13,
//     color: '#000',
//     marginHorizontal: 10,
//     marginTop: 2,
//   },
//   priceRowD: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 10,
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   priceD: { fontSize: 14, fontWeight: 'bold', color: '#000', marginRight: 6 },
//   heartIconD: {
//     position: 'absolute',
//     top: 28,
//     right: 6,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 5,
//     elevation: 2,
//   },
//   container_shop: { paddingHorizontal: 10, marginBottom: 10 },
//   pill_shop: {
//     paddingVertical: 15,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   pillSelected_shop: { backgroundColor: '#4B4B4B' },
//   pillUnselected_shop: { backgroundColor: '#EFECEC' },
//   pillText_shop: { fontSize: 14, fontWeight: '600' },
//   textSelected_shop: { color: 'white' },
//   textUnselected_shop: { color: '#222' },
// });

// export default HomeShopByBudget;

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { moderateScale } from 'react-native-size-matters';

// import {
//   addToWishlistAPI,
//   removeFromWishlistAPI,
//   fetchWishlist,
// } from '../../../redux/slices/wishlistSlice';
// import { fetchProductList } from '../../../redux/slices/productSlice';
// import Header from '../../../constants/Header';
// import { ProductCardStyles } from '../../../constants/ProductCardStyles';

// const { width } = Dimensions.get('window');
// const GAP = moderateScale(12);
// const CARD_WIDTH = (width - GAP * 3) / 2;

// const budgetOptions = [
//   { id: 1, label: 'Under ₹10,000' },
//   { id: 2, label: '₹10,000 - ₹20,000' },
//   { id: 3, label: '₹20,000 - ₹30,000' },
//   { id: 4, label: 'Above ₹30,000' },
// ];

// const HomeShopByBudget = ({ navigation }) => {
//   const route = useRoute();
//   const { priceId, osname, arrayosname, rangeLabel } = route.params || {};

//   const [selected, setSelected] = useState(rangeLabel || 'Under ₹10,000');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const dispatch = useDispatch();
//   const { productData } = useSelector(state => state.product);
//   const wishlistItems = useSelector(state => state.wishlist.items);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//     dispatch(fetchProductList());
//   }, [dispatch]);

//   useEffect(() => {
//     if (priceId) {
//       const match = budgetOptions.find(b => b.id === priceId);
//       if (match) setSelected(match.label);
//     }
//   }, [priceId]);

//   const products = useMemo(() => {
//     if (!productData?.length) return [];

//     if (arrayosname?.length) {
//       return productData.filter(item =>
//         arrayosname.some(
//           os =>
//             item.operating_systems &&
//             item.operating_systems.toLowerCase() === os.toLowerCase(),
//         ),
//       );
//     }

//     if (osname) {
//       return productData.filter(
//         item =>
//           item.operating_systems &&
//           item.operating_systems.toLowerCase() === osname.toLowerCase(),
//       );
//     }

//     return productData;
//   }, [productData, osname, arrayosname]);

//   useEffect(() => {
//     let data = [];
//     switch (selected) {
//       case 'Under ₹10,000':
//         data = products.filter(p => Number(p.price) < 10000);
//         break;
//       case '₹10,000 - ₹20,000':
//         data = products.filter(
//           p => Number(p.price) >= 10000 && Number(p.price) <= 20000,
//         );
//         break;
//       case '₹20,000 - ₹30,000':
//         data = products.filter(
//           p => Number(p.price) > 20000 && Number(p.price) <= 30000,
//         );
//         break;
//       case 'Above ₹30,000':
//         data = products.filter(p => Number(p.price) > 30000);
//         break;
//     }
//     setFilteredProducts(data);
//   }, [selected, products]);

//   const ProductCard = ({ item }) => {
//     const isLiked = wishlistItems.some(w => w.barcode_id === item.barcode_id);

//     return (
//       <TouchableOpacity
//         style={[ProductCardStyles.cardD, { width: CARD_WIDTH }]}
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             product_barcode_id: item.barcode_id,
//           })
//         }
//       >
//         <View style={ProductCardStyles.imageContainerD}>
//           <Text style={ProductCardStyles.refurbishedLabelD}>Refurbished</Text>

//           <Image
//             source={{ uri: item.feature_image }}
//             style={ProductCardStyles.imageD}
//           />

//           <TouchableOpacity
//             style={ProductCardStyles.heartIconD}
//             onPress={() =>
//               isLiked
//                 ? dispatch(removeFromWishlistAPI(item))
//                 : dispatch(addToWishlistAPI(item))
//             }
//           >
//             <AntDesign
//               name={isLiked ? 'heart' : 'hearto'}
//               size={20}
//               color={isLiked ? '#E74C3C' : '#999'}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.gradeText}>Grade {item.grade_number}</Text>
//         <Text style={styles.productName} numberOfLines={1}>
//           {item.model_name}
//         </Text>
//         <Text style={styles.colorText}>● {item.color_name}</Text>

//         <View style={styles.priceRow}>
//           <Text style={styles.price}>₹ {item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Shop by Budget" navigation={navigation} showBack />

//       <FlatList
//         data={filteredProducts}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={item => String(item.barcode_id)}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         contentContainerStyle={{
//           paddingHorizontal: GAP,
//           paddingBottom: moderateScale(80),
//         }}
//         renderItem={({ item }) => <ProductCard item={item} />}
//         ListHeaderComponent={
//           <>
//             {osname && <Text style={styles.osText}>{osname}</Text>}

//             <FlatList
//               horizontal
//               data={budgetOptions}
//               keyExtractor={item => String(item.id)}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.pillContainer}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.pill,
//                     selected === item.label
//                       ? styles.pillActive
//                       : styles.pillInactive,
//                   ]}
//                   onPress={() => setSelected(item.label)}
//                 >
//                   <Text
//                     style={[
//                       styles.pillText,
//                       selected === item.label
//                         ? styles.pillTextActive
//                         : styles.pillTextInactive,
//                     ]}
//                     numberOfLines={1}
//                   >
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </>
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyBox}>
//             <Ionicons name="alert-circle-outline" size={48} color="#888" />
//             <Text style={styles.emptyText}>
//               No products available in this range
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// export default HomeShopByBudget;

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },

//   osText: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     marginLeft: GAP,
//     marginBottom: GAP,
//     color: '#000',
//   },

//   pillContainer: {
//     paddingHorizontal: GAP,
//     marginBottom: GAP,
//   },

//   pill: {
//     paddingHorizontal: moderateScale(16),
//     paddingVertical: moderateScale(10),
//     borderRadius: moderateScale(22),
//     marginRight: GAP,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   pillActive: { backgroundColor: '#4B4B4B' },
//   pillInactive: { backgroundColor: '#EFECEC' },

//   pillText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//   },

//   pillTextActive: { color: '#fff' },
//   pillTextInactive: { color: '#222' },

//   gradeText: {
//     // textAlign: 'center',
//     marginHorizontal: GAP,
//     fontSize: moderateScale(12),
//     marginTop: moderateScale(6),
//     color: '#555',
//   },

//   productName: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     marginHorizontal: GAP,
//     marginTop: moderateScale(4),
//     color: '#000',
//   },

//   colorText: {
//     fontSize: moderateScale(12),
//     marginHorizontal: GAP,
//     color: '#444',
//   },

//   priceRow: {
//     marginHorizontal: GAP,
//     marginTop: moderateScale(6),
//     marginBottom: moderateScale(10),
//   },

//   price: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#000',
//   },

//   emptyBox: {
//     alignItems: 'center',
//     marginTop: moderateScale(60),
//   },

//   emptyText: {
//     marginTop: moderateScale(10),
//     fontSize: moderateScale(15),
//     color: '#777',
//   },
// });

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';

import {
  addToWishlistAPI,
  removeFromWishlistAPI,
  fetchWishlist,
} from '../../../redux/slices/wishlistSlice';
import { fetchProductList } from '../../../redux/slices/productSlice';
import Header from '../../../constants/Header';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';
import responsive from '../../../constants/responsive';

const { width } = Dimensions.get('window');

const GAP = moderateScale(12);
const CARD_WIDTH = (width - GAP * 3) / 2;
const ITEMS_PER_PAGE = 6;

const budgetOptions = [
  { id: 1, label: 'Under ₹10,000' },
  { id: 2, label: '₹10,000 - ₹20,000' },
  { id: 3, label: '₹20,000 - ₹30,000' },
  { id: 4, label: 'Above ₹30,000' },
];

const ShopByBudget = ({ navigation }) => {
  const route = useRoute();
  const { priceId, osname, arrayosname, rangeLabel, catName } =
    route.params || {};

  console.log('rangeLabel---------------------->', rangeLabel);

  const dispatch = useDispatch();
  const { productData } = useSelector(state => state.product);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const [selected, setSelected] = useState(rangeLabel ?? null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchProductList());
  }, [dispatch]);

  useEffect(() => {
    if (priceId) {
      const match = budgetOptions.find(b => b.id === priceId);
      if (match) setSelected(match.label);
    }
  }, [priceId]);

  const products = useMemo(() => {
    if (!productData?.length) return [];

    // ✅ 1. pichhli screen se category aayi hai
    if (catName) {
      return productData.filter(
        item =>
          item.category &&
          item.category.toLowerCase() === catName.toLowerCase(),
      );
    }

    // ✅ 2. multiple OS filter
    if (arrayosname?.length) {
      return productData.filter(item =>
        arrayosname.some(
          os => item.operating_systems?.toLowerCase() === os.toLowerCase(),
        ),
      );
    }

    // ✅ 3. single OS filter
    if (osname) {
      return productData.filter(
        item => item.operating_systems?.toLowerCase() === osname.toLowerCase(),
      );
    }

    // ✅ 4. default → sabhi products
    return productData;
  }, [productData, catName, osname, arrayosname]);

  /* ================= PRICE FILTER ================= */

  // useEffect(() => {
  //   let data = [];

  //   switch (selected) {
  //     case 'Under ₹10,000':
  //       data = products.filter(p => Number(p.price) < 10000);
  //       break;
  //     case '₹10,000 - ₹20,000':
  //       data = products.filter(
  //         p => Number(p.price) >= 10000 && Number(p.price) <= 20000,
  //       );
  //       break;
  //     case '₹20,000 - ₹30,000':
  //       data = products.filter(
  //         p => Number(p.price) > 20000 && Number(p.price) <= 30000,
  //       );
  //       break;
  //     case 'Above ₹30,000':
  //       data = products.filter(p => Number(p.price) > 30000);
  //       break;
  //   }

  //   setFilteredProducts(data);
  //   setPage(1); // 🔥 reset pagination
  // }, [selected, products]);

  useEffect(() => {
    // ✅ agar range select nahi hai → sab products dikhao
    if (!selected) {
      setFilteredProducts(products);
      setPage(1);
      return;
    }

    let data = [];

    switch (selected) {
      case 'Under ₹10,000':
        data = products.filter(p => Number(p.price) < 10000);
        break;

      case '₹10,000 - ₹20,000':
        data = products.filter(
          p => Number(p.price) >= 10000 && Number(p.price) <= 20000,
        );
        break;

      case '₹20,000 - ₹30,000':
        data = products.filter(
          p => Number(p.price) > 20000 && Number(p.price) <= 30000,
        );
        break;

      case 'Above ₹30,000':
        data = products.filter(p => Number(p.price) > 30000);
        break;

      default:
        data = products;
    }

    setFilteredProducts(data);
    setPage(1);
  }, [selected, products]);

  /* ================= PAGINATION ================= */

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setPaginatedData(filteredProducts.slice(0, endIndex));
  }, [filteredProducts, page]);

  const loadMore = () => {
    if (page * ITEMS_PER_PAGE < filteredProducts.length) {
      setPage(prev => prev + 1);
    }
  };

  /* ================= PRODUCT CARD ================= */

  const ProductCard = ({ item }) => {
    const isLiked = wishlistItems.some(w => w.barcode_id === item.barcode_id);

    return (
      <>
        <View
          style={{
            width: responsive.width(170),
          }}
        >
          <View style={ProductCardStyles.cardShadow}>
            <TouchableOpacity
              style={[ProductCardStyles.cardD]}
              onPress={() =>
                navigation.navigate('ProductList', {
                  product_barcode_id: item.barcode_id,
                })
              }
            >
              <Text style={ProductCardStyles.refurbishedLabelD}>
                (Pre-Owned)
              </Text>
              <Image
                source={{ uri: item.feature_image }}
                style={ProductCardStyles.imageD}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={ProductCardStyles.heartIconD}
                onPress={() =>
                  isLiked
                    ? dispatch(removeFromWishlistAPI(item))
                    : dispatch(addToWishlistAPI(item))
                }
              >
                <AntDesign
                  name={isLiked ? 'heart' : 'hearto'}
                  size={moderateScale(12)}
                  color={isLiked ? '#E74C3C' : '#999'}
                />
              </TouchableOpacity>
              <Text style={ProductCardStyles.gradeText}>
                Grade {item.grade_number}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={ProductCardStyles.productName} numberOfLines={1}>
            {item.model_name}
          </Text>
          <Text style={ProductCardStyles.colorText}>● {item.color_name}</Text>

          <Text style={ProductCardStyles.price}>₹ {item.price}</Text>
        </View>
      </>
    );
  };

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <Header title="Shop by Budget" navigation={navigation} showBack />

      <FlatList
        data={paginatedData}
        numColumns={2}
        keyExtractor={item => String(item.barcode_id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: responsive.paddingHorizontal(10),
        }}
        columnWrapperStyle= {{justifyContent:'space-between'}}
        renderItem={({ item }) => <ProductCard item={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListHeaderComponent={
          <>
            {catName && <Text style={styles.osText}>{catName}</Text>}

            <FlatList
              horizontal
              data={budgetOptions}
              keyExtractor={item => String(item.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: responsive.paddingHorizontal(15),
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.pill,
                    selected === item.label
                      ? styles.pillActive
                      : styles.pillInactive,
                  ]}
                  onPress={() => setSelected(item.label)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      selected === item.label
                        ? styles.pillTextActive
                        : styles.pillTextInactive,
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        }
        ListFooterComponent={() =>
          paginatedData.length < filteredProducts.length ? (
            <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="alert-circle-outline" size={48} color="#888" />
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        }
      />
    </View>
  );
};

export default ShopByBudget;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  osText: {
    fontSize: responsive.fontSize(20),
    fontWeight: '700',
    marginLeft: GAP,
    marginBottom: GAP,
    color: '#000',
  },

  pillContainer: {
    paddingHorizontal: GAP,
    marginBottom: GAP,
  },

  pill: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(5),
    borderRadius: responsive.borderRadius(12),
    marginRight: GAP,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pillActive: { backgroundColor: '#666666' },
  pillInactive: { backgroundColor: '#EAE6E5' },

  pillText: {
    fontSize: responsive.fontSize(14),
  },

  pillTextActive: { color: '#fff' },
  pillTextInactive: { color: '#222' },

  gradeText: {
    marginHorizontal: GAP,
    fontSize: moderateScale(12),
    marginTop: moderateScale(6),
    color: '#555',
  },

  productName: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginHorizontal: GAP,
    marginTop: moderateScale(4),
    color: '#000',
  },

  colorText: {
    fontSize: moderateScale(12),
    marginHorizontal: GAP,
    color: '#444',
  },

  priceRow: {
    marginHorizontal: GAP,
    marginTop: moderateScale(6),
    marginBottom: moderateScale(10),
  },

  price: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#000',
  },

  loadMoreBtn: {
    alignSelf: 'center',
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(28),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    backgroundColor: '#4B4B4B',
  },

  loadMoreText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  emptyBox: {
    alignItems: 'center',
    marginTop: moderateScale(60),
  },

  emptyText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(15),
    color: '#777',
  },
});
