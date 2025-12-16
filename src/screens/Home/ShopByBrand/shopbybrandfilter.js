// // // import React, {useEffect, useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   SafeAreaView,
// // //   Image,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   ScrollView,
// // //   FlatList,
// // //   Dimensions,
// // // } from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import {useDispatch, useSelector} from 'react-redux';
// // // import {toggleWishlist} from '../../../redux/slices/wishlistSlice';
// // // import axios from 'axios';
// // // import Toast from 'react-native-toast-message';
// // // import {API_BASE_URL} from '../../../utils/utils';

// // // const {width} = Dimensions.get('window');

// // // const shopbybrandfilter = ({navigation, route, visible, onClose, item}) => {
// // //   const {brandname} = route?.params;
// // //   const [brandsdata, setBrandsData] = useState(true);

// // //   const fetchBrandsDetails = async zip => {
// // //     try {
// // //       const res = await axios.get(
// // //         `${API_BASE_URL}/productlistbrand/${brandname}`,
// // //       );
// // //       setBrandsData(res?.data?.data);
// // //     } catch (error) {
// // //       Toast.show({
// // //         type: 'error',
// // //         text2: JSON.stringify(error?.response?.data?.message),
// // //       });
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBrandsDetails();
// // //   }, [brandname]);

// // //   const CATEGORIES = ['Smartphones', 'Laptop'];

// // //   const [activeTab, setActiveTab] = useState('Smartphones');

// // //   // ✅ Filtered data based on active tab
// // //   const getFilteredProducts = () => {
// // //     if (!brandsdata || !Array.isArray(brandsdata)) return [];

// // //     if (activeTab === 'Smartphones') {
// // //       return brandsdata.filter(item => item.category === 'Mobile');
// // //     } else if (activeTab === 'Laptop') {
// // //       return brandsdata.filter(item => item.category === 'Laptop');
// // //     }
// // //     return brandsdata;
// // //   };

// // //   // Tabs
// // //   const renderTabs = () => (
// // //     <View style={styles.tabContainer}>
// // //       {CATEGORIES.map(category => (
// // //         <TouchableOpacity key={category} onPress={() => setActiveTab(category)}>
// // //           <Text
// // //             style={[
// // //               styles.tabText,
// // //               activeTab === category && styles.activeTabText,
// // //             ]}>
// // //             {category}
// // //           </Text>
// // //         </TouchableOpacity>
// // //       ))}
// // //     </View>
// // //   );

// // //   const ProductCard = ({item}) => {
// // //     const dispatch = useDispatch();
// // //     const wishlist = useSelector(state => state.wishlist);
// // //     // const isInWishlist = wishlist.some(w => w.id === item.id);

// // //     if (!item) return null; // ✅ safety check

// // //     return (
// // //       <View style={styles.cardD}>
// // //         <View style={styles.imageContainerD}>
// // //           <Image source={{uri: item.feature_image}} style={styles.imageD} />
// // //           {item && <Text style={styles.refurbishedLabelD}>(Refurbished)</Text>}
// // //           <TouchableOpacity
// // //             style={styles.heartIconD}
// // //             onPress={() => dispatch(toggleWishlist(item))}>
// // //             <Ionicons name={'heart'} size={20} color={'#333'} />
// // //           </TouchableOpacity>
// // //         </View>
// // //         <View style={styles.gradeBoxD}>
// // //           <Text style={styles.gradeTextD}>Grade {item.grade_number}</Text>
// // //         </View>
// // //         <Text style={styles.productNameD}>{item.model_name}</Text>
// // //         <Text style={styles.colorTextD}>● {item.color_name}</Text>
// // //         <View style={styles.priceRowD}>
// // //           <Text style={styles.priceD}>{item.price}</Text>
// // //           {/* <Text style={styles.originalPriceD}>{item.originalPrice}</Text> */}
// // //         </View>{' '}
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       {/* Scrollable content starts here */}
// // //       <ScrollView>
// // //         <View style={{margin: 10}}>
// // //           {/* Header */}
// // //           <View style={styles.header}>
// // //             <TouchableOpacity
// // //               onPress={() => navigation.goBack()}
// // //               style={styles.backButton}>
// // //               <Ionicons name="chevron-back" size={22} color="#000" />
// // //             </TouchableOpacity>
// // //             <View>
// // //               <Text style={styles.headerTitle}>{brandname}</Text>
// // //             </View>
// // //             <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// // //               <Ionicons name="search" size={24} color="#333" />
// // //             </TouchableOpacity>
// // //           </View>

// // //           {renderTabs()}
// // //           {activeTab === 'Smartphones' && (
// // //             <>
// // //               <FlatList
// // //                 data={getFilteredProducts()} // ✅ now filtered
// // //                 keyExtractor={item => item.id}
// // //                 renderItem={({item}) => <ProductCard item={item} />}
// // //                 showsHorizontalScrollIndicator={false}
// // //                 numColumns={2}
// // //                 columnWrapperStyle={styles.row}
// // //               />
// // //               :
// // //               {activeTab === 'Smartphones' && (
// // //                 <>
// // //                   {getFilteredProducts().length > 0 ? (
// // //                     <FlatList
// // //                       data={getFilteredProducts()}
// // //                       keyExtractor={item => item.id}
// // //                       renderItem={({item}) => <ProductCard item={item} />}
// // //                       showsHorizontalScrollIndicator={false}
// // //                       numColumns={2}
// // //                       columnWrapperStyle={styles.row}
// // //                     />
// // //                   ) : (
// // //                     <View style={{alignItems: 'center', marginTop: 30}}>
// // //                       <Image
// // //                         source={require('../../../../assets/images/emptyproduct.png')}
// // //                         style={{
// // //                           width: 140,
// // //                           height: 140,
// // //                           resizeMode: 'contain',
// // //                           opacity: 0.9,
// // //                         }}
// // //                       />
// // //                       <Text
// // //                         style={{
// // //                           fontSize: 20,
// // //                           fontWeight: '700',
// // //                           color: '#000',
// // //                           marginTop: 15,
// // //                         }}>
// // //                         No Products Available
// // //                       </Text>
// // //                       <Text
// // //                         style={{
// // //                           fontSize: 14,
// // //                           color: '#666',
// // //                           textAlign: 'center',
// // //                           marginTop: 8,
// // //                           paddingHorizontal: 20,
// // //                         }}>
// // //                         We couldn’t find matching products right now. Try
// // //                         exploring other options or adjust filters.
// // //                       </Text>
// // //                     </View>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </>
// // //           )}
// // //           {activeTab === 'Laptop' && (
// // //             <>
// // //               {getFilteredProducts().length > 0 ? (
// // //                 <FlatList
// // //                   data={getFilteredProducts()}
// // //                   keyExtractor={item => item.id}
// // //                   renderItem={({item}) => <ProductCard item={item} />}
// // //                   showsHorizontalScrollIndicator={false}
// // //                   numColumns={2}
// // //                   columnWrapperStyle={styles.row}
// // //                 />
// // //               ) : (
// // //                 <View style={{alignItems: 'center', marginTop: 30}}>
// // //                   <Image
// // //                     source={require('../../../../assets/images/emptyproduct.png')}
// // //                     style={{
// // //                       width: 140,
// // //                       height: 140,
// // //                       resizeMode: 'contain',
// // //                       opacity: 0.9,
// // //                     }}
// // //                   />
// // //                   <Text
// // //                     style={{
// // //                       fontSize: 20,
// // //                       fontWeight: '700',
// // //                       color: '#000',
// // //                       marginTop: 15,
// // //                     }}>
// // //                     No Products Available
// // //                   </Text>
// // //                   <Text
// // //                     style={{
// // //                       fontSize: 14,
// // //                       color: '#666',
// // //                       textAlign: 'center',
// // //                       marginTop: 8,
// // //                       paddingHorizontal: 20,
// // //                     }}>
// // //                     We couldn’t find matching products right now. Try exploring
// // //                     other options or adjust filters.
// // //                   </Text>
// // //                 </View>
// // //               )}
// // //             </>
// // //           )}
// // //         </View>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {flex: 1, backgroundColor: '#fff'},
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     paddingVertical: 15,
// // //     justifyContent: 'space-between',
// // //     marginHorizontal: 10,
// // //   },
// // //   backButton: {
// // //     backgroundColor: '#f5f5f5',
// // //     borderRadius: 20,
// // //     padding: 6,
// // //     left: 0,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '500',
// // //     color: '#000',
// // //     textAlign: 'center',
// // //   },
// // //   cardContainer: {
// // //     width: (width - 36) / 2, // 2 cards per row with spacing
// // //     marginBottom: 6,
// // //     marginTop: 10,
// // //   },

// // //   cardImage: {
// // //     width: '100%',
// // //     height: 120,
// // //     borderRadius: 12,
// // //   },

// // //   cardLabel: {
// // //     marginTop: 8,
// // //     fontSize: 14,
// // //     fontWeight: '500',
// // //     textAlign: 'center',
// // //   },

// // //   micIcon: {marginLeft: 'auto'},
// // //   imagePlaceholder: {
// // //     width: 100,
// // //     height: 100,
// // //     backgroundColor: '#eee',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     marginBottom: 10,
// // //     borderWidth: 1,
// // //     borderColor: '#aaa',
// // //   },
// // //   imageIcon: {fontSize: 20},
// // //   tabContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     borderBottomWidth: 1,
// // //     paddingBottom: 10,
// // //     marginTop: 10,
// // //   },
// // //   tabText: {fontWeight: '600', color: 'gray', fontSize: 16},
// // //   activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
// // //   productList: {padding: 10},
// // //   productCard: {
// // //     flex: 1,
// // //     borderWidth: 1,
// // //     borderColor: '#ccc',
// // //     margin: 5,
// // //     padding: 10,
// // //     alignItems: 'center',
// // //     borderRadius: 10,
// // //   },
// // //   productName: {fontWeight: 'bold', fontSize: 14},
// // //   productPrice: {fontSize: 14, color: 'gray'},
// // //   timerWrapper: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     marginHorizontal: 10,
// // //     marginVertical: 10,
// // //   },
// // //   timeContainer: {
// // //     alignItems: 'center',
// // //   },
// // //   timeBox: {
// // //     backgroundColor: '#E8F5E8',
// // //     paddingVertical: 20,
// // //     paddingHorizontal: 25,
// // //     borderRadius: 12,
// // //     marginBottom: 5,
// // //   },
// // //   timeValue: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //   },
// // //   timeLabel: {
// // //     fontSize: 14,
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },

// // //   headerButtons: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'flex-start',
// // //     gap: 12,
// // //     marginVertical: 20,
// // //   },
// // //   sortButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#bbb',
// // //     borderRadius: 25,
// // //     paddingVertical: 8,
// // //     paddingHorizontal: 16,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 6,
// // //   },
// // //   filterButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#bbb',
// // //     borderRadius: 25,
// // //     paddingVertical: 8,
// // //     paddingHorizontal: 16,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 6,
// // //   },
// // //   sortText: {
// // //     fontSize: 14,
// // //     fontWeight: '500',
// // //     color: '#000',
// // //   },
// // //   card_Flash: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginBottom: 24,
// // //     margin: 10,
// // //   },
// // //   leftSection: {
// // //     flex: 1,
// // //     paddingRight: 12,
// // //   },
// // //   discountText: {
// // //     fontSize: 14,
// // //     fontWeight: 'bold',
// // //   },
// // //   name_Flash: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#222',
// // //   },
// // //   refurbished: {
// // //     fontSize: 13,
// // //     color: '#555',
// // //     marginBottom: 4,
// // //   },
// // //   priceRow: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 8,
// // //   },
// // //   price: {
// // //     fontSize: 15,
// // //     fontWeight: 'bold',
// // //     color: '#222',
// // //   },
// // //   originalPrice: {
// // //     fontSize: 13,
// // //     color: '#777',
// // //     textDecorationLine: 'line-through',
// // //   },
// // //   grade: {
// // //     fontSize: 13,
// // //     color: '#444',
// // //     marginTop: 2,
// // //   },
// // //   rightSection: {
// // //     width: 100,
// // //     height: 100,
// // //     position: 'relative',
// // //   },
// // //   image_Flash: {
// // //     width: '100%',
// // //     height: '100%',
// // //     borderRadius: 12,
// // //   },
// // //   heartIcon: {
// // //     position: 'absolute',
// // //     top: 6,
// // //     right: 6,
// // //     backgroundColor: '#fff',
// // //     padding: 5,
// // //     borderRadius: 20,
// // //     elevation: 2,
// // //   },
// // //   listContainerD: {
// // //     padding: 10,
// // //   },
// // //   cardD: {
// // //     width: 180,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 12,
// // //     marginRight: 15,
// // //     overflow: 'hidden',
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowOffset: {width: 0, height: 2},
// // //     shadowRadius: 4,
// // //     elevation: 3,
// // //     marginVertical: 5,
// // //   },
// // //   cardM: {
// // //     width: 200,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 12,
// // //     marginRight: 0,
// // //     overflow: 'hidden',
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowOffset: {width: 0, height: 2},
// // //     shadowRadius: 4,
// // //     elevation: 3,
// // //   },
// // //   imageContainerD: {
// // //     position: 'relative',
// // //     backgroundColor: '#f4f4f4',
// // //   },
// // //   imageD: {
// // //     width: '100%',
// // //     height: 250,
// // //     resizeMode: 'stretch',
// // //   },
// // //   imageM: {
// // //     width: '90%',
// // //     height: 200,
// // //     resizeMode: 'stretch',
// // //   },
// // //   refurbishedLabelD: {
// // //     position: 'absolute',
// // //     alignSelf: 'center',
// // //     fontSize: 12,
// // //     color: '#000',
// // //     backgroundColor: '#EAE6E5',
// // //     width: '98%',
// // //     textAlign: 'center',
// // //     padding: 5,
// // //   },
// // //   heartIconD: {
// // //     position: 'absolute',
// // //     top: 25,
// // //     right: 6,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 20,
// // //     padding: 5,
// // //     elevation: 2,
// // //   },
// // //   badge: {
// // //     position: 'absolute',
// // //     left: -8,
// // //     top: 10,
// // //     backgroundColor: '#FF3C3C',
// // //     paddingHorizontal: 6,
// // //     paddingVertical: 2,
// // //     borderRadius: 10,
// // //   },
// // //   badgeTextD: {
// // //     color: '#fff',
// // //     fontSize: 12,
// // //     fontWeight: 'bold',
// // //   },
// // //   gradeBoxD: {
// // //     paddingVertical: 2,
// // //     position: 'absolute',
// // //     marginTop: 225,
// // //     alignSelf: 'center',
// // //     backgroundColor: '#fff',
// // //     width: '92%',
// // //     borderRadius: 10,
// // //     borderWidth: 0.2,
// // //   },
// // //   gradeTextD: {
// // //     fontSize: 12,
// // //     fontWeight: '500',
// // //     color: '#555',
// // //     textAlign: 'center',
// // //   },
// // //   productNameD: {
// // //     fontSize: 14,
// // //     fontWeight: 'bold',
// // //     marginTop: 6,
// // //     marginHorizontal: 10,
// // //     color: '#000',
// // //   },
// // //   colorTextD: {
// // //     fontSize: 13,
// // //     color: '#000',
// // //     marginHorizontal: 10,
// // //     marginTop: 2,
// // //   },
// // //   priceRowD: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginHorizontal: 10,
// // //     marginTop: 4,
// // //     marginBottom: 10,
// // //   },
// // //   priceD: {
// // //     fontSize: 14,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //     marginRight: 6,
// // //   },
// // //   originalPriceD: {
// // //     fontSize: 13,
// // //     color: '#888',
// // //     textDecorationLine: 'line-through',
// // //   },

// // //   cardr: {
// // //     width: width * 0.4,
// // //     height: 180,
// // //     marginRight: 16,
// // //     borderRadius: 16,
// // //     overflow: 'hidden',
// // //   },
// // //   imager: {
// // //     borderRadius: 16,
// // //   },
// // //   overlayr: {
// // //     position: 'absolute',
// // //     bottom: 0,
// // //     width: '100%',
// // //     padding: 10,
// // //     // backgroundColor: 'rgba(0,0,0,0.4)',
// // //   },
// // //   titler: {
// // //     color: '#fff',
// // //     fontSize: 15,
// // //     fontWeight: '600',
// // //   },
// // //   specsr: {
// // //     color: '#ddd',
// // //     fontSize: 12,
// // //     marginTop: 2,
// // //   },
// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //   },
// // //   modalHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     borderColor: '#000',
// // //     paddingBottom: 10,
// // //     borderWidth: 1,
// // //     padding: 10,
// // //     alignSelf: 'center',
// // //     width: 300,
// // //     borderRadius: 10,
// // //   },
// // //   modalTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '500',
// // //   },
// // //   optionList: {
// // //     marginVertical: 20,
// // //   },
// // //   optionRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingVertical: 15,
// // //   },
// // //   optionText: {
// // //     fontSize: 15,
// // //     color: '#000',
// // //   },
// // //   radioOuter: {
// // //     height: 20,
// // //     width: 20,
// // //     borderRadius: 10,
// // //     borderWidth: 1,
// // //     borderColor: '#555',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   radioOuterSelected: {
// // //     borderColor: '#000',
// // //   },
// // //   radioInner: {
// // //     height: 10,
// // //     width: 10,
// // //     borderRadius: 5,
// // //     backgroundColor: '#000',
// // //   },
// // //   applyWrapper: {
// // //     bottom: 30,
// // //     alignItems: 'flex-end',
// // //     marginRight: 50,
// // //   },
// // //   applyButton: {
// // //     backgroundColor: '#333',
// // //     paddingHorizontal: 30,
// // //     paddingVertical: 10,
// // //     borderRadius: 20,
// // //   },
// // //   applyText: {
// // //     color: '#fff',
// // //     fontWeight: '500',
// // //   },

// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //   },
// // //   header_panel: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     borderColor: '#eee',
// // //     marginBottom: 10,
// // //     width: '90%',
// // //   },
// // //   headerTitle: {
// // //     fontSize: 18,
// // //     fontWeight: '500',
// // //   },
// // //   body: {
// // //     flex: 1,
// // //     flexDirection: 'row',
// // //   },
// // //   leftPane: {
// // //     width: 110,
// // //     borderRightWidth: 1,
// // //     borderColor: '#ccc',
// // //     paddingVertical: 10,
// // //   },
// // //   tabItem: {
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 10,
// // //     alignItems: 'flex-start',
// // //     flexDirection: 'row',
// // //     gap: 6,
// // //   },
// // //   tabItemSelected: {
// // //     backgroundColor: '#F0F0F0',
// // //   },
// // //   tabLabel: {
// // //     fontSize: 14,
// // //     color: '#000',
// // //   },
// // //   rightPane: {
// // //     flex: 1,
// // //     padding: 16,
// // //   },
// // //   rightHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginVertical: 10,
// // //     marginLeft: 10,
// // //   },
// // //   rightHeader_cat: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginBottom: 10,
// // //   },
// // //   rightTitle: {
// // //     fontSize: 16,
// // //     fontWeight: '500',
// // //     marginBottom: 5,
// // //   },
// // //   selectedCount: {
// // //     fontSize: 14,
// // //     color: '#333',
// // //   },
// // //   brandItem: {
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 14,
// // //     borderRadius: 14,
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   brandItemSelected: {
// // //     backgroundColor: '#222',
// // //   },
// // //   brandText: {
// // //     fontSize: 15,
// // //     color: '#000',
// // //   },
// // //   itemCount: {
// // //     fontSize: 14,
// // //     color: '#888',
// // //   },
// // //   separator: {
// // //     borderBottomWidth: 1,
// // //     borderColor: '#ddd',
// // //   },
// // //   footer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     padding: 16,
// // //     borderTopWidth: 1,
// // //     borderColor: '#eee',
// // //   },
// // //   resetBtn: {
// // //     borderWidth: 1,
// // //     borderColor: '#000',
// // //     paddingHorizontal: 30,
// // //     paddingVertical: 10,
// // //     borderRadius: 20,
// // //   },
// // //   resetText: {
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },
// // //   applyBtn: {
// // //     backgroundColor: '#000',
// // //     paddingHorizontal: 30,
// // //     paddingVertical: 10,
// // //     borderRadius: 20,
// // //   },
// // //   applyText: {
// // //     color: '#fff',
// // //     fontWeight: '500',
// // //   },
// // //   title_cat: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     marginBottom: 16,
// // //   },
// // //   grid_cat: {
// // //     justifyContent: 'center',
// // //   },
// // //   gridRow_cat: {
// // //     // justifyContent: 'space-between',
// // //     justifyContent: 'space-evenly',
// // //     marginBottom: 16,
// // //   },
// // //   card_cat: {
// // //     width: '38%',
// // //     aspectRatio: 1,
// // //     backgroundColor: '#eee',
// // //     borderRadius: 12,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   cardSelected_cat: {
// // //     backgroundColor: '#333',
// // //   },
// // //   label_cat: {
// // //     marginTop: 8,
// // //     fontSize: 14,
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },
// // //   priceLabels: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginTop: 8,
// // //   },
// // //   price: {
// // //     fontSize: 14,
// // //     color: '#333',
// // //   },
// // //   selectedRange: {
// // //     marginTop: 14,
// // //     fontSize: 16,
// // //     fontWeight: '500',
// // //     color: '#000',
// // //   },
// // //   rail: {
// // //     flex: 1,
// // //     height: 4,
// // //     backgroundColor: '#ccc',
// // //     borderRadius: 2,
// // //   },
// // //   railSelected: {
// // //     height: 4,
// // //     backgroundColor: '#333',
// // //     borderRadius: 2,
// // //   },
// // //   thumb: {
// // //     width: 24,
// // //     height: 24,
// // //     borderRadius: 12,
// // //     backgroundColor: '#fff',
// // //     borderWidth: 2,
// // //     borderColor: '#333',
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowOffset: {width: 0, height: 2},
// // //     shadowRadius: 2,
// // //     elevation: 2,
// // //   },
// // //   label: {
// // //     alignItems: 'center',
// // //     padding: 6,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 6,
// // //     borderWidth: 1,
// // //     borderColor: '#ccc',
// // //   },
// // //   labelText: {
// // //     fontSize: 12,
// // //     color: '#333',
// // //   },

// // //   headerRow_C: {
// // //     flexDirection: 'row',
// // //     padding: 16,
// // //     borderBottomWidth: 1,
// // //     borderColor: '#eee',
// // //   },
// // //   title_c: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // //   selectedCount_c: {
// // //     fontSize: 14,
// // //     color: '#000',
// // //     marginLeft: 150,
// // //     fontWeight: 'bold',
// // //   },
// // //   row_c: {
// // //     justifyContent: 'space-between',
// // //     marginBottom: 16,
// // //   },
// // //   colorItem_c: {
// // //     alignItems: 'center',
// // //     width: '18%',
// // //     marginHorizontal: 5,
// // //     marginBottom: 15,
// // //   },
// // //   colorCircleWrapper_c: {
// // //     padding: 0,
// // //     borderRadius: 16,
// // //   },
// // //   selectedWrapper_c: {
// // //     backgroundColor: '#F2F2F2',
// // //     borderRadius: 16,
// // //     marginBottom: 15,
// // //     marginHorizontal: 5,
// // //     alignItems: 'center',
// // //     width: '18%',
// // //   },
// // //   colorCircle_c: {
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     borderWidth: 2,
// // //     borderColor: 'transparent',
// // //   },
// // //   colorCircleSelected_c: {
// // //     borderColor: '#000',
// // //     borderWidth: 3,
// // //   },
// // //   colorLabel_c: {
// // //     marginTop: 6,
// // //     fontSize: 10,
// // //     color: '#333',
// // //     textAlign: 'center',
// // //     marginBottom: 10,
// // //   },
// // //   gradeButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#000',
// // //     borderRadius: 20,
// // //     paddingVertical: 12,
// // //     marginBottom: 12,
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     width: '90%',
// // //   },
// // //   gradeButtonSelected: {
// // //     backgroundColor: '#222',
// // //   },
// // //   gradeText: {
// // //     fontSize: 16,
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },
// // //   gradeTextSelected: {
// // //     color: '#fff',
// // //   },
// // //   discountButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#000',
// // //     borderRadius: 20,
// // //     paddingVertical: 12,
// // //     marginBottom: 12,
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     width: '90%',
// // //   },
// // //   discountButtonSelected: {
// // //     backgroundColor: '#222',
// // //   },
// // //   discountTexts: {
// // //     fontSize: 16,
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },
// // //   discountTextSelected: {
// // //     color: '#fff',
// // //   },
// // //   subHeading: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     marginTop: 16,
// // //     marginBottom: 8,
// // //   },
// // //   optionContainer: {
// // //     flexDirection: 'row',
// // //     flexWrap: 'wrap',
// // //     gap: 10,
// // //   },
// // //   optionButton: {
// // //     borderWidth: 1,
// // //     borderColor: '#000',
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 8,
// // //     borderRadius: 12,
// // //     marginBottom: 10,
// // //     marginRight: 10,
// // //   },
// // //   selectedButton: {
// // //     backgroundColor: '#333',
// // //   },
// // //   optionText: {
// // //     color: '#000',
// // //     fontWeight: '600',
// // //   },
// // //   selectedText: {
// // //     color: '#fff',
// // //   },

// // //   cardBrand: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     padding: 15,
// // //     borderRadius: 15,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 6,
// // //     shadowOffset: {width: 0, height: 3},
// // //     elevation: 1,
// // //     justifyContent: 'space-between',
// // //     marginBottom: 10,
// // //   },
// // //   textContainerBrand: {
// // //     flex: 1,
// // //     marginRight: 15,
// // //   },
// // //   brandNameBrand: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //     marginBottom: 4,
// // //   },
// // //   descriptionBrand: {
// // //     fontSize: 14,
// // //     color: '#6b7280', // Tailwind gray-500 equivalent
// // //     marginTop: 5,
// // //   },
// // //   logoBrand: {
// // //     width: 90,
// // //     height: 70,
// // //     borderRadius: 10,
// // //   },

// // //   containersearch: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     borderWidth: 1,
// // //     borderColor: '#999',
// // //     borderRadius: 20,
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 12,
// // //     backgroundColor: '#fff',
// // //   },
// // //   inputsearch: {
// // //     flex: 1,
// // //     fontSize: 14,
// // //     color: '#333',
// // //   },
// // //   iconsearch: {
// // //     marginLeft: 8,
// // //   },
// // // });

// // // export default shopbybrandfilter;

// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   Image,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// //   FlatList,
// //   Dimensions,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import {useDispatch, useSelector} from 'react-redux';
// // import {toggleWishlist} from '../../../redux/slices/wishlistSlice';
// // import axios from 'axios';
// // import Toast from 'react-native-toast-message';
// // import {API_BASE_URL} from '../../../utils/utils';
// // import Header from '../../../constants/Header';

// // const {width, height} = Dimensions.get('window');
// // const cardWidth = (width - 40) / 2; // for 2-column grid
// // const cardHeight = cardWidth * 1.4; // dynamic height

// // const shopbybrandfilter = ({navigation, route}) => {
// //   const {brandname} = route?.params;
// //   const [brandsdata, setBrandsData] = useState([]);

// //   const fetchBrandsDetails = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${API_BASE_URL}/productlistbrand/${brandname}`,
// //       );
// //       setBrandsData(res?.data?.data || []);
// //     } catch (error) {
// //       Toast.show({
// //         type: 'error',
// //         text2: error?.response?.data?.message || 'Something went wrong',
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBrandsDetails();
// //   }, [brandname]);

// //   const CATEGORIES = ['Smartphones', 'Laptop'];
// //   const [activeTab, setActiveTab] = useState('Smartphones');

// //   const getFilteredProducts = () => {
// //     if (!brandsdata || !Array.isArray(brandsdata)) return [];
// //     if (activeTab === 'Smartphones')
// //       return brandsdata.filter(i => i.category === 'Mobile');
// //     if (activeTab === 'Laptop')
// //       return brandsdata.filter(i => i.category === 'Laptop');
// //     return brandsdata;
// //   };

// //   const renderTabs = () => (
// //     <View style={styles.tabContainer}>
// //       {CATEGORIES.map(category => (
// //         <TouchableOpacity key={category} onPress={() => setActiveTab(category)}>
// //           <Text
// //             style={[
// //               styles.tabText,
// //               activeTab === category && styles.activeTabText,
// //             ]}>
// //             {category}
// //           </Text>
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );

// //   const ProductCard = ({item}) => {
// //     const dispatch = useDispatch();
// //     const wishlist = useSelector(state => state.wishlist);

// //     if (!item) return null;

// //     return (
// //       <View style={[styles.card, {width: cardWidth, height: cardHeight}]}>
// //         <View style={styles.imageContainer}>
// //           {item.feature_image ? (
// //             <Image source={{uri: item.feature_image}} style={styles.image} />
// //           ) : (
// //             <View style={styles.imagePlaceholder}>
// //               <Text>No Image</Text>
// //             </View>
// //           )}
// //           <Text style={styles.refurbishedLabel}>(Refurbished)</Text>
// //           <TouchableOpacity
// //             style={styles.heartIcon}
// //             onPress={() => dispatch(toggleWishlist(item))}>
// //             <Ionicons name="heart" size={20} color="#333" />
// //           </TouchableOpacity>
// //         </View>
// //         <Text style={styles.gradeText}>Grade {item.grade_number}</Text>
// //         <Text style={styles.productName}>{item.model_name}</Text>
// //         <Text style={styles.colorText}>● {item.color_name}</Text>
// //         <Text style={styles.price}>{item.price}</Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView>
// //         {/* Header */}

// //         <Header
// //           title={brandname}
// //           navigation={navigation}
// //           showSearch
// //           showBack={true}
// //         />
// //         <View style={{padding: width * 0.025}}>
// //           {renderTabs()}

// //           {getFilteredProducts().length > 0 ? (
// //             <FlatList
// //               data={getFilteredProducts()}
// //               keyExtractor={item => item.id}
// //               renderItem={({item}) => <ProductCard item={item} />}
// //               showsHorizontalScrollIndicator={false}
// //               numColumns={2}
// //               columnWrapperStyle={{
// //                 justifyContent: 'space-between',
// //                 marginBottom: 15,
// //               }}
// //             />
// //           ) : (
// //             <View style={styles.emptyContainer}>
// //               <Image
// //                 source={require('../../../../assets/images/emptyproduct.png')}
// //                 style={styles.emptyImage}
// //               />
// //               <Text style={styles.emptyTitle}>No Products Available</Text>
// //               <Text style={styles.emptySubtitle}>
// //                 We couldn’t find matching products right now. Try exploring
// //                 other options or adjust filters.
// //               </Text>
// //             </View>
// //           )}
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {flex: 1, backgroundColor: '#fff'},
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: height * 0.02,
// //   },
// //   backButton: {
// //     backgroundColor: '#f5f5f5',
// //     borderRadius: 20,
// //     padding: 6,
// //   },
// //   headerTitle: {
// //     fontSize: width * 0.045,
// //     fontWeight: '500',
// //     color: '#000',
// //     textAlign: 'center',
// //   },
// //   tabContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginBottom: height * 0.02,
// //   },
// //   tabText: {
// //     fontSize: width * 0.04,
// //     color: 'gray',
// //     fontWeight: '600',
// //   },
// //   activeTabText: {
// //     color: '#000',
// //     borderBottomWidth: 2,
// //     borderColor: '#000',
// //     paddingBottom: 4,
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //     elevation: 3,
// //     marginBottom: 15,
// //   },
// //   imageContainer: {
// //     width: '100%',
// //     height: '65%',
// //     backgroundColor: '#f4f4f4',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   image: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'contain',
// //   },
// //   imagePlaceholder: {
// //     width: '100%',
// //     height: '100%',
// //     backgroundColor: '#eee',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   refurbishedLabel: {
// //     position: 'absolute',
// //     top: 10,
// //     backgroundColor: '#EAE6E5',
// //     paddingHorizontal: 8,
// //     paddingVertical: 3,
// //     borderRadius: 6,
// //     fontSize: width * 0.03,
// //   },
// //   heartIcon: {
// //     position: 'absolute',
// //     top: 10,
// //     right: 10,
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 5,
// //   },
// //   gradeText: {
// //     fontSize: width * 0.035,
// //     fontWeight: '500',
// //     marginTop: 5,
// //     marginLeft: 8,
// //     color: '#555',
// //   },
// //   productName: {
// //     fontSize: width * 0.04,
// //     fontWeight: 'bold',
// //     marginTop: 5,
// //     marginLeft: 8,
// //     color: '#000',
// //   },
// //   colorText: {
// //     fontSize: width * 0.035,
// //     marginLeft: 8,
// //     color: '#000',
// //     marginBottom: 5,
// //   },
// //   price: {
// //     fontSize: width * 0.04,
// //     fontWeight: 'bold',
// //     marginLeft: 8,
// //     marginBottom: 10,
// //     color: '#000',
// //   },
// //   emptyContainer: {
// //     alignItems: 'center',
// //     marginTop: height * 0.1,
// //     paddingHorizontal: 20,
// //   },
// //   emptyImage: {
// //     width: width * 0.35,
// //     height: width * 0.35,
// //     resizeMode: 'contain',
// //     marginBottom: 15,
// //   },
// //   emptyTitle: {
// //     fontSize: width * 0.045,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginBottom: 8,
// //     textAlign: 'center',
// //   },
// //   emptySubtitle: {
// //     fontSize: width * 0.035,
// //     color: '#666',
// //     textAlign: 'center',
// //   },
// // });

// // export default shopbybrandfilter;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToWishlistAPI,
//   removeFromWishlistAPI,
//   toggleWishlist,
// } from '../../../redux/slices/wishlistSlice';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';
// import { API_BASE_URL } from '../../../utils/utils';
// import Header from '../../../constants/Header';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { ProductCardStyles } from '../../../constants/ProductCardStyles';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import ActivityLoader from '../../../constants/Loader';

// const { width } = Dimensions.get('window');

// const shopbybrandfilter = ({ navigation, route }) => {
//   const { brandname } = route?.params;
//   const [brandsdata, setBrandsData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   const fetchBrandsDetails = async () => {
//     try {
//       setLoading(true); // Loader ON
//       const res = await axios.get(
//         `${API_BASE_URL}/productlistbrand/${brandname}`,
//       );
//       setBrandsData(res?.data?.data || []);
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text2: error?.response?.data?.message || 'Something went wrong',
//       });
//     } finally {
//       setLoading(false); // Loader OFF चाहे success हो या error
//     }
//   };

//   useEffect(() => {
//     fetchBrandsDetails();
//   }, [brandname]);

//   const CATEGORIES = ['Smartphones', 'Laptop'];
//   const [activeTab, setActiveTab] = useState('Smartphones');

//   const getFilteredProducts = () => {
//     if (!brandsdata || !Array.isArray(brandsdata)) return [];
//     if (activeTab === 'Smartphones')
//       return brandsdata.filter(i => i.category === 'Mobile');
//     if (activeTab === 'Laptop')
//       return brandsdata.filter(i => i.category === 'Laptop');
//     return brandsdata;
//   };

//   const renderTabs = () => (
//     <View style={styles.tabContainer}>
//       {CATEGORIES.map(category => (
//         <TouchableOpacity key={category} onPress={() => setActiveTab(category)}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === category && styles.activeTabText,
//             ]}
//           >
//             {category}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   const ProductCard = ({ item }) => {
//     const wishlistItems = useSelector(state => state.wishlist.items);
//     // ✅ check product already in wishlist
//     const isInWishlist = wishlistItems.some(
//       w => w.barcode_id == item.barcode_id,
//     );
//     const handleWishlistToggle = () => {
//       if (isInWishlist) {
//         dispatch(removeFromWishlistAPI(item));
//       } else {
//         dispatch(addToWishlistAPI(item));
//       }
//     };

//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             product_barcode_id: item?.barcode_id,
//             product_barcode_price: item?.price,
//           })
//         }
//         style={ProductCardStyles.cardD}
//       >
//         {/* Image + Heart */}
//         <View style={ProductCardStyles.imageContainerD}>
//           {item && (
//             <Text style={ProductCardStyles.refurbishedLabelD}>
//               (Refurbished)
//             </Text>
//           )}

//           <Image
//             source={{ uri: item.feature_image }}
//             style={ProductCardStyles.imageD}
//           />

//           {/* ❤️ Wishlist Button */}
//           <TouchableOpacity
//             style={ProductCardStyles.heartIconD}
//             onPress={() => handleWishlistToggle()}
//           >
//             <AntDesign
//               name={isInWishlist ? 'heart' : 'hearto'}
//               size={moderateScale(20)}
//               color={isInWishlist ? '#E74C3C' : '#999'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Grade Box */}
//         <View style={ProductCardStyles.gradeBoxD}>
//           <Text style={ProductCardStyles.gradeTextD}>
//             Grade {item.grade_number}
//           </Text>
//         </View>

//         {/* Product Info */}
//         <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
//         <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
//         <View style={ProductCardStyles.priceRowD}>
//           <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <Header
//         title={brandname}
//         navigation={navigation}
//         showSearch
//         showBack={true}
//       />
//       <ScrollView>
//         {renderTabs()}

//         {/* {getFilteredProducts().length > 0 ? (
//           <FlatList
//             data={getFilteredProducts()}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => <ProductCard item={item} />}
//             showsHorizontalScrollIndicator={false}
//             numColumns={2}
//             contentContainerStyle={{
//               paddingHorizontal: moderateScale(10),
//               paddingBottom: moderateScale(80),
//               justifyContent:
//                 getFilteredProducts().length === 1
//                   ? 'flex-start'
//                   : 'space-between',
//             }}
//           />
//         ) : (
//           <View style={styles.emptyContainer}>
//             <Image
//               source={require('../../../../assets/images/emptyproduct.png')}
//               style={styles.emptyImage}
//             />
//             <Text style={styles.emptyTitle}>No Products Available</Text>
//             <Text style={styles.emptySubtitle}>
//               We couldn’t find matching products right now. Try exploring other
//               options or adjust filters.
//             </Text>
//           </View>
//         )} */}
//         {loading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 50,
//             }}
//           >
//             <ActivityLoader size="large" color="#11A5D7" />
//           </View>
//         ) : getFilteredProducts().length > 0 ? (
//           <FlatList
//             data={getFilteredProducts()}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => <ProductCard item={item} />}
//             showsHorizontalScrollIndicator={false}
//             numColumns={2}
//             contentContainerStyle={{
//               paddingHorizontal: moderateScale(10),
//               paddingBottom: moderateScale(80),
//               justifyContent:
//                 getFilteredProducts().length === 1
//                   ? 'flex-start'
//                   : 'space-between',
//             }}
//           />
//         ) : (
//           <View style={styles.emptyContainer}>
//             <Image
//               source={require('../../../../assets/images/emptyproduct.png')}
//               style={styles.emptyImage}
//             />
//             <Text style={styles.emptyTitle}>No Products Available</Text>
//             <Text style={styles.emptySubtitle}>
//               We couldn’t find matching products right now. Try exploring other
//               options or adjust filters.
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: responsiveHeight(1.5),
//   },
//   tabText: {
//     fontSize: responsiveFontSize(2),
//     color: 'gray',
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#000',
//     borderBottomWidth: 2,
//     borderColor: '#000',
//     paddingBottom: responsiveHeight(0.5),
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   imageContainer: {
//     width: '100%',
//     height: '65%',
//     backgroundColor: '#f4f4f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   refurbishedLabel: {
//     position: 'absolute',
//     top: responsiveHeight(1),
//     backgroundColor: '#EAE6E5',
//     paddingHorizontal: responsiveWidth(2),
//     paddingVertical: responsiveHeight(0.5),
//     borderRadius: 6,
//     fontSize: responsiveFontSize(1.6),
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: responsiveHeight(1),
//     right: responsiveWidth(2),
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 5,
//   },
//   gradeText: {
//     fontSize: responsiveFontSize(1.6),
//     fontWeight: '500',
//     marginTop: responsiveHeight(0.5),
//     marginLeft: responsiveWidth(2),
//     color: '#555',
//   },
//   productName: {
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: 'bold',
//     marginTop: responsiveHeight(0.5),
//     marginLeft: responsiveWidth(2),
//     color: '#000',
//   },
//   colorText: {
//     fontSize: responsiveFontSize(1.6),
//     marginLeft: responsiveWidth(2),
//     color: '#000',
//     marginBottom: responsiveHeight(0.5),
//   },
//   price: {
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: 'bold',
//     marginLeft: responsiveWidth(2),
//     marginBottom: responsiveHeight(1),
//     color: '#000',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: responsiveHeight(0),
//     paddingHorizontal: responsiveWidth(5),
//   },
//   emptyImage: {
//     width: responsiveWidth(35),
//     height: responsiveWidth(35),
//     resizeMode: 'contain',
//     marginBottom: responsiveHeight(2),
//   },
//   emptyTitle: {
//     fontSize: responsiveFontSize(2.2),
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: responsiveHeight(1),
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: responsiveFontSize(1.6),
//     color: '#666',
//     textAlign: 'center',
//   },
//   badgeTextD: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//     fontWeight: 'bold',
//   },
//   gradeBoxD: {
//     paddingVertical: verticalScale(2),
//     position: 'absolute',
//     marginTop: verticalScale(232),
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     width: '100%',
//     borderRadius: moderateScale(10),
//     borderWidth: 0.2,
//   },
//   gradeTextD: {
//     fontSize: moderateScale(12),
//     fontWeight: '500',
//     color: '#555',
//     textAlign: 'center',
//   },
//   productNameD: {
//     fontSize: moderateScale(12),
//     fontWeight: 'bold',
//     marginTop: verticalScale(6),
//     marginHorizontal: scale(5),
//     color: '#000',
//   },
//   colorTextD: {
//     fontSize: moderateScale(13),
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
//     fontSize: moderateScale(14),
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: scale(6),
//   },
//   originalPriceD: {
//     fontSize: moderateScale(13),
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
//   refurbishedLabelD: {
//     alignSelf: 'center',
//     fontSize: moderateScale(12),
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '100%',
//     textAlign: 'center',
//     paddingVertical: verticalScale(5),
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
//   listContainerD: { padding: moderateScale(10) },
//   cardD: {
//     width: width / 2.2,
//     borderRadius: moderateScale(12),
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowRadius: moderateScale(4),
//     marginHorizontal: moderateScale(2),
//     borderWidth: moderateScale(0.5),
//     backgroundColor: '#fff',
//   },
// });

// export default shopbybrandfilter;

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { ProductCardStyles } from '../../../constants/ProductCardStyles';
import Header from '../../../constants/Header';
import ActivityLoader from '../../../constants/Loader';
import { API_BASE_URL } from '../../../utils/utils';
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from '../../../redux/slices/wishlistSlice';
import { fetchCatList } from '../../../redux/slices/homeSlice';
import { useFocusEffect } from '@react-navigation/native';

const shopbybrandfilter = ({ navigation, route }) => {
  const { brandname, catName, osName, catId } = route?.params;
  const [brandsData, setBrandsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(catName);
  const { catList, osList } = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    if (filteredBrands && filteredBrands.length > 0) {
      setPage(1);
      setPaginatedData(filteredBrands.slice(0, ITEMS_PER_PAGE));
    } else {
      setPaginatedData([]);
    }
  }, [filteredBrands]);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const nextItems = filteredBrands.slice(start, end);

    if (nextItems.length > 0) {
      setPaginatedData(prev => [...prev, ...nextItems]);
      setPage(nextPage);
    }
  };

  const filteredBrands = brandsData?.filter(item => {
    return item?.category === activeTab?.category_name;
  });

  // API call per tab
  const fetchBrandsDetails = async category => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/productlistbrand/${brandname}`,
      );
      setBrandsData(res?.data?.data || []);
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch

  useFocusEffect(
    useCallback(() => {
      fetchBrandsDetails(activeTab);
      fetchCatList();
    }, [brandname]),
  );

  // Tab change handler
  const handleTabChange = category => {
    setActiveTab(category);
    fetchBrandsDetails(category);
  };

  useEffect(() => {
    if (catList?.length > 0 && catName) {
      const defaultTab = catList.find(item => item.category_name === catName);

      if (defaultTab) {
        setActiveTab(defaultTab); // ← DEFAULT SELECTED TAB SET
      } else {
        setActiveTab(catList[0]); // fallback
      }
    }
  }, [catList, catName]);

  const ProductCard = ({ item }) => {
    const wishlistItems = useSelector(state => state.wishlist.items);
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
            product_barcode_price: item?.price,
          })
        }
        style={ProductCardStyles.cardD}
      >
        <View style={ProductCardStyles.imageContainerD}>
          {item && (
            <Text style={ProductCardStyles.refurbishedLabelD}>
              (Refurbished)
            </Text>
          )}

          <Image
            source={{ uri: item.feature_image }}
            style={ProductCardStyles.imageD}
          />

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

        {/* <View style={ProductCardStyles.gradeBoxD}> */}
        <Text style={ProductCardStyles.gradeTextD}>
          Grade {item.grade_number}
        </Text>
        {/* </View> */}

        <Text style={ProductCardStyles.productNameD}>{item.model_name}</Text>
        <Text style={ProductCardStyles.colorTextD}>● {item.color_name}</Text>
        <View style={ProductCardStyles.priceRowD}>
          <Text style={ProductCardStyles.priceD}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={brandname}
        navigation={navigation}
        showSearch
        showBack={true}
      />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {catList.map((category, index) => (
          <TouchableOpacity
            key={category.id || index}
            style={styles.tabButton}
            onPress={() => handleTabChange(category)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab?.id === category.id && styles.activeTabText,
              ]}
            >
              {category.category_name}
            </Text>

            {activeTab?.id === category.id && (
              <View style={styles.activeUnderline} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Loader / Product List / Empty */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityLoader size="large" color="#11A5D7" />
        </View>
      ) : filteredBrands.length > 0 ? (
        <FlatList
          data={paginatedData} // <-- use paginatedData
          keyExtractor={(item, index) => index.toString()} // fallback
          renderItem={({ item }) => <ProductCard item={item} />}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          onEndReached={loadMore} // <-- auto load more
          onEndReachedThreshold={0.5} // <-- triggers when 50% from bottom
          contentContainerStyle={{
            paddingHorizontal: moderateScale(15),
            paddingBottom: moderateScale(80),
            justifyContent:
              paginatedData.length === 1 ? 'flex-start' : 'space-between',
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../../assets/images/emptyproduct.png')}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>No Products Available</Text>
          <Text style={styles.emptySubtitle}>
            We couldn’t find matching products right now. Try exploring other
            options or adjust filters.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: responsiveHeight(1.5),
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: 'gray',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
    borderBottomWidth: 2,
    borderColor: '#000',
    paddingBottom: responsiveHeight(0.5),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
  },
  emptyImage: {
    width: responsiveWidth(35),
    height: responsiveWidth(35),
    resizeMode: 'contain',
    marginBottom: responsiveHeight(2),
  },
  emptyTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveHeight(1),
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#666',
    textAlign: 'center',
  },
});

export default shopbybrandfilter;
