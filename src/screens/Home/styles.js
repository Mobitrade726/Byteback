// // // import {Dimensions, Platform, StyleSheet} from 'react-native';
// // // import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
// // // const {width} = Dimensions.get('window');
// // // const CARD_MARGIN = 16;
// // // const cardWidth = (width - CARD_MARGIN * 3) / 2;

// // // const styles = StyleSheet.create({
// // //   listContainerD: {
// // //     padding: moderateScale(10),
// // //   },
// // //   cardD: {
// // //     width: scale(200),
// // //     backgroundColor: '#fff',
// // //     borderRadius: moderateScale(12),
// // //     marginRight: scale(15),
// // //     overflow: 'hidden',
// // //     shadowColor: '#000',
// // //     shadowRadius: moderateScale(4),
// // //   },
// // //   cardM: {
// // //     width: scale(200),
// // //     backgroundColor: '#fff',
// // //     borderRadius: moderateScale(12),
// // //     marginRight: 0,
// // //     overflow: 'hidden',
// // //     shadowColor: '#000',
// // //     shadowRadius: moderateScale(4),
// // //   },
// // //   imageContainerD: {
// // //     position: 'relative',
// // //     backgroundColor: '#f4f4f4',
// // //   },
// // //   imageD: {
// // //     width: '100%',
// // //     height: verticalScale(250),
// // //     resizeMode: 'stretch',
// // //   },
// // //   imageM: {
// // //     width: '90%',
// // //     height: verticalScale(200),
// // //     resizeMode: 'stretch',
// // //   },
// // //   refurbishedLabelD: {
// // //     position: 'absolute',
// // //     alignSelf: 'center',
// // //     fontSize: moderateScale(12),
// // //     color: '#000',
// // //     backgroundColor: '#EAE6E5',
// // //     width: '98%',
// // //     textAlign: 'center',
// // //     padding: moderateScale(5),
// // //   },
// // //   heartIconD: {
// // //     position: 'absolute',
// // //     top: verticalScale(25),
// // //     right: scale(6),
// // //     backgroundColor: '#fff',
// // //     borderRadius: moderateScale(20),
// // //     padding: moderateScale(5),
// // //     elevation: 2,
// // //   },
// // //   badge: {
// // //     position: 'absolute',
// // //     left: scale(-8),
// // //     top: verticalScale(10),
// // //     backgroundColor: '#FF3C3C',
// // //     paddingHorizontal: scale(6),
// // //     paddingVertical: verticalScale(2),
// // //     borderRadius: moderateScale(10),
// // //   },
// // //   badgeTextD: {
// // //     color: '#fff',
// // //     fontSize: moderateScale(12),
// // //     fontWeight: 'bold',
// // //   },
// // //   gradeBoxD: {
// // //     paddingVertical: verticalScale(2),
// // //     position: 'absolute',
// // //     marginTop: verticalScale(225),
// // //     alignSelf: 'center',
// // //     backgroundColor: '#fff',
// // //     width: '92%',
// // //     borderRadius: moderateScale(10),
// // //     borderWidth: 0.2,
// // //   },
// // //   gradeTextD: {
// // //     fontSize: moderateScale(12),
// // //     fontWeight: '500',
// // //     color: '#555',
// // //     textAlign: 'center',
// // //   },
// // //   productNameD: {
// // //     fontSize: moderateScale(14),
// // //     fontWeight: 'bold',
// // //     marginTop: verticalScale(6),
// // //     marginHorizontal: scale(10),
// // //     color: '#000',
// // //   },
// // //   colorTextD: {
// // //     fontSize: moderateScale(13),
// // //     color: '#000',
// // //     marginHorizontal: scale(10),
// // //     marginTop: verticalScale(2),
// // //   },
// // //   priceRowD: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginHorizontal: scale(10),
// // //     marginTop: verticalScale(4),
// // //     marginBottom: verticalScale(10),
// // //   },
// // //   priceD: {
// // //     fontSize: moderateScale(14),
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //     marginRight: scale(6),
// // //   },
// // //   originalPriceD: {
// // //     fontSize: moderateScale(13),
// // //     color: '#888',
// // //     textDecorationLine: 'line-through',
// // //   },
// // leftContainer: {
// //   flex: 1,
// //   paddingRight: scale(10),
// // },
// // heading: {
// //   fontSize: moderateScale(22),
// //   fontWeight: 'bold',
// //   color: '#1A1A1A',
// //   marginBottom: verticalScale(6),
// // },
// // subheading: {
// //   fontSize: moderateScale(18),
// //   fontWeight: '500',
// //   color: '#333',
// //   marginBottom: verticalScale(8),
// // },
// // description: {
// //   fontSize: moderateScale(16),
// //   color: '#7E7E7E',
// //   marginBottom: verticalScale(20),
// // },
// // button: {
// //   backgroundColor: '#EAE8E8',
// //   paddingVertical: verticalScale(12),
// //   paddingHorizontal: scale(24),
// //   borderRadius: moderateScale(16),
// //   alignSelf: 'flex-start',
// // },
// // buttonText: {
// //   fontSize: moderateScale(16),
// //   color: '#000',
// //   fontWeight: '600',
// // },
// // imageG: {
// //   width: width * 0.3,
// //   height: width * 0.3,
// // },

// // //   container: {flex: 1, backgroundColor: 'white'},

// // //   swiper: {
// // //     height: verticalScale(220),
// // //   },
// // //   card_Top: {
// // //     width: width - scale(15),
// // //     marginHorizontal: scale(20),
// // //     height: verticalScale(200),
// // //     borderRadius: moderateScale(16),
// // //     overflow: 'hidden',
// // //     alignSelf: 'center',
// // //   },
// // //   image: {
// // //     resizeMode: 'stretch',
// // //     borderRadius: moderateScale(16),
// // //   },
// // //   textContainer: {
// // //     flex: 1,
// // //   },
// // //   titleT: {
// // //     fontSize: moderateScale(12),
// // //     color: '#fff',
// // //   },
// // //   subtitleT: {
// // //     fontSize: moderateScale(14),
// // //     color: '#fff',
// // //     fontWeight: '600',
// // //   },

// // //   dot: {
// // //     backgroundColor: '#aaa',
// // //     width: scale(6),
// // //     height: scale(6),
// // //     borderRadius: scale(3),
// // //     margin: scale(3),
// // //   },

// // //   activeDot: {
// // //     backgroundColor: '#fff',
// // //     width: scale(8),
// // //     height: scale(8),
// // //     borderRadius: scale(4),
// // //     margin: scale(3),
// // //   },
// // //   badgeText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //     fontSize: 12,
// // //   },

// // //   headerRow_r: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginBottom: 10,
// // //   },
// // //   header_r: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //   },
// // //   link_r: {
// // //     fontSize: 15,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   ratingRow_r: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 10,
// // //     marginBottom: 15,
// // //   },
// // //   rating_r: {
// // //     fontSize: 48,
// // //     fontWeight: 'bold',
// // //   },
// // //   totalReviews_r: {
// // //     fontWeight: 'bold',
// // //     fontSize: 13,
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   card_r: {
// // //     backgroundColor: '#ecfeff',
// // //     padding: 15,
// // //     borderBottomWidth: 1,
// // //     borderColor: '#ccc',
// // //     borderRadius: 4,
// // //     marginBottom: 8,
// // //   },
// // //   cardHeader_r: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   cardTitle_r: {
// // //     fontWeight: 'bold',
// // //     fontSize: 15,
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   ratingText_r: {
// // //     fontWeight: 'bold',
// // //     color: '#22c55e',
// // //   },
// // //   message_r: {
// // //     color: '#11A5D7',
// // //     marginVertical: 5,
// // //     fontWeight: 'regular',
// // //   },
// // //   userInfo_r: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   userText_r: {
// // //     marginLeft: 4,
// // //     fontWeight: 'bold',
// // //     fontFamily: 'Source Serif 4',
// // //   },

// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     padding: 5,
// // //     backgroundColor: '#1C9C48',
// // //   },
// // //   logo: {width: 80, height: 58},
// // //   hero: {height: 400, marginBottom: 50},
// // //   overlay: {
// // //     flex: 1,
// // //     // backgroundColor: 'rgba(0, 100, 0, 0.4)',
// // //     justifyContent: 'center',
// // //     paddingLeft: '10%',
// // //   },
// // //   subtitle: {
// // //     color: '#fff',
// // //     fontSize: 17,
// // //     marginBottom: 10,
// // //     fontFamily: 'Source Serif 4',
// // //     fontWeight: 'bold',
// // //   },
// // //   title: {fontSize: 48, fontWeight: 'bold', marginBottom: 20},
// // //   shopBtn: {
// // //     borderRadius: 16,
// // //     width: '30%',
// // //     height: 40,
// // //   },
// // //   shopBtnText: {
// // //     color: '#fff',
// // //     fontSize: 14,
// // //     fontWeight: 'bold',
// // //     textAlign: 'center',
// // //     fontFamily: 'Source Serif 4',
// // //     marginTop: 8,
// // //   },
// // //   scrollView: {paddingBottom: 20},
// // //   cardWrapper_g: {
// // //     width: width * 0.42,
// // //     marginRight: 15,
// // //     borderRadius: 20,
// // //     backgroundColor: '#fff',
// // //     overflow: 'hidden',
// // //     shadowColor: 'rgba(0,0,0,0.5)', // shadow
// // //     shadowRadius: 5,
// // //     shadowOpacity: 0.3,
// // //     shadowOffset: {width: 0, height: 2},
// // //     elevation: 5,
// // //     marginHorizontal: 15,
// // //   },
// // //   card_g: {
// // //     backgroundColor: '#fff',
// // //     borderRadius: 20,
// // //   },
// // //   imageBackground_g: {
// // //     width: '100%',
// // //     height: 200,
// // //     resizeMode: 'stretch',
// // //     justifyContent: 'flex-end',
// // //   },
// // //   gradientBox_g: {
// // //     justifyContent: 'center',
// // //     borderBottomLeftRadius: 20,
// // //     borderBottomRightRadius: 20,
// // //     height: 50,
// // //   },
// // //   productName_g: {
// // //     color: '#fff',
// // //     fontWeight: '600',
// // //     fontSize: 14,
// // //     marginLeft: 10,
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   search: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     borderWidth: 1,
// // //     borderColor: 'grey',
// // //     borderRadius: 30,
// // //     paddingHorizontal: 15,
// // //     marginBottom: 0,
// // //     height: 50,
// // //     marginTop: 10,
// // //     marginHorizontal: 10,
// // //   },
// // //   searchIcon: {marginRight: 10},
// // //   micIcon: {marginLeft: 'auto'},
// // //   textInput: {flex: 1, fontSize: 16},
// // //   grid: {marginTop: 0},
// // //   card: {
// // //     flex: 1,
// // //     padding: 90,
// // //     backgroundColor: '#fff',
// // //     borderWidth: 2,
// // //     borderRadius: 10,
// // //     borderColor: '#000',
// // //     marginHorizontal: 8,
// // //   },
// // //   imageIcon: {
// // //     fontSize: 20,
// // //     alignSelf: 'center',
// // //   },
// // //   cardTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
// // //   cardDesc: {fontSize: 14, color: 'grey'},
// // //   tabContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     borderBottomWidth: 1,
// // //     paddingBottom: 10,
// // //     marginTop: 10,
// // //   },
// // //   tabText: {
// // //     fontWeight: 'bold',
// // //     color: 'gray',
// // //     fontSize: 15,
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
// // //   productList: {padding: 10},
// // //   productCard: {
// // //     flex: 1,
// // //     borderWidth: 2,
// // //     borderColor: '#000',
// // //     margin: 5,
// // //     padding: 10,
// // //     borderRadius: 10,
// // //   },
// // //   productName: {
// // //     fontWeight: 'semibold',
// // //     fontSize: 14,
// // //     fontFamily: 'Source Serif 4',
// // //     marginBottom: 5,
// // //   },
// // //   productPrice: {fontSize: 14, color: 'gray', marginBottom: 8},
// // //   seeMore: {
// // //     textAlign: 'center',
// // //     color: '#00AEEF',
// // //     fontWeight: 'bold',
// // //     marginVertical: 10,
// // //     fontSize: 16,
// // //   },
// // //   header1: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
// // //   title1: {color: '#00AEEF', fontSize: 20, fontWeight: 'bold', flex: 1},
// // //   arrow1: {color: '#00AEEF', fontSize: 22},
// // //   productList1: {paddingVertical: 10},
// // //   storage: {color: 'gray', marginBottom: 4},
// // //   quantityContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginBottom: 10,
// // //   },
// // //   quantityButton: {
// // //     padding: 5,
// // //     backgroundColor: '#fff',
// // //     borderWidth: 2,
// // //     borderColor: '#1C9C48',
// // //     borderRadius: 4,
// // //   },
// // //   quantityBox: {
// // //     width: 80,
// // //     height: 32,
// // //     marginHorizontal: 6,
// // //     backgroundColor: '#1C9C48',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     borderRadius: 4,
// // //   },
// // //   quantityText: {fontSize: 18, color: '#1C9C48', fontWeight: 'semibold'},
// // //   quantityNumber: {
// // //     color: '#fff',
// // //     fontSize: 17,
// // //     fontWeight: 'semibold',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   buyButton: {
// // //     backgroundColor: '#00A94F',
// // //     paddingVertical: 8,
// // //     paddingHorizontal: 30,
// // //     borderRadius: 4,
// // //   },
// // //   buyButtonText: {
// // //     color: '#fff',
// // //     textAlign: 'center',
// // //     fontWeight: 'semibold',
// // //     fontWeight: 'semibold',
// // //     fontFamily: 'Source Serif 4',
// // //   },
// // //   searchWrapper: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     padding: 10,
// // //     borderRadius: 30,
// // //     margin: 10,
// // //     shadowColor: '#000',
// // //     shadowOffset: {width: 0, height: 2},
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 4,
// // //     elevation: 3,
// // //   },
// // //   searchBox: {
// // //     flex: 1,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: 'white',
// // //     borderRadius: 16,
// // //     paddingLeft: 15,
// // //     marginRight: 10,
// // //     borderWidth: 2,
// // //   },
// // //   textInput_search: {
// // //     flex: 1,
// // //     paddingVertical: 10,
// // //     color: ' #000',
// // //     fontFamily: 'Source Serif 4',
// // //     fontSize: 16,
// // //   },
// // //   icon: {
// // //     padding: 10,
// // //   },
// // //   searchBtn: {
// // //     padding: 10,
// // //     borderRadius: 30,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   imagePlaceholder: {
// // //     width: 160,
// // //     height: 100,
// // //     backgroundColor: '#eee',
// // //     justifyContent: 'center',
// // //     alignSelf: 'center',
// // //     marginBottom: 10,
// // //     borderWidth: 1,
// // //     borderColor: '#aaa',
// // //   },
// // //   phoneCard: {
// // //     width: width,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   phoneImage: {
// // //     width: '100%',
// // //     height: 220,
// // //   },
// // //   offerList: {
// // //     marginTop: 10,
// // //     gap: 0,
// // //   },
// // //   offerCard: {
// // //     width: width * 0.4,
// // //     height: 173,
// // //     borderRadius: 10,
// // //     padding: 20,
// // //     marginRight: 12,
// // //     justifyContent: 'center',
// // //     overflow: 'hidden', // ensure image respects borderRadius
// // //   },
// // //   offerImageBackground: {
// // //     borderRadius: 10,
// // //     resizeMode: 'cover',
// // //     opacity: 0.9, // optional for slight dimming
// // //   },
// // //   offerTitle: {
// // //     fontWeight: 'semibold',
// // //     fontSize: 15,
// // //     color: '#fff',
// // //     marginBottom: 0,
// // //     color: '#000',
// // //     fontFamily: 'Source Serif 4',
// // //     marginTop: 100,
// // //   },
// // //   offerSubtitle: {
// // //     fontSize: 13,
// // //     color: '#fff',
// // //     fontWeight: 'regular',
// // //     color: '#000',
// // //   },
// // //   greenButton: {
// // //     backgroundColor: '#16a34a',
// // //     borderRadius: 10,
// // //     paddingVertical: 15,
// // //     alignItems: 'center',
// // //     marginTop: 30,
// // //   },
// // //   greenButtonText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //     fontSize: 16,
// // //   },
// // //   darkButton: {
// // //     backgroundColor: '#1e1e1e',
// // //     borderRadius: 10,
// // //     paddingVertical: 15,
// // //     alignItems: 'center',
// // //     marginTop: 15,
// // //   },
// // //   darkButtonText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //     fontSize: 16,
// // //   },
// // //   timerWrapper: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     marginHorizontal: 10,
// // //   },
// // //   timeContainer: {
// // //     alignItems: 'center',
// // //   },
// // //   timeBox: {
// // //     backgroundColor: '#E6F5EA',
// // //     paddingVertical: 20,
// // //     paddingHorizontal: 25,
// // //     borderRadius: 12,
// // //     marginBottom: 5,
// // //   },
// // //   timeValue: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //     color: '#000',
// // //   },
// // //   timeLabel: {
// // //     fontSize: 14,
// // //     color: '#000',
// // //     fontWeight: '500',
// // //   },
// // //   card_bulk: {
// // //     width: width,
// // //     paddingHorizontal: 20,
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //   },
// // //   cardContent_bulk: {
// // //     backgroundColor: '#eee',
// // //     borderRadius: 16,
// // //     padding: 20,
// // //     flex: 1,
// // //     marginRight: 10,
// // //   },
// // //   tag_bulk: {
// // //     fontSize: 13,
// // //     color: '#666',
// // //     marginBottom: 5,
// // //   },
// // //   title_bulk: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: '#111',
// // //     marginBottom: 4,
// // //   },
// // //   subtitle_bulk: {
// // //     fontSize: 14,
// // //     color: '#444',
// // //   },
// // //   iconBtn_bulk: {
// // //     width: 50,
// // //     height: 50,
// // //     backgroundColor: '#222',
// // //     borderRadius: 25,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   dotsContainer_bulk: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'center',
// // //     marginTop: 15,
// // //   },
// // //   dot_bulk: {
// // //     width: 10,
// // //     height: 10,
// // //     borderRadius: 5,
// // //     borderWidth: 1,
// // //     borderColor: '#00AEEF',
// // //     marginHorizontal: 5,
// // //   },
// // //   activeDot_bulk: {
// // //     backgroundColor: '#00AEEF',
// // //   },

// // //   cardDO: {
// // //     width: width * 0.9,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 16,
// // //     alignSelf: 'center',
// // //     marginVertical: 10,
// // //     overflow: 'hidden',
// // //     ...Platform.select({
// // //       ios: {
// // //         shadowColor: '#000',
// // //         shadowOffset: {width: 0, height: 4},
// // //         shadowOpacity: 0.12,
// // //         shadowRadius: 8,
// // //         borderWidth: 0.2,
// // //       },
// // //       android: {
// // //         elevation: 4,
// // //       },
// // //     }),
// // //   },

// // //   imageDO: {
// // //     width: '100%',
// // //     height: 180,
// // //     borderTopLeftRadius: 16,
// // //     borderTopRightRadius: 16,
// // //   },
// // //   contentDO: {
// // //     padding: 16,
// // //   },
// // //   titleDO: {
// // //     fontSize: 20,
// // //     fontWeight: '600',
// // //     color: '#222',
// // //     marginBottom: 6,
// // //   },
// // //   subtitleDO: {
// // //     fontSize: 15,
// // //     color: '#666',
// // //     marginBottom: 20,
// // //     lineHeight: 22,
// // //   },
// // //   buttonDO: {
// // //     backgroundColor: '#03A9F4',
// // //     borderRadius: 30,
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 20,
// // //     alignSelf: 'flex-start',
// // //     ...Platform.select({
// // //       ios: {
// // //         shadowColor: '#03A9F4',
// // //         shadowOffset: {width: 0, height: 2},
// // //         shadowOpacity: 0.2,
// // //         shadowRadius: 4,
// // //       },
// // //       android: {
// // //         elevation: 2,
// // //       },
// // //     }),
// // //   },
// // //   buttonTextDO: {
// // //     color: '#fff',
// // //     fontWeight: '600',
// // //     fontSize: 14,
// // //   },

// // //   gridSD: {
// // //     paddingHorizontal: CARD_MARGIN,
// // //     paddingTop: 20,
// // //     paddingBottom: 0,
// // //   },
// // //   rowSD: {
// // //     justifyContent: 'space-between',
// // //     marginBottom: CARD_MARGIN,
// // //   },
// // //   cardSD: {
// // //     width: cardWidth,
// // //     backgroundColor: '#F3F3F3',
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     marginTop: 0,
// // //   },
// // //   iconCircleSD: {
// // //     backgroundColor: '#23A455',
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     marginBottom: 12,
// // //   },
// // //   cardTitleSD: {
// // //     fontSize: 14,
// // //     fontWeight: '700',
// // //     color: '#111',
// // //     marginBottom: 6,
// // //   },
// // //   cardDescriptionSD: {
// // //     fontSize: 13,
// // //     color: '#666',
// // //     lineHeight: 18,
// // //   },

// // //   containerSUPPORT_CARDS: {
// // //     paddingHorizontal: 0,
// // //     paddingTop: 12,
// // //     paddingBottom: 24,
// // //   },
// // //   cardSUPPORT_CARDS: {
// // //     backgroundColor: '#ECE9E8', // soft gray from screenshot
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     marginBottom: 16,
// // //   },
// // //   iconCircleSUPPORT_CARDS: {
// // //     backgroundColor: '#23A455',
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     marginBottom: 12,
// // //   },
// // //   cardTitleSUPPORT_CARDS: {
// // //     fontSize: 14,
// // //     fontWeight: '700',
// // //     color: '#111',
// // //     marginBottom: 6,
// // //   },
// // //   cardDescriptionSUPPORT_CARDS: {
// // //     fontSize: 13,
// // //     color: '#666',
// // //     lineHeight: 18,
// // //   },

// // //   categoryCard: {
// // //     alignItems: 'center',
// // //     marginRight: 12,
// // //     marginHorizontal: 15,
// // //     marginTop: 10,
// // //   },
// // //   categoryImage: {
// // //     width: 70,
// // //     height: 70,
// // //     resizeMode: 'contain',
// // //   },
// // //   categoryText: {
// // //     marginTop: 6,
// // //     fontSize: 12,
// // //     color: '#222',
// // //   },
// // //   banner: {
// // //     width: '100%',
// // //     height: 200,
// // //     justifyContent: 'flex-end',
// // //   },
// // //   bannerOverlay: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     backgroundColor: 'rgba(0,0,0,0.3)',
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 8,
// // //     borderBottomLeftRadius: 12,
// // //     borderBottomRightRadius: 12,
// // //   },
// // //   bannerText: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     color: '#fff',
// // //   },
// // // });

// // // const stylesSupport = StyleSheet.create({
// // //   container: {
// // //     // position: 'absolute',
// // //     bottom: 30,
// // //     right: 20,
// // //     alignItems: 'flex-end',
// // //     marginTop: 50,
// // //   },
// // //   menu: {
// // //     backgroundColor: '#fff',
// // //     padding: 15,
// // //     borderRadius: 16,
// // //     marginBottom: 10,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     elevation: 5,
// // //   },
// // //   menuItem: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     marginVertical: 4,
// // //     color: '#1e1e1e',
// // //   },
// // //   floatingButton: {
// // //     backgroundColor: '#0ea5e9',
// // //     width: 60,
// // //     height: 60,
// // //     borderRadius: 30,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   badge: {
// // //     position: 'absolute',
// // //     bottom: -4,
// // //     right: -4,
// // //     backgroundColor: '#f97316',
// // //     borderRadius: 10,
// // //     paddingHorizontal: 6,
// // //     paddingVertical: 2,
// // //   },
// // //   badgeText: {
// // //     color: 'white',
// // //     fontWeight: 'bold',
// // //     fontSize: 12,
// // //   },
// // // });

// // // export {styles, stylesSupport};

// // import {Dimensions, Platform, StyleSheet} from 'react-native';
// // import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// // const {width} = Dimensions.get('window');
// // const CARD_MARGIN = moderateScale(16);
// // const cardWidth = (width - CARD_MARGIN * 3) / 2;

// // const styles = StyleSheet.create({
// //   container: {flex: 1, backgroundColor: '#fff'},
// //   scrollView: {paddingBottom: verticalScale(20)},

// //   // Swiper / Hero
// //   swiper: {height: verticalScale(220)},
// //   card_Top: {
// //     width: width - scale(15),
// //     marginHorizontal: scale(20),
// //     height: verticalScale(200),
// //     borderRadius: moderateScale(16),
// //     overflow: 'hidden',
// //     alignSelf: 'center',
// //   },
// //   image: {resizeMode: 'stretch', borderRadius: moderateScale(16)},
// //   textContainer: {flex: 1},
// //   titleT: {fontSize: moderateScale(12), color: '#fff'},
// //   subtitleT: {fontSize: moderateScale(14), color: '#fff', fontWeight: '600'},
// //   dot: {backgroundColor: '#aaa', width: scale(6), height: scale(6), borderRadius: scale(3), margin: scale(3)},
// //   activeDot: {backgroundColor: '#fff', width: scale(8), height: scale(8), borderRadius: scale(4), margin: scale(3)},

// //   // Header
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: moderateScale(5),
// //     backgroundColor: '#1C9C48',
// //   },
// //   logo: {width: moderateScale(80), height: verticalScale(58)},

// //   // Hero overlay
// //   hero: {height: verticalScale(400), marginBottom: verticalScale(50)},
// //   overlay: {flex: 1, justifyContent: 'center', paddingLeft: '10%'},
// //   subtitle: {color: '#fff', fontSize: moderateScale(17), marginBottom: verticalScale(10), fontWeight: 'bold'},
// //   title: {fontSize: moderateScale(48), fontWeight: 'bold', marginBottom: verticalScale(20)},
// //   shopBtn: {borderRadius: moderateScale(16), width: '30%', height: verticalScale(40)},
// //   shopBtnText: {color: '#fff', fontSize: moderateScale(14), fontWeight: 'bold', textAlign: 'center', marginTop: verticalScale(8)},

// //   // Product Cards / List
// //   listContainerD: {padding: moderateScale(10)},
// //   cardD: {
// //     width: scale(200),
// //     backgroundColor: '#fff',
// //     borderRadius: moderateScale(12),
// //     marginRight: scale(15),
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowRadius: moderateScale(4),
// //   },
// //   cardM: {...this.cardD, marginRight: 0},
// //   imageContainerD: {position: 'relative', backgroundColor: '#f4f4f4'},
// //   imageD: {width: '100%', height: verticalScale(250), resizeMode: 'stretch'},
// //   imageM: {width: '100%', height: verticalScale(200), resizeMode: 'stretch'},
// //   refurbishedLabelD: {
// //     position: 'absolute',
// //     alignSelf: 'center',
// //     fontSize: moderateScale(12),
// //     color: '#000',
// //     backgroundColor: '#EAE6E5',
// //     width: '98%',
// //     textAlign: 'center',
// //     padding: moderateScale(5),
// //   },
// //   heartIconD: {
// //     position: 'absolute',
// //     top: verticalScale(25),
// //     right: scale(6),
// //     backgroundColor: '#fff',
// //     borderRadius: moderateScale(20),
// //     padding: moderateScale(5),
// //     elevation: 2,
// //   },

// //   // Badges
// //   badge: {position: 'absolute', left: scale(-8), top: verticalScale(10), backgroundColor: '#FF3C3C', paddingHorizontal: scale(6), paddingVertical: verticalScale(2), borderRadius: moderateScale(10)},
// //   badgeTextD: {color: '#fff', fontSize: moderateScale(12), fontWeight: 'bold'},

// //   // Grade Box
// //   gradeBoxD: {paddingVertical: verticalScale(2), position: 'absolute', marginTop: verticalScale(225), alignSelf: 'center', backgroundColor: '#fff', width: '92%', borderRadius: moderateScale(10), borderWidth: 0.2},
// //   gradeTextD: {fontSize: moderateScale(12), fontWeight: '500', color: '#555', textAlign: 'center'},

// //   // Product Info
// //   productNameD: {fontSize: moderateScale(14), fontWeight: 'bold', marginTop: verticalScale(6), marginHorizontal: scale(10), color: '#000'},
// //   colorTextD: {fontSize: moderateScale(13), color: '#000', marginHorizontal: scale(10), marginTop: verticalScale(2)},
// //   priceRowD: {flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(10), marginTop: verticalScale(4), marginBottom: verticalScale(10)},
// //   priceD: {fontSize: moderateScale(14), fontWeight: 'bold', color: '#000', marginRight: scale(6)},
// //   originalPriceD: {fontSize: moderateScale(13), color: '#888', textDecorationLine: 'line-through'},

// //   // Buttons
// //   button: {backgroundColor: '#EAE8E8', paddingVertical: verticalScale(12), paddingHorizontal: scale(24), borderRadius: moderateScale(16), alignSelf: 'flex-start'},
// //   buttonText: {fontSize: moderateScale(16), color: '#000', fontWeight: '600'},

// //   // Quantity Selector
// //   quantityContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(10)},
// //   quantityButton: {padding: moderateScale(5), backgroundColor: '#fff', borderWidth: 2, borderColor: '#1C9C48', borderRadius: moderateScale(4)},
// //   quantityBox: {width: scale(80), height: verticalScale(32), marginHorizontal: scale(6), backgroundColor: '#1C9C48', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(4)},
// //   quantityText: {fontSize: moderateScale(18), color: '#1C9C48', fontWeight: '600'},
// //   quantityNumber: {color: '#fff', fontSize: moderateScale(17), fontWeight: '600', fontFamily: 'Source Serif 4'},
// //   buyButton: {backgroundColor: '#00A94F', paddingVertical: verticalScale(8), paddingHorizontal: scale(30), borderRadius: moderateScale(4)},
// //   buyButtonText: {color: '#fff', textAlign: 'center', fontWeight: '600', fontFamily: 'Source Serif 4'},

// //   // Offer Cards
// //   offerList: {marginTop: verticalScale(10), gap: verticalScale(0)},
// //   offerCard: {width: width * 0.4, height: verticalScale(173), borderRadius: moderateScale(10), padding: moderateScale(20), marginRight: scale(12), justifyContent: 'center', overflow: 'hidden'},
// //   offerImageBackground: {borderRadius: moderateScale(10), resizeMode: 'cover', opacity: 0.9},
// //   offerTitle: {fontWeight: '600', fontSize: moderateScale(15), color: '#000', fontFamily: 'Source Serif 4', marginTop: verticalScale(100)},
// //   offerSubtitle: {fontSize: moderateScale(13), color: '#000'},

// //   // Bulk Cards
// //   card_bulk: {width, paddingHorizontal: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
// //   cardContent_bulk: {backgroundColor: '#eee', borderRadius: moderateScale(16), padding: moderateScale(20), flex: 1, marginRight: moderateScale(10)},
// //   tag_bulk: {fontSize: moderateScale(13), color: '#666', marginBottom: verticalScale(5)},
// //   title_bulk: {fontSize: moderateScale(20), fontWeight: 'bold', color: '#111', marginBottom: verticalScale(4)},
// //   subtitle_bulk: {fontSize: moderateScale(14), color: '#444'},
// //   iconBtn_bulk: {width: scale(50), height: scale(50), backgroundColor: '#222', borderRadius: scale(25), justifyContent: 'center', alignItems: 'center'},
// //   dotsContainer_bulk: {flexDirection: 'row', justifyContent: 'center', marginTop: verticalScale(15)},
// //   dot_bulk: {width: scale(10), height: scale(10), borderRadius: scale(5), borderWidth: 1, borderColor: '#00AEEF', marginHorizontal: scale(5)},
// //   activeDot_bulk: {backgroundColor: '#00AEEF'},

// //   // Support Cards
// //   containerSUPPORT_CARDS: {paddingHorizontal: 0, paddingTop: verticalScale(12), paddingBottom: verticalScale(24)},
// //   cardSUPPORT_CARDS: {backgroundColor: '#ECE9E8', borderRadius: moderateScale(16), padding: moderateScale(16), marginBottom: verticalScale(16)},
// //   iconCircleSUPPORT_CARDS: {backgroundColor: '#23A455', width: scale(36), height: scale(36), borderRadius: scale(18), alignItems: 'center', justifyContent: 'center', marginBottom: verticalScale(12)},
// //   cardTitleSUPPORT_CARDS: {fontSize: moderateScale(14), fontWeight: '700', color: '#111', marginBottom: verticalScale(6)},
// //   cardDescriptionSUPPORT_CARDS: {fontSize: moderateScale(13), color: '#666', lineHeight: verticalScale(18)},

// //   // Categories
// //   categoryCard: {alignItems: 'center', marginRight: scale(12), marginHorizontal: scale(5), marginTop: verticalScale(0)},
// //   categoryImage: {width: scale(70), height: scale(70), resizeMode: 'contain'},
// //   categoryText: {marginTop: verticalScale(6), fontSize: moderateScale(12), color: '#222'},

// //   // Banners
// //   banner: {width: '100%', height: verticalScale(200), justifyContent: 'flex-end'},
// //   bannerOverlay: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: scale(12), paddingVertical: verticalScale(8), borderBottomLeftRadius: moderateScale(12), borderBottomRightRadius: moderateScale(12)},
// //   bannerText: {fontSize: moderateScale(18), fontWeight: '600', color: '#fff'},
// // });

// // // Support Floating Button
// // const stylesSupport = StyleSheet.create({
// //   container: {bottom: verticalScale(30), right: scale(20), alignItems: 'flex-end', marginTop: verticalScale(50)},
// //   menu: {backgroundColor: '#fff', padding: moderateScale(15), borderRadius: moderateScale(16), marginBottom: verticalScale(10), shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5},
// //   menuItem: {fontSize: moderateScale(16), fontWeight: '600', marginVertical: verticalScale(4), color: '#1e1e1e'},
// //   floatingButton: {backgroundColor: '#0ea5e9', width: scale(60), height: scale(60), borderRadius: scale(30), justifyContent: 'center', alignItems: 'center'},
// //   badge: {position: 'absolute', bottom: -4, right: -4, backgroundColor: '#f97316', borderRadius: moderateScale(10), paddingHorizontal: scale(6), paddingVertical: verticalScale(2)},
// //   badgeText: {color: '#fff', fontWeight: 'bold', fontSize: moderateScale(12)},
// // });

// // export {styles, stylesSupport};

// import {Dimensions, Platform, StyleSheet} from 'react-native';
// import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// const {width} = Dimensions.get('window');
// const CARD_MARGIN = moderateScale(16);
// const cardWidth = (width - CARD_MARGIN * 3) / 2;

// // Product Card Base Style (to avoid duplication)
// const cardDBase = {
//   width: scale(180),
//   backgroundColor: '#fff',
//   borderRadius: moderateScale(12),
//   overflow: 'hidden',
//   shadowColor: '#000',
//   shadowRadius: moderateScale(4),
// };

// const styles = StyleSheet.create({
//   leftContainer: {
//     flex: 1,
//     paddingRight: scale(10),
//   },
//   container: {flex: 1, backgroundColor: '#fff'},
//   scrollView: {paddingBottom: verticalScale(20)},

//   heading: {
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     marginBottom: verticalScale(6),
//   },
//   subheading: {
//     fontSize: moderateScale(15),
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: verticalScale(8),
//   },
//   description: {
//     fontSize: moderateScale(15),
//     color: '#7E7E7E',
//     marginBottom: verticalScale(20),
//   },
//   button: {
//     backgroundColor: '#EAE8E8',
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: scale(24),
//     borderRadius: moderateScale(16),
//     alignSelf: 'flex-start',
//   },
//   buttonText: {
//     fontSize: moderateScale(16),
//     color: '#000',
//     fontWeight: '600',
//   },
//   imageG: {
//     width: width * 0.3,
//     height: width * 0.3,
//   },

//   // Swiper / Hero
//   swiper: {height: verticalScale(220)},
//   card_Top: {
//     width: width - scale(15),
//     marginHorizontal: scale(20),
//     height: verticalScale(200),
//     borderRadius: moderateScale(16),
//     overflow: 'hidden',
//     alignSelf: 'center',
//   },
//   image: {resizeMode: 'stretch', borderRadius: moderateScale(16)},
//   textContainer: {flex: 1},
//   titleT: {fontSize: moderateScale(12), color: '#fff'},
//   subtitleT: {fontSize: moderateScale(14), color: '#fff', fontWeight: '600'},
//   dot: {
//     backgroundColor: '#aaa',
//     width: scale(6),
//     height: scale(6),
//     borderRadius: scale(3),
//     margin: scale(3),
//   },
//   activeDot: {
//     backgroundColor: '#fff',
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     margin: scale(3),
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: moderateScale(5),
//     backgroundColor: '#1C9C48',
//   },
//   logo: {width: moderateScale(80), height: verticalScale(58)},

//   // Hero overlay
//   hero: {height: verticalScale(400), marginBottom: verticalScale(50)},
//   overlay: {flex: 1, justifyContent: 'center', paddingLeft: '10%'},
//   subtitle: {
//     color: '#fff',
//     fontSize: moderateScale(17),
//     marginBottom: verticalScale(10),
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: moderateScale(48),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(20),
//   },
//   shopBtn: {
//     borderRadius: moderateScale(16),
//     width: '30%',
//     height: verticalScale(40),
//   },
//   shopBtnText: {
//     color: '#fff',
//     fontSize: moderateScale(14),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: verticalScale(8),
//   },

//   // Product Cards / List
//   listContainerD: {padding: moderateScale(0)},
//   cardD: {
//     width: scale(165),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowRadius: moderateScale(4),
//     marginRight: scale(5),
//   },
//   cardM: {...cardDBase, marginTop:moderateScale(5)},
//   imageContainerD: {position: 'relative', backgroundColor: '#f4f4f4'},
//   imageD: {width: '100%', height: verticalScale(250), resizeMode: 'stretch'},
//   imageM: {width: '90%', height: verticalScale(200), resizeMode: 'stretch'},
//   refurbishedLabelD: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontSize: moderateScale(12),
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '100%',
//     textAlign: 'center',
//     padding: moderateScale(5),
//   },
//   heartIconD: {
//     position: 'absolute',
//     top: verticalScale(25),
//     right: scale(6),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(20),
//     padding: moderateScale(5),
//     elevation: 2,
//   },

//   // Badges
//   badge: {
//     position: 'absolute',
//     left: scale(-8),
//     top: verticalScale(10),
//     backgroundColor: '#FF3C3C',
//     paddingHorizontal: scale(6),
//     paddingVertical: verticalScale(2),
//     borderRadius: moderateScale(10),
//   },
//   badgeTextD: {color: '#fff', fontSize: moderateScale(12), fontWeight: 'bold'},

//   // Grade Box
//   gradeBoxD: {
//     paddingVertical: verticalScale(2),
//     position: 'absolute',
//     marginTop: verticalScale(240),
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

//   // Product Info
//   productNameD: {
//     fontSize: moderateScale(14),
//     fontWeight: 'bold',
//     marginTop: verticalScale(10),
//     marginHorizontal: scale(10),
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

//   // Buttons
//   button: {
//     backgroundColor: '#EAE8E8',
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: scale(24),
//     borderRadius: moderateScale(16),
//     alignSelf: 'flex-start',
//   },
//   buttonText: {fontSize: moderateScale(16), color: '#000', fontWeight: '600'},

//   // Quantity Selector
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   quantityButton: {
//     padding: moderateScale(5),
//     backgroundColor: '#fff',
//     borderWidth: 2,
//     borderColor: '#1C9C48',
//     borderRadius: moderateScale(4),
//   },
//   quantityBox: {
//     width: scale(80),
//     height: verticalScale(32),
//     marginHorizontal: scale(6),
//     backgroundColor: '#1C9C48',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: moderateScale(4),
//   },
//   quantityText: {
//     fontSize: moderateScale(18),
//     color: '#1C9C48',
//     fontWeight: '600',
//   },
//   quantityNumber: {
//     color: '#fff',
//     fontSize: moderateScale(17),
//     fontWeight: '600',
//     fontFamily: 'Source Serif 4',
//   },
//   buyButton: {
//     backgroundColor: '#00A94F',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(30),
//     borderRadius: moderateScale(4),
//   },
//   buyButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontFamily: 'Source Serif 4',
//   },

//   // Offer Cards
//   offerList: {marginTop: verticalScale(10)},
//   offerCard: {
//     width: width * 0.4,
//     height: verticalScale(173),
//     borderRadius: moderateScale(10),
//     padding: moderateScale(20),
//     marginRight: scale(12),
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   offerImageBackground: {
//     borderRadius: moderateScale(10),
//     resizeMode: 'cover',
//     opacity: 0.9,
//   },
//   offerTitle: {
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//     color: '#000',
//     fontFamily: 'Source Serif 4',
//     marginTop: verticalScale(100),
//   },
//   offerSubtitle: {fontSize: moderateScale(13), color: '#000'},

//   // Bulk Cards
//   card_bulk: {
//     width,
//     paddingHorizontal: moderateScale(20),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardContent_bulk: {
//     backgroundColor: '#eee',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(20),
//     flex: 1,
//     marginRight: moderateScale(10),
//   },
//   tag_bulk: {
//     fontSize: moderateScale(13),
//     color: '#666',
//     marginBottom: verticalScale(5),
//   },
//   title_bulk: {
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//     color: '#111',
//     marginBottom: verticalScale(4),
//   },
//   subtitle_bulk: {fontSize: moderateScale(14), color: '#444'},
//   iconBtn_bulk: {
//     width: scale(50),
//     height: scale(50),
//     backgroundColor: '#222',
//     borderRadius: scale(25),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dotsContainer_bulk: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: verticalScale(15),
//   },
//   dot_bulk: {
//     width: scale(10),
//     height: scale(10),
//     borderRadius: scale(5),
//     borderWidth: 1,
//     borderColor: '#00AEEF',
//     marginHorizontal: scale(5),
//   },
//   activeDot_bulk: {backgroundColor: '#00AEEF'},

//   // Support Cards
//   containerSUPPORT_CARDS: {
//     paddingHorizontal: 0,
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(24),
//   },
//   cardSUPPORT_CARDS: {
//     backgroundColor: '#ECE9E8',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginBottom: verticalScale(16),
//   },
//   iconCircleSUPPORT_CARDS: {
//     backgroundColor: '#23A455',
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: verticalScale(12),
//   },
//   cardTitleSUPPORT_CARDS: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: verticalScale(6),
//   },
//   cardDescriptionSUPPORT_CARDS: {
//     fontSize: moderateScale(13),
//     color: '#666',
//     lineHeight: verticalScale(18),
//   },

//   // Categories
//   categoryCard: {
//     alignItems: 'center',
//     marginRight: scale(12),
//     marginHorizontal: scale(5),
//     marginTop: verticalScale(0),
//   },
//   categoryImage: {width: scale(70), height: scale(70), resizeMode: 'contain'},
//   categoryText: {
//     marginTop: verticalScale(6),
//     fontSize: moderateScale(12),
//     color: '#222',
//   },

//   // Banners
//   banner: {
//     width: '100%',
//     height: verticalScale(200),
//     justifyContent: 'flex-end',
//   },
//   bannerOverlay: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: scale(12),
//     paddingVertical: verticalScale(8),
//     borderBottomLeftRadius: moderateScale(12),
//     borderBottomRightRadius: moderateScale(12),
//   },
//   bannerText: {fontSize: moderateScale(18), fontWeight: '600', color: '#fff'},
// });

// // Support Floating Button
// const stylesSupport = StyleSheet.create({
//   container: {
//     bottom: verticalScale(30),
//     right: scale(20),
//     alignItems: 'flex-end',
//     marginTop: verticalScale(50),
//   },
//   menu: {
//     backgroundColor: '#fff',
//     padding: moderateScale(15),
//     borderRadius: moderateScale(16),
//     marginBottom: verticalScale(10),
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   menuItem: {
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     marginVertical: verticalScale(4),
//     color: '#1e1e1e',
//   },
//   floatingButton: {
//     backgroundColor: '#0ea5e9',
//     width: scale(60),
//     height: scale(60),
//     borderRadius: scale(30),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badge: {
//     position: 'absolute',
//     bottom: -4,
//     right: -4,
//     backgroundColor: '#f97316',
//     borderRadius: moderateScale(10),
//     paddingHorizontal: scale(6),
//     paddingVertical: verticalScale(2),
//   },
//   badgeText: {color: '#fff', fontWeight: 'bold', fontSize: moderateScale(12)},
// });

// export {styles, stylesSupport};

// // import {Dimensions, Platform, StyleSheet} from 'react-native';
// // import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
// // const {width} = Dimensions.get('window');
// // const CARD_MARGIN = 16;
// // const cardWidth = (width - CARD_MARGIN * 3) / 2;

// // const styles = StyleSheet.create({
// //   listContainerD: {
// //     padding: moderateScale(10),
// //   },
// //   cardD: {
// //     width: scale(200),
// //     backgroundColor: '#fff',
// //     borderRadius: moderateScale(12),
// //     marginRight: scale(15),
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowRadius: moderateScale(4),
// //   },
// //   cardM: {
// //     width: scale(200),
// //     backgroundColor: '#fff',
// //     borderRadius: moderateScale(12),
// //     marginRight: 0,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowRadius: moderateScale(4),
// //   },
// //   imageContainerD: {
// //     position: 'relative',
// //     backgroundColor: '#f4f4f4',
// //   },
// //   imageD: {
// //     width: '100%',
// //     height: verticalScale(250),
// //     resizeMode: 'stretch',
// //   },
// //   imageM: {
// //     width: '90%',
// //     height: verticalScale(200),
// //     resizeMode: 'stretch',
// //   },
// //   refurbishedLabelD: {
// //     position: 'absolute',
// //     alignSelf: 'center',
// //     fontSize: moderateScale(12),
// //     color: '#000',
// //     backgroundColor: '#EAE6E5',
// //     width: '98%',
// //     textAlign: 'center',
// //     padding: moderateScale(5),
// //   },
// //   heartIconD: {
// //     position: 'absolute',
// //     top: verticalScale(25),
// //     right: scale(6),
// //     backgroundColor: '#fff',
// //     borderRadius: moderateScale(20),
// //     padding: moderateScale(5),
// //     elevation: 2,
// //   },
// //   badge: {
// //     position: 'absolute',
// //     left: scale(-8),
// //     top: verticalScale(10),
// //     backgroundColor: '#FF3C3C',
// //     paddingHorizontal: scale(6),
// //     paddingVertical: verticalScale(2),
// //     borderRadius: moderateScale(10),
// //   },
// //   badgeTextD: {
// //     color: '#fff',
// //     fontSize: moderateScale(12),
// //     fontWeight: 'bold',
// //   },
// //   gradeBoxD: {
// //     paddingVertical: verticalScale(2),
// //     position: 'absolute',
// //     marginTop: verticalScale(225),
// //     alignSelf: 'center',
// //     backgroundColor: '#fff',
// //     width: '92%',
// //     borderRadius: moderateScale(10),
// //     borderWidth: 0.2,
// //   },
// //   gradeTextD: {
// //     fontSize: moderateScale(12),
// //     fontWeight: '500',
// //     color: '#555',
// //     textAlign: 'center',
// //   },
// //   productNameD: {
// //     fontSize: moderateScale(14),
// //     fontWeight: 'bold',
// //     marginTop: verticalScale(6),
// //     marginHorizontal: scale(10),
// //     color: '#000',
// //   },
// //   colorTextD: {
// //     fontSize: moderateScale(13),
// //     color: '#000',
// //     marginHorizontal: scale(10),
// //     marginTop: verticalScale(2),
// //   },
// //   priceRowD: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginHorizontal: scale(10),
// //     marginTop: verticalScale(4),
// //     marginBottom: verticalScale(10),
// //   },
// //   priceD: {
// //     fontSize: moderateScale(14),
// //     fontWeight: 'bold',
// //     color: '#000',
// //     marginRight: scale(6),
// //   },
// //   originalPriceD: {
// //     fontSize: moderateScale(13),
// //     color: '#888',
// //     textDecorationLine: 'line-through',
// //   },
// leftContainer: {
//   flex: 1,
//   paddingRight: scale(10),
// },
// heading: {
//   fontSize: moderateScale(22),
//   fontWeight: 'bold',
//   color: '#1A1A1A',
//   marginBottom: verticalScale(6),
// },
// subheading: {
//   fontSize: moderateScale(18),
//   fontWeight: '500',
//   color: '#333',
//   marginBottom: verticalScale(8),
// },
// description: {
//   fontSize: moderateScale(16),
//   color: '#7E7E7E',
//   marginBottom: verticalScale(20),
// },
// button: {
//   backgroundColor: '#EAE8E8',
//   paddingVertical: verticalScale(12),
//   paddingHorizontal: scale(24),
//   borderRadius: moderateScale(16),
//   alignSelf: 'flex-start',
// },
// buttonText: {
//   fontSize: moderateScale(16),
//   color: '#000',
//   fontWeight: '600',
// },
// imageG: {
//   width: width * 0.3,
//   height: width * 0.3,
// },

// //   container: {flex: 1, backgroundColor: 'white'},

// //   swiper: {
// //     height: verticalScale(220),
// //   },
// //   card_Top: {
// //     width: width - scale(15),
// //     marginHorizontal: scale(20),
// //     height: verticalScale(200),
// //     borderRadius: moderateScale(16),
// //     overflow: 'hidden',
// //     alignSelf: 'center',
// //   },
// //   image: {
// //     resizeMode: 'stretch',
// //     borderRadius: moderateScale(16),
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   titleT: {
// //     fontSize: moderateScale(12),
// //     color: '#fff',
// //   },
// //   subtitleT: {
// //     fontSize: moderateScale(14),
// //     color: '#fff',
// //     fontWeight: '600',
// //   },

// //   dot: {
// //     backgroundColor: '#aaa',
// //     width: scale(6),
// //     height: scale(6),
// //     borderRadius: scale(3),
// //     margin: scale(3),
// //   },

// //   activeDot: {
// //     backgroundColor: '#fff',
// //     width: scale(8),
// //     height: scale(8),
// //     borderRadius: scale(4),
// //     margin: scale(3),
// //   },
// //   badgeText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 12,
// //   },

// //   headerRow_r: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 10,
// //   },
// //   header_r: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //   },
// //   link_r: {
// //     fontSize: 15,
// //     fontWeight: 'bold',
// //     color: '#000',
// //     fontFamily: 'Source Serif 4',
// //   },
// //   ratingRow_r: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 10,
// //     marginBottom: 15,
// //   },
// //   rating_r: {
// //     fontSize: 48,
// //     fontWeight: 'bold',
// //   },
// //   totalReviews_r: {
// //     fontWeight: 'bold',
// //     fontSize: 13,
// //     fontFamily: 'Source Serif 4',
// //   },
// //   card_r: {
// //     backgroundColor: '#ecfeff',
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 4,
// //     marginBottom: 8,
// //   },
// //   cardHeader_r: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   cardTitle_r: {
// //     fontWeight: 'bold',
// //     fontSize: 15,
// //     fontFamily: 'Source Serif 4',
// //   },
// //   ratingText_r: {
// //     fontWeight: 'bold',
// //     color: '#22c55e',
// //   },
// //   message_r: {
// //     color: '#11A5D7',
// //     marginVertical: 5,
// //     fontWeight: 'regular',
// //   },
// //   userInfo_r: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   userText_r: {
// //     marginLeft: 4,
// //     fontWeight: 'bold',
// //     fontFamily: 'Source Serif 4',
// //   },

// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: 5,
// //     backgroundColor: '#1C9C48',
// //   },
// //   logo: {width: 80, height: 58},
// //   hero: {height: 400, marginBottom: 50},
// //   overlay: {
// //     flex: 1,
// //     // backgroundColor: 'rgba(0, 100, 0, 0.4)',
// //     justifyContent: 'center',
// //     paddingLeft: '10%',
// //   },
// //   subtitle: {
// //     color: '#fff',
// //     fontSize: 17,
// //     marginBottom: 10,
// //     fontFamily: 'Source Serif 4',
// //     fontWeight: 'bold',
// //   },
// //   title: {fontSize: 48, fontWeight: 'bold', marginBottom: 20},
// //   shopBtn: {
// //     borderRadius: 16,
// //     width: '30%',
// //     height: 40,
// //   },
// //   shopBtnText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     fontFamily: 'Source Serif 4',
// //     marginTop: 8,
// //   },
// //   scrollView: {paddingBottom: 20},
// //   cardWrapper_g: {
// //     width: width * 0.42,
// //     marginRight: 15,
// //     borderRadius: 20,
// //     backgroundColor: '#fff',
// //     overflow: 'hidden',
// //     shadowColor: 'rgba(0,0,0,0.5)', // shadow
// //     shadowRadius: 5,
// //     shadowOpacity: 0.3,
// //     shadowOffset: {width: 0, height: 2},
// //     elevation: 5,
// //     marginHorizontal: 15,
// //   },
// //   card_g: {
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //   },
// //   imageBackground_g: {
// //     width: '100%',
// //     height: 200,
// //     resizeMode: 'stretch',
// //     justifyContent: 'flex-end',
// //   },
// //   gradientBox_g: {
// //     justifyContent: 'center',
// //     borderBottomLeftRadius: 20,
// //     borderBottomRightRadius: 20,
// //     height: 50,
// //   },
// //   productName_g: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 14,
// //     marginLeft: 10,
// //     fontFamily: 'Source Serif 4',
// //   },
// //   search: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: 'grey',
// //     borderRadius: 30,
// //     paddingHorizontal: 15,
// //     marginBottom: 0,
// //     height: 50,
// //     marginTop: 10,
// //     marginHorizontal: 10,
// //   },
// //   searchIcon: {marginRight: 10},
// //   micIcon: {marginLeft: 'auto'},
// //   textInput: {flex: 1, fontSize: 16},
// //   grid: {marginTop: 0},
// //   card: {
// //     flex: 1,
// //     padding: 90,
// //     backgroundColor: '#fff',
// //     borderWidth: 2,
// //     borderRadius: 10,
// //     borderColor: '#000',
// //     marginHorizontal: 8,
// //   },
// //   imageIcon: {
// //     fontSize: 20,
// //     alignSelf: 'center',
// //   },
// //   cardTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
// //   cardDesc: {fontSize: 14, color: 'grey'},
// //   tabContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     borderBottomWidth: 1,
// //     paddingBottom: 10,
// //     marginTop: 10,
// //   },
// //   tabText: {
// //     fontWeight: 'bold',
// //     color: 'gray',
// //     fontSize: 15,
// //     fontFamily: 'Source Serif 4',
// //   },
// //   activeTabText: {color: 'black', borderBottomWidth: 2, borderColor: 'black'},
// //   productList: {padding: 10},
// //   productCard: {
// //     flex: 1,
// //     borderWidth: 2,
// //     borderColor: '#000',
// //     margin: 5,
// //     padding: 10,
// //     borderRadius: 10,
// //   },
// //   productName: {
// //     fontWeight: 'semibold',
// //     fontSize: 14,
// //     fontFamily: 'Source Serif 4',
// //     marginBottom: 5,
// //   },
// //   productPrice: {fontSize: 14, color: 'gray', marginBottom: 8},
// //   seeMore: {
// //     textAlign: 'center',
// //     color: '#00AEEF',
// //     fontWeight: 'bold',
// //     marginVertical: 10,
// //     fontSize: 16,
// //   },
// //   header1: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
// //   title1: {color: '#00AEEF', fontSize: 20, fontWeight: 'bold', flex: 1},
// //   arrow1: {color: '#00AEEF', fontSize: 22},
// //   productList1: {paddingVertical: 10},
// //   storage: {color: 'gray', marginBottom: 4},
// //   quantityContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   quantityButton: {
// //     padding: 5,
// //     backgroundColor: '#fff',
// //     borderWidth: 2,
// //     borderColor: '#1C9C48',
// //     borderRadius: 4,
// //   },
// //   quantityBox: {
// //     width: 80,
// //     height: 32,
// //     marginHorizontal: 6,
// //     backgroundColor: '#1C9C48',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 4,
// //   },
// //   quantityText: {fontSize: 18, color: '#1C9C48', fontWeight: 'semibold'},
// //   quantityNumber: {
// //     color: '#fff',
// //     fontSize: 17,
// //     fontWeight: 'semibold',
// //     fontFamily: 'Source Serif 4',
// //   },
// //   buyButton: {
// //     backgroundColor: '#00A94F',
// //     paddingVertical: 8,
// //     paddingHorizontal: 30,
// //     borderRadius: 4,
// //   },
// //   buyButtonText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontWeight: 'semibold',
// //     fontWeight: 'semibold',
// //     fontFamily: 'Source Serif 4',
// //   },
// //   searchWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 10,
// //     borderRadius: 30,
// //     margin: 10,
// //     shadowColor: '#000',
// //     shadowOffset: {width: 0, height: 2},
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   searchBox: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //     borderRadius: 16,
// //     paddingLeft: 15,
// //     marginRight: 10,
// //     borderWidth: 2,
// //   },
// //   textInput_search: {
// //     flex: 1,
// //     paddingVertical: 10,
// //     color: ' #000',
// //     fontFamily: 'Source Serif 4',
// //     fontSize: 16,
// //   },
// //   icon: {
// //     padding: 10,
// //   },
// //   searchBtn: {
// //     padding: 10,
// //     borderRadius: 30,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   imagePlaceholder: {
// //     width: 160,
// //     height: 100,
// //     backgroundColor: '#eee',
// //     justifyContent: 'center',
// //     alignSelf: 'center',
// //     marginBottom: 10,
// //     borderWidth: 1,
// //     borderColor: '#aaa',
// //   },
// //   phoneCard: {
// //     width: width,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   phoneImage: {
// //     width: '100%',
// //     height: 220,
// //   },
// //   offerList: {
// //     marginTop: 10,
// //     gap: 0,
// //   },
// //   offerCard: {
// //     width: width * 0.4,
// //     height: 173,
// //     borderRadius: 10,
// //     padding: 20,
// //     marginRight: 12,
// //     justifyContent: 'center',
// //     overflow: 'hidden', // ensure image respects borderRadius
// //   },
// //   offerImageBackground: {
// //     borderRadius: 10,
// //     resizeMode: 'cover',
// //     opacity: 0.9, // optional for slight dimming
// //   },
// //   offerTitle: {
// //     fontWeight: 'semibold',
// //     fontSize: 15,
// //     color: '#fff',
// //     marginBottom: 0,
// //     color: '#000',
// //     fontFamily: 'Source Serif 4',
// //     marginTop: 100,
// //   },
// //   offerSubtitle: {
// //     fontSize: 13,
// //     color: '#fff',
// //     fontWeight: 'regular',
// //     color: '#000',
// //   },
// //   greenButton: {
// //     backgroundColor: '#16a34a',
// //     borderRadius: 10,
// //     paddingVertical: 15,
// //     alignItems: 'center',
// //     marginTop: 30,
// //   },
// //   greenButtonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// //   darkButton: {
// //     backgroundColor: '#1e1e1e',
// //     borderRadius: 10,
// //     paddingVertical: 15,
// //     alignItems: 'center',
// //     marginTop: 15,
// //   },
// //   darkButtonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// //   timerWrapper: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 10,
// //   },
// //   timeContainer: {
// //     alignItems: 'center',
// //   },
// //   timeBox: {
// //     backgroundColor: '#E6F5EA',
// //     paddingVertical: 20,
// //     paddingHorizontal: 25,
// //     borderRadius: 12,
// //     marginBottom: 5,
// //   },
// //   timeValue: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     color: '#000',
// //   },
// //   timeLabel: {
// //     fontSize: 14,
// //     color: '#000',
// //     fontWeight: '500',
// //   },
// //   card_bulk: {
// //     width: width,
// //     paddingHorizontal: 20,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   cardContent_bulk: {
// //     backgroundColor: '#eee',
// //     borderRadius: 16,
// //     padding: 20,
// //     flex: 1,
// //     marginRight: 10,
// //   },
// //   tag_bulk: {
// //     fontSize: 13,
// //     color: '#666',
// //     marginBottom: 5,
// //   },
// //   title_bulk: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#111',
// //     marginBottom: 4,
// //   },
// //   subtitle_bulk: {
// //     fontSize: 14,
// //     color: '#444',
// //   },
// //   iconBtn_bulk: {
// //     width: 50,
// //     height: 50,
// //     backgroundColor: '#222',
// //     borderRadius: 25,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   dotsContainer_bulk: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginTop: 15,
// //   },
// //   dot_bulk: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 5,
// //     borderWidth: 1,
// //     borderColor: '#00AEEF',
// //     marginHorizontal: 5,
// //   },
// //   activeDot_bulk: {
// //     backgroundColor: '#00AEEF',
// //   },

// //   cardDO: {
// //     width: width * 0.9,
// //     backgroundColor: '#fff',
// //     borderRadius: 16,
// //     alignSelf: 'center',
// //     marginVertical: 10,
// //     overflow: 'hidden',
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: {width: 0, height: 4},
// //         shadowOpacity: 0.12,
// //         shadowRadius: 8,
// //         borderWidth: 0.2,
// //       },
// //       android: {
// //         elevation: 4,
// //       },
// //     }),
// //   },

// //   imageDO: {
// //     width: '100%',
// //     height: 180,
// //     borderTopLeftRadius: 16,
// //     borderTopRightRadius: 16,
// //   },
// //   contentDO: {
// //     padding: 16,
// //   },
// //   titleDO: {
// //     fontSize: 20,
// //     fontWeight: '600',
// //     color: '#222',
// //     marginBottom: 6,
// //   },
// //   subtitleDO: {
// //     fontSize: 15,
// //     color: '#666',
// //     marginBottom: 20,
// //     lineHeight: 22,
// //   },
// //   buttonDO: {
// //     backgroundColor: '#03A9F4',
// //     borderRadius: 30,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     alignSelf: 'flex-start',
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#03A9F4',
// //         shadowOffset: {width: 0, height: 2},
// //         shadowOpacity: 0.2,
// //         shadowRadius: 4,
// //       },
// //       android: {
// //         elevation: 2,
// //       },
// //     }),
// //   },
// //   buttonTextDO: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 14,
// //   },

// //   gridSD: {
// //     paddingHorizontal: CARD_MARGIN,
// //     paddingTop: 20,
// //     paddingBottom: 0,
// //   },
// //   rowSD: {
// //     justifyContent: 'space-between',
// //     marginBottom: CARD_MARGIN,
// //   },
// //   cardSD: {
// //     width: cardWidth,
// //     backgroundColor: '#F3F3F3',
// //     borderRadius: 16,
// //     padding: 16,
// //     marginTop: 0,
// //   },
// //   iconCircleSD: {
// //     backgroundColor: '#23A455',
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 12,
// //   },
// //   cardTitleSD: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //     color: '#111',
// //     marginBottom: 6,
// //   },
// //   cardDescriptionSD: {
// //     fontSize: 13,
// //     color: '#666',
// //     lineHeight: 18,
// //   },

// //   containerSUPPORT_CARDS: {
// //     paddingHorizontal: 0,
// //     paddingTop: 12,
// //     paddingBottom: 24,
// //   },
// //   cardSUPPORT_CARDS: {
// //     backgroundColor: '#ECE9E8', // soft gray from screenshot
// //     borderRadius: 16,
// //     padding: 16,
// //     marginBottom: 16,
// //   },
// //   iconCircleSUPPORT_CARDS: {
// //     backgroundColor: '#23A455',
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 12,
// //   },
// //   cardTitleSUPPORT_CARDS: {
// //     fontSize: 14,
// //     fontWeight: '700',
// //     color: '#111',
// //     marginBottom: 6,
// //   },
// //   cardDescriptionSUPPORT_CARDS: {
// //     fontSize: 13,
// //     color: '#666',
// //     lineHeight: 18,
// //   },

// //   categoryCard: {
// //     alignItems: 'center',
// //     marginRight: 12,
// //     marginHorizontal: 15,
// //     marginTop: 10,
// //   },
// //   categoryImage: {
// //     width: 70,
// //     height: 70,
// //     resizeMode: 'contain',
// //   },
// //   categoryText: {
// //     marginTop: 6,
// //     fontSize: 12,
// //     color: '#222',
// //   },
// //   banner: {
// //     width: '100%',
// //     height: 200,
// //     justifyContent: 'flex-end',
// //   },
// //   bannerOverlay: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.3)',
// //     paddingHorizontal: 12,
// //     paddingVertical: 8,
// //     borderBottomLeftRadius: 12,
// //     borderBottomRightRadius: 12,
// //   },
// //   bannerText: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#fff',
// //   },
// // });

// // const stylesSupport = StyleSheet.create({
// //   container: {
// //     // position: 'absolute',
// //     bottom: 30,
// //     right: 20,
// //     alignItems: 'flex-end',
// //     marginTop: 50,
// //   },
// //   menu: {
// //     backgroundColor: '#fff',
// //     padding: 15,
// //     borderRadius: 16,
// //     marginBottom: 10,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   },
// //   menuItem: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     marginVertical: 4,
// //     color: '#1e1e1e',
// //   },
// //   floatingButton: {
// //     backgroundColor: '#0ea5e9',
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   badge: {
// //     position: 'absolute',
// //     bottom: -4,
// //     right: -4,
// //     backgroundColor: '#f97316',
// //     borderRadius: 10,
// //     paddingHorizontal: 6,
// //     paddingVertical: 2,
// //   },
// //   badgeText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     fontSize: 12,
// //   },
// // });

// // export {styles, stylesSupport};

// import {Dimensions, Platform, StyleSheet} from 'react-native';
// import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// const {width} = Dimensions.get('window');
// const CARD_MARGIN = moderateScale(16);
// const cardWidth = (width - CARD_MARGIN * 3) / 2;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   scrollView: {paddingBottom: verticalScale(20)},

//   // Swiper / Hero
//   swiper: {height: verticalScale(220)},
//   card_Top: {
//     width: width - scale(15),
//     marginHorizontal: scale(20),
//     height: verticalScale(200),
//     borderRadius: moderateScale(16),
//     overflow: 'hidden',
//     alignSelf: 'center',
//   },
//   image: {resizeMode: 'stretch', borderRadius: moderateScale(16)},
//   textContainer: {flex: 1},
//   titleT: {fontSize: moderateScale(12), color: '#fff'},
//   subtitleT: {fontSize: moderateScale(14), color: '#fff', fontWeight: '600'},
//   dot: {backgroundColor: '#aaa', width: scale(6), height: scale(6), borderRadius: scale(3), margin: scale(3)},
//   activeDot: {backgroundColor: '#fff', width: scale(8), height: scale(8), borderRadius: scale(4), margin: scale(3)},

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: moderateScale(5),
//     backgroundColor: '#1C9C48',
//   },
//   logo: {width: moderateScale(80), height: verticalScale(58)},

//   // Hero overlay
//   hero: {height: verticalScale(400), marginBottom: verticalScale(50)},
//   overlay: {flex: 1, justifyContent: 'center', paddingLeft: '10%'},
//   subtitle: {color: '#fff', fontSize: moderateScale(17), marginBottom: verticalScale(10), fontWeight: 'bold'},
//   title: {fontSize: moderateScale(48), fontWeight: 'bold', marginBottom: verticalScale(20)},
//   shopBtn: {borderRadius: moderateScale(16), width: '30%', height: verticalScale(40)},
//   shopBtnText: {color: '#fff', fontSize: moderateScale(14), fontWeight: 'bold', textAlign: 'center', marginTop: verticalScale(8)},

//   // Product Cards / List
//   listContainerD: {padding: moderateScale(10)},
//   cardD: {
//     width: scale(200),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     marginRight: scale(15),
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowRadius: moderateScale(4),
//   },
//   cardM: {...this.cardD, marginRight: 0},
//   imageContainerD: {position: 'relative', backgroundColor: '#f4f4f4'},
//   imageD: {width: '100%', height: verticalScale(250), resizeMode: 'stretch'},
//   imageM: {width: '100%', height: verticalScale(200), resizeMode: 'stretch'},
//   refurbishedLabelD: {
//     position: 'absolute',
//     alignSelf: 'center',
//     fontSize: moderateScale(12),
//     color: '#000',
//     backgroundColor: '#EAE6E5',
//     width: '98%',
//     textAlign: 'center',
//     padding: moderateScale(5),
//   },
//   heartIconD: {
//     position: 'absolute',
//     top: verticalScale(25),
//     right: scale(6),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(20),
//     padding: moderateScale(5),
//     elevation: 2,
//   },

//   // Badges
//   badge: {position: 'absolute', left: scale(-8), top: verticalScale(10), backgroundColor: '#FF3C3C', paddingHorizontal: scale(6), paddingVertical: verticalScale(2), borderRadius: moderateScale(10)},
//   badgeTextD: {color: '#fff', fontSize: moderateScale(12), fontWeight: 'bold'},

//   // Grade Box
//   gradeBoxD: {paddingVertical: verticalScale(2), position: 'absolute', marginTop: verticalScale(225), alignSelf: 'center', backgroundColor: '#fff', width: '92%', borderRadius: moderateScale(10), borderWidth: 0.2},
//   gradeTextD: {fontSize: moderateScale(12), fontWeight: '500', color: '#555', textAlign: 'center'},

//   // Product Info
//   productNameD: {fontSize: moderateScale(14), fontWeight: 'bold', marginTop: verticalScale(6), marginHorizontal: scale(10), color: '#000'},
//   colorTextD: {fontSize: moderateScale(13), color: '#000', marginHorizontal: scale(10), marginTop: verticalScale(2)},
//   priceRowD: {flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(10), marginTop: verticalScale(4), marginBottom: verticalScale(10)},
//   priceD: {fontSize: moderateScale(14), fontWeight: 'bold', color: '#000', marginRight: scale(6)},
//   originalPriceD: {fontSize: moderateScale(13), color: '#888', textDecorationLine: 'line-through'},

//   // Buttons
//   button: {backgroundColor: '#EAE8E8', paddingVertical: verticalScale(12), paddingHorizontal: scale(24), borderRadius: moderateScale(16), alignSelf: 'flex-start'},
//   buttonText: {fontSize: moderateScale(16), color: '#000', fontWeight: '600'},

//   // Quantity Selector
//   quantityContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(10)},
//   quantityButton: {padding: moderateScale(5), backgroundColor: '#fff', borderWidth: 2, borderColor: '#1C9C48', borderRadius: moderateScale(4)},
//   quantityBox: {width: scale(80), height: verticalScale(32), marginHorizontal: scale(6), backgroundColor: '#1C9C48', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(4)},
//   quantityText: {fontSize: moderateScale(18), color: '#1C9C48', fontWeight: '600'},
//   quantityNumber: {color: '#fff', fontSize: moderateScale(17), fontWeight: '600', fontFamily: 'Source Serif 4'},
//   buyButton: {backgroundColor: '#00A94F', paddingVertical: verticalScale(8), paddingHorizontal: scale(30), borderRadius: moderateScale(4)},
//   buyButtonText: {color: '#fff', textAlign: 'center', fontWeight: '600', fontFamily: 'Source Serif 4'},

//   // Offer Cards
//   offerList: {marginTop: verticalScale(10), gap: verticalScale(0)},
//   offerCard: {width: width * 0.4, height: verticalScale(173), borderRadius: moderateScale(10), padding: moderateScale(20), marginRight: scale(12), justifyContent: 'center', overflow: 'hidden'},
//   offerImageBackground: {borderRadius: moderateScale(10), resizeMode: 'cover', opacity: 0.9},
//   offerTitle: {fontWeight: '600', fontSize: moderateScale(15), color: '#000', fontFamily: 'Source Serif 4', marginTop: verticalScale(100)},
//   offerSubtitle: {fontSize: moderateScale(13), color: '#000'},

//   // Bulk Cards
//   card_bulk: {width, paddingHorizontal: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
//   cardContent_bulk: {backgroundColor: '#eee', borderRadius: moderateScale(16), padding: moderateScale(20), flex: 1, marginRight: moderateScale(10)},
//   tag_bulk: {fontSize: moderateScale(13), color: '#666', marginBottom: verticalScale(5)},
//   title_bulk: {fontSize: moderateScale(20), fontWeight: 'bold', color: '#111', marginBottom: verticalScale(4)},
//   subtitle_bulk: {fontSize: moderateScale(14), color: '#444'},
//   iconBtn_bulk: {width: scale(50), height: scale(50), backgroundColor: '#222', borderRadius: scale(25), justifyContent: 'center', alignItems: 'center'},
//   dotsContainer_bulk: {flexDirection: 'row', justifyContent: 'center', marginTop: verticalScale(15)},
//   dot_bulk: {width: scale(10), height: scale(10), borderRadius: scale(5), borderWidth: 1, borderColor: '#00AEEF', marginHorizontal: scale(5)},
//   activeDot_bulk: {backgroundColor: '#00AEEF'},

//   // Support Cards
//   containerSUPPORT_CARDS: {paddingHorizontal: 0, paddingTop: verticalScale(12), paddingBottom: verticalScale(24)},
//   cardSUPPORT_CARDS: {backgroundColor: '#ECE9E8', borderRadius: moderateScale(16), padding: moderateScale(16), marginBottom: verticalScale(16)},
//   iconCircleSUPPORT_CARDS: {backgroundColor: '#23A455', width: scale(36), height: scale(36), borderRadius: scale(18), alignItems: 'center', justifyContent: 'center', marginBottom: verticalScale(12)},
//   cardTitleSUPPORT_CARDS: {fontSize: moderateScale(14), fontWeight: '700', color: '#111', marginBottom: verticalScale(6)},
//   cardDescriptionSUPPORT_CARDS: {fontSize: moderateScale(13), color: '#666', lineHeight: verticalScale(18)},

//   // Categories
//   categoryCard: {alignItems: 'center', marginRight: scale(12), marginHorizontal: scale(5), marginTop: verticalScale(0)},
//   categoryImage: {width: scale(70), height: scale(70), resizeMode: 'contain'},
//   categoryText: {marginTop: verticalScale(6), fontSize: moderateScale(12), color: '#222'},

//   // Banners
//   banner: {width: '100%', height: verticalScale(200), justifyContent: 'flex-end'},
//   bannerOverlay: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: scale(12), paddingVertical: verticalScale(8), borderBottomLeftRadius: moderateScale(12), borderBottomRightRadius: moderateScale(12)},
//   bannerText: {fontSize: moderateScale(18), fontWeight: '600', color: '#fff'},
// });

// // Support Floating Button
// const stylesSupport = StyleSheet.create({
//   container: {bottom: verticalScale(30), right: scale(20), alignItems: 'flex-end', marginTop: verticalScale(50)},
//   menu: {backgroundColor: '#fff', padding: moderateScale(15), borderRadius: moderateScale(16), marginBottom: verticalScale(10), shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5},
//   menuItem: {fontSize: moderateScale(16), fontWeight: '600', marginVertical: verticalScale(4), color: '#1e1e1e'},
//   floatingButton: {backgroundColor: '#0ea5e9', width: scale(60), height: scale(60), borderRadius: scale(30), justifyContent: 'center', alignItems: 'center'},
//   badge: {position: 'absolute', bottom: -4, right: -4, backgroundColor: '#f97316', borderRadius: moderateScale(10), paddingHorizontal: scale(6), paddingVertical: verticalScale(2)},
//   badgeText: {color: '#fff', fontWeight: 'bold', fontSize: moderateScale(12)},
// });

// export {styles, stylesSupport};

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const cardSize = width * 0.45;
// Product Card Base Style (to avoid duplication)
const cardDBase = {
  width: scale(180),
  backgroundColor: '#fff',
  borderRadius: moderateScale(12),
  overflow: 'hidden',
  shadowColor: '#000',
  shadowRadius: moderateScale(4),
};

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    paddingRight: scale(10),
  },
  container: { flex: 1, backgroundColor: '#fff', borderWidth: 1 },
  container1: {  backgroundColor: '#fff', marginTop: moderateScale(20) },
  itemfooter: {
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 20,
  },

  iconOuteritemfooter: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.08,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  iconInneritemfooter: {
    width: width * 0.10,
    height: width * 0.10,
    borderRadius: width * 0.06,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleitemfooter: {
    fontSize: width * 0.030,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitleitemfooter: {
    fontSize: width * 0.030,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },

  heading: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(6),
  },
  subheading: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  description: {
    fontSize: moderateScale(15),
    color: '#7E7E7E',
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: '#EAE8E8',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: moderateScale(13),
    color: '#000',
    fontWeight: '600',
  },
  imageG: {
    width: width * 0.3,
    height: width * 0.3,
  },

  // Swiper / Hero
  // swiper: {height: verticalScale(220), borderWidth: 1},
  // card_Top: {
  //   width: width * 0.5,
  //   marginHorizontal: scale(20),
  //   height: verticalScale(200),
  //   borderRadius: moderateScale(16),
  //   overflow: 'hidden',
  //   alignSelf: 'center',
  // },

  swiper: {
    height: moderateScale(200),
    // marginTop: moderateScale(5),
  },
  card_Top: {
    width: width,
    marginHorizontal: moderateScale(20),
    height: moderateScale(200),
    // borderRadius: moderateScale(16),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image1: {
    resizeMode: 'stretch',
    // borderRadius: 16,
  },

  textContainer: { flex: 1 },
  titleT: { fontSize: moderateScale(12), color: '#fff' },
  subtitleT: { fontSize: moderateScale(14), color: '#fff', fontWeight: '600' },
  dot: {
    backgroundColor: '#aaa',
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    margin: scale(3),
  },
  activeDot: {
    backgroundColor: '#fff',
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    margin: scale(3),
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(5),
    backgroundColor: '#1C9C48',
  },
  logo: { width: moderateScale(80), height: verticalScale(58) },

  // Hero overlay
  hero: { height: verticalScale(400), marginBottom: verticalScale(50) },
  overlay: { flex: 1, justifyContent: 'center', paddingLeft: '10%' },
  subtitle: {
    color: '#fff',
    fontSize: moderateScale(17),
    marginBottom: verticalScale(10),
    fontWeight: 'bold',
  },
  title: {
    fontSize: moderateScale(48),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  shopBtn: {
    borderRadius: moderateScale(16),
    width: '30%',
    height: verticalScale(40),
  },
  shopBtnText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(8),
  },

  // Product Cards / List
  listContainerD: { padding: moderateScale(0) },
  cardD: {
    width: responsiveWidth(45),
    borderRadius: moderateScale(12),
    marginHorizontal: scale(2),
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowRadius: moderateScale(4),
    marginRight: scale(5),
    marginBottom: moderateScale(5),
    elevation: 5,
  },
  cardM: {
    width: responsiveWidth(45),
    borderRadius: moderateScale(12),
    marginHorizontal: scale(2),
  },
  imageContainerD: { position: 'relative', backgroundColor: '#ffffff' },
  imageD: {
    width: responsiveWidth(41),
    height: verticalScale(150),
    borderRadius: moderateScale(15),
    resizeMode: 'contain',
  },
  imageM: {
    width: responsiveWidth(45),
    height: verticalScale(150),
    borderRadius: moderateScale(15),
    marginHorizontal: scale(0.2),
  },
  refurbishedLabelD: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    color: '#000',
    backgroundColor: '#EAE6E5',
    width: '100%',
    textAlign: 'center',
    padding: moderateScale(5),
  },
  heartIconD: {
    position: 'absolute',
    top: verticalScale(25),
    right: scale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    elevation: 2,
  },

  // Badges
  badge: {
    position: 'absolute',
    left: scale(-8),
    top: verticalScale(10),
    backgroundColor: '#FF3C3C',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(10),
  },
  badgeTextD: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },

  // Grade Box
  gradeBoxD: {
    paddingVertical: verticalScale(2),
    position: 'absolute',
    marginTop: verticalScale(240),
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: moderateScale(10),
    borderWidth: 0.2,
  },
  gradeTextD: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },

  // Product Info
  productNameD: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginTop: verticalScale(0),
    marginHorizontal: scale(5),
    color: '#000',
  },
  colorTextD: {
    fontSize: moderateScale(13),
    color: '#000',
    marginHorizontal: scale(5),
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
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#000',
    marginRight: scale(6),
  },
  originalPriceD: {
    fontSize: moderateScale(13),
    color: '#888',
    textDecorationLine: 'line-through',
  },

  // // Buttons
  // button: {
  //   backgroundColor: '#EAE8E8',
  //   paddingVertical: verticalScale(12),
  //   paddingHorizontal: scale(24),
  //   borderRadius: moderateScale(16),
  //   alignSelf: 'flex-start',
  // },
  // buttonText: { fontSize: moderateScale(16), color: '#000', fontWeight: '600' },

  // Quantity Selector
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  quantityButton: {
    padding: moderateScale(5),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1C9C48',
    borderRadius: moderateScale(4),
  },
  quantityBox: {
    width: scale(80),
    height: verticalScale(32),
    marginHorizontal: scale(6),
    backgroundColor: '#1C9C48',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  quantityText: {
    fontSize: moderateScale(18),
    color: '#1C9C48',
    fontWeight: '600',
  },
  quantityNumber: {
    color: '#fff',
    fontSize: moderateScale(17),
    fontWeight: '600',
    fontFamily: 'Source Serif 4',
  },
  buyButton: {
    backgroundColor: '#00A94F',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(4),
  },
  buyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Source Serif 4',
  },

  // Offer Cards
  offerList: { marginTop: verticalScale(10) },
  offerCard: {
    width: cardSize,
    height: cardSize,
    marginHorizontal: moderateScale(2),
    overflow: 'hidden',
    borderRadius: moderateScale(10),
  },
  image: {
    width: cardSize,
    height: cardSize,
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
    overflow: 'hidden',
  },

  offerImageBackground: {
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
    opacity: 0.9,
  },
  offerTitle: {
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: '#000',
    fontFamily: 'Source Serif 4',
    marginTop: verticalScale(100),
  },
  offerSubtitle: { fontSize: moderateScale(13), color: '#000' },

  brandCardContainer: {
    width: moderateScale(160),
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    paddingBottom: moderateScale(12),
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.18,
    // shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  brandImage: {
    width: '100%',
    height: moderateScale(120),
    justifyContent: 'flex-end',
  },

  brandImageStyle: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },

  brandGradient: {
    width: '100%',
    height: '50%',
    // borderBottomLeftRadius: moderateScale(20),
    // borderBottomRightRadius: moderateScale(20),
  },

  brandTitle: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },

  // Bulk Cards
  card_bulk: {
    width,
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent_bulk: {
    backgroundColor: '#eee',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    flex: 1,
    marginRight: moderateScale(10),
  },
  tag_bulk: {
    fontSize: moderateScale(13),
    color: '#666',
    marginBottom: verticalScale(5),
  },
  title_bulk: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#111',
    marginBottom: verticalScale(4),
  },
  subtitle_bulk: { fontSize: moderateScale(14), color: '#444' },
  iconBtn_bulk: {
    width: scale(50),
    height: scale(50),
    backgroundColor: '#222',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer_bulk: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15),
  },
  dot_bulk: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: '#00AEEF',
    marginHorizontal: scale(5),
  },
  activeDot_bulk: { backgroundColor: '#00AEEF' },

  // Support Cards
  containerSUPPORT_CARDS: {
    paddingHorizontal: 0,
    paddingTop: verticalScale(0),
    paddingBottom: verticalScale(24),
  },
  cardSUPPORT_CARDS: {
    backgroundColor: '#ECE9E8',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
  },
  iconCircleSUPPORT_CARDS: {
    backgroundColor: '#23A455',
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  cardTitleSUPPORT_CARDS: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111',
    marginBottom: verticalScale(6),
  },
  cardDescriptionSUPPORT_CARDS: {
    fontSize: moderateScale(13),
    color: '#666',
    lineHeight: verticalScale(18),
  },

  // Categories
  categoryCard: {
    alignItems: 'center',
    marginRight: scale(12),
    marginHorizontal: scale(5),
    marginTop: verticalScale(10),
  },
  categoryImage: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
    borderRadius: moderateScale(15),
  },
  categoryText: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
    color: '#222',
  },

  // Banners
  banner: {
    width: '100%',
    height: responsiveWidth(50),
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderBottomLeftRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
  },
  bannerText: { fontSize: moderateScale(18), fontWeight: '600', color: '#fff' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },

  budgetCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(18),
    marginBottom: moderateScale(15),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardContent: {
    alignItems: 'center',
  },

  gradientCircle: {
     width: moderateScale(58),
    height: moderateScale(58),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },

  budgetTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#222',
    marginTop: 2,
  },

  budgetSubText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});

// Support Floating Button
const stylesSupport = StyleSheet.create({
  container: {
    bottom: verticalScale(30),
    right: scale(20),
    alignItems: 'flex-end',
    marginTop: verticalScale(50),
  },
  menu: {
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginVertical: verticalScale(4),
    color: '#1e1e1e',
  },
  floatingButton: {
    backgroundColor: '#0ea5e9',
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#f97316',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(12) },
});

export { styles, stylesSupport };
