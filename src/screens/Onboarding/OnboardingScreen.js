// // // // import React, {useRef, useState} from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   FlatList,
// // // //   Image,
// // // //   TouchableOpacity,
// // // //   SafeAreaView,
// // // //   useWindowDimensions,
// // // //   StatusBar,
// // // // } from 'react-native';
// // // // import {useNavigation} from '@react-navigation/native';

// // // // const slides = [
// // // //   {
// // // //     id: '1',
// // // //     image: require('../../../assets/images/onboarding1.png'),
// // // //     title: 'Welcome to\nMobi Trade',
// // // //     subtitle: 'Buy certified pre-owned Tech',
// // // //     buttons: ['Skip', 'Get Started'],
// // // //   },
// // // //   {
// // // //     id: '2',
// // // //     image: require('../../../assets/images/onboarding2.png'),
// // // //     title: 'Every device',
// // // //     title2: 'Checked & Certified',
// // // //     subtitle:
// // // //       '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
// // // //     buttons: ['Skip', 'Next'],
// // // //   },
// // // //   {
// // // //     id: '3',
// // // //     image: require('../../../assets/images/onboarding3.png'),
// // // //     title: 'Happy\nShopping',
// // // //     subtitle: 'Let’s find the right device for you.',
// // // //     buttons: ['Log in / Sign up'],
// // // //   },
// // // // ];

// // // // const OnboardingScreen = () => {
// // // //   const flatListRef = useRef(null);
// // // //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// // // //   const navigation = useNavigation();
// // // //   const {width, height} = useWindowDimensions();

// // // //   const handleNext = () => {
// // // //     if (currentSlideIndex < slides.length - 1) {
// // // //       flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
// // // //     }
// // // //   };

// // // //   const handleSkip = () => {
// // // //     flatListRef.current.scrollToIndex({index: slides.length - 1});
// // // //   };

// // // //   const renderSlide = ({item}) => (
// // // //     <View style={[styles.slide, {width}]}>

// // // //       {/* IMAGE TOP SECTION */}
// // // //       <Image
// // // //         source={item.image}
// // // //         style={{
// // // //           width: width * 0.9,
// // // //           height: height * 0.42,
// // // //           marginTop: 20,
// // // //         }}
// // // //         resizeMode="contain"
// // // //       />

// // // //       {/* TEXT + BUTTON SECTION */}
// // // //       <View style={styles.textContainer}>
// // // //         <Text style={styles.title}>{item.title}</Text>

// // // //         {item.id === '2' && (
// // // //           <Text style={styles.title2}>{item.title2}</Text>
// // // //         )}

// // // //         <Text style={styles.subtitle}>{item.subtitle}</Text>

// // // //         {/* Pagination Dots */}
// // // //         <View style={styles.pagination}>
// // // //           {slides.map((_, index) => (
// // // //             <View
// // // //               key={index}
// // // //               style={[
// // // //                 styles.dot,
// // // //                 currentSlideIndex === index && styles.activeDot,
// // // //               ]}
// // // //             />
// // // //           ))}
// // // //         </View>

// // // //         {/* Buttons */}
// // // //         <View style={styles.buttonRow}>
// // // //           {item.buttons.includes('Skip') && (
// // // //             <TouchableOpacity
// // // //               style={[styles.skipButton, {width: width * 0.4}]}
// // // //               onPress={handleSkip}>
// // // //               <Text style={styles.skipText}>Skip</Text>
// // // //             </TouchableOpacity>
// // // //           )}

// // // //           {item.buttons.includes('Next') && (
// // // //             <TouchableOpacity
// // // //               style={[styles.nextButton, {width: width * 0.4}]}
// // // //               onPress={handleNext}>
// // // //               <Text style={styles.nextText}>Next</Text>
// // // //             </TouchableOpacity>
// // // //           )}

// // // //           {item.buttons.includes('Get Started') && (
// // // //             <TouchableOpacity
// // // //               style={[styles.nextButton, {width: width * 0.4}]}
// // // //               onPress={handleNext}>
// // // //               <Text style={styles.nextText}>Get Started</Text>
// // // //             </TouchableOpacity>
// // // //           )}

// // // //           {item.buttons.includes('Log in / Sign up') && (
// // // //             <TouchableOpacity
// // // //               style={[styles.nextButton, {width: width * 0.8}]}
// // // //               onPress={() => navigation.navigate('LoginScreen')}>
// // // //               <Text style={styles.nextText}>Log in / Sign up</Text>
// // // //             </TouchableOpacity>
// // // //           )}
// // // //         </View>
// // // //       </View>
// // // //     </View>
// // // //   );

// // // //   const updateCurrentSlideIndex = e => {
// // // //     const contentOffsetX = e.nativeEvent.contentOffset.x;
// // // //     const index = Math.round(contentOffsetX / width);
// // // //     setCurrentSlideIndex(index);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
// // // //       <SafeAreaView style={styles.container}>

// // // //         <FlatList
// // // //           ref={flatListRef}
// // // //           data={slides}
// // // //           horizontal
// // // //           pagingEnabled
// // // //           showsHorizontalScrollIndicator={false}
// // // //           renderItem={renderSlide}
// // // //           keyExtractor={item => item.id}
// // // //           onMomentumScrollEnd={updateCurrentSlideIndex}
// // // //           getItemLayout={(_, index) => ({
// // // //             length: width,
// // // //             offset: width * index,
// // // //             index,
// // // //           })}
// // // //         />

// // // //       </SafeAreaView>
// // // //     </>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: '#fff',
// // // //   },

// // // //   slide: {
// // // //     flex: 1,
// // // //     alignItems: 'center',
// // // //     justifyContent: 'flex-start',
// // // //   },

// // // //   textContainer: {
// // // //     width: '100%',
// // // //     paddingHorizontal: 28,
// // // //     marginTop: 50,               // Proper gap between image and text
// // // //   },

// // // //   title: {
// // // //     fontSize: 48,
// // // //     fontWeight: 'bold',
// // // //     color: '#1c1c1c',
// // // //     marginBottom: 5,
// // // //   },

// // // //   title2: {
// // // //     fontSize: 26,
// // // //     fontWeight: 'bold',
// // // //     color: '#1c1c1c',
// // // //     marginTop: -10,
// // // //     marginBottom: 10,
// // // //   },

// // // //   subtitle: {
// // // //     fontSize: 17,
// // // //     color: '#444',
// // // //     lineHeight: 23,
// // // //     fontWeight: '500',
// // // //     marginTop: 10,
// // // //   },

// // // //   pagination: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'center',
// // // //     marginTop: 40,
// // // //     marginBottom: 40,     // Like screenshot
// // // //   },

// // // //   dot: {
// // // //     width: 7,
// // // //     height: 7,
// // // //     borderRadius: 4,
// // // //     backgroundColor: '#ccc',
// // // //     marginHorizontal: 5,
// // // //   },

// // // //   activeDot: {
// // // //     width: 10,
// // // //     height: 10,
// // // //     backgroundColor: '#1C9C48',
// // // //   },

// // // //   buttonRow: {
// // // //     flexDirection: 'row',
// // // //     flexWrap: 'wrap',
// // // //     justifyContent: 'center',
// // // //     gap: 18,
// // // //   },

// // // //   skipButton: {
// // // //     borderWidth: 2,
// // // //     borderColor: '#1C9C48',
// // // //     paddingVertical: 14,
// // // //     borderRadius: 10,
// // // //   },

// // // //   skipText: {
// // // //     textAlign: 'center',
// // // //     color: '#1C9C48',
// // // //     fontSize: 16,
// // // //     fontWeight: '600',
// // // //   },

// // // //   nextButton: {
// // // //     backgroundColor: '#1C9C48',
// // // //     paddingVertical: 14,
// // // //     borderRadius: 10,
// // // //   },

// // // //   nextText: {
// // // //     color: '#fff',
// // // //     textAlign: 'center',
// // // //     fontSize: 16,
// // // //     fontWeight: '600',
// // // //   },
// // // // });

// // // // export default OnboardingScreen;

// // // import React, {useRef, useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   FlatList,
// // //   Image,
// // //   TouchableOpacity,
// // //   SafeAreaView,
// // //   useWindowDimensions,
// // //   StatusBar,
// // // } from 'react-native';
// // // import {useNavigation} from '@react-navigation/native';

// // // const slides = [
// // //   {
// // //     id: '1',
// // //     image: require('../../../assets/images/onboarding1.png'),
// // //     title: 'Welcome to\nMobi Trade',
// // //     subtitle: 'Buy certified pre-owned Tech',
// // //     buttons: ['Skip', 'Get Started'],
// // //   },
// // //   {
// // //     id: '2',
// // //     image: require('../../../assets/images/onboarding2.png'),
// // //     title: 'Every device',
// // //     title2: 'Checked & Certified',
// // //     subtitle:
// // //       '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
// // //     buttons: ['Skip', 'Next'],
// // //   },
// // //   {
// // //     id: '3',
// // //     image: require('../../../assets/images/onboarding3.png'),
// // //     title: 'Happy\nShopping',
// // //     subtitle: 'Let’s find the right device for you.',
// // //     buttons: ['Log in / Sign up'],
// // //   },
// // // ];

// // // const OnboardingScreen = () => {
// // //   const flatListRef = useRef(null);
// // //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// // //   const navigation = useNavigation();
// // //   const {width, height} = useWindowDimensions();

// // //   // responsive helpers
// // //   const wp = val => (width * val) / 100;
// // //   const hp = val => (height * val) / 100;
// // //   const rf = val => val * (width / 375);

// // //   const handleNext = () => {
// // //     if (currentSlideIndex < slides.length - 1) {
// // //       flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
// // //     }
// // //   };

// // //   const handleSkip = () => {
// // //     flatListRef.current.scrollToIndex({index: slides.length - 1});
// // //   };

// // //   const renderSlide = ({item}) => (
// // //     <View style={[styles.slide, {width}]}>

// // //       {/* IMAGE SECTION */}
// // //       <Image
// // //         source={item.image}
// // //         style={{
// // //           width: wp(90),
// // //           height: hp(40),
// // //           marginTop: hp(6),
// // //           marginVertical: hp(2),
// // //         }}
// // //         resizeMode="contain"
// // //       />

// // //       {/* TEXT + BUTTON SECTION */}
// // //       <View style={[styles.textContainer, {paddingHorizontal: wp(6), marginTop: hp(4)}]}>
// // //         <Text style={[styles.title, {fontSize: rf(40), lineHeight: rf(48)}]}>
// // //           {item.title}
// // //         </Text>

// // //         {item.id === '2' && (
// // //           <Text style={[styles.title2, {fontSize: rf(24)}]}>{item.title2}</Text>
// // //         )}

// // //         <Text style={[styles.subtitle, {fontSize: rf(16), lineHeight: rf(22),  marginVertical: hp(1)}]}>
// // //           {item.subtitle}
// // //         </Text>

// // //         {/* Pagination */}
// // //         <View style={[styles.pagination, {marginTop: hp(5), marginBottom: hp(5)}]}>
// // //           {slides.map((_, index) => (
// // //             <View
// // //               key={index}
// // //               style={[
// // //                 styles.dot,
// // //                 {
// // //                   width: currentSlideIndex === index ? wp(3) : wp(2),
// // //                   height: currentSlideIndex === index ? wp(3) : wp(2),
// // //                   backgroundColor: currentSlideIndex === index ? '#1C9C48' : '#ccc',
// // //                 },
// // //               ]}
// // //             />
// // //           ))}
// // //         </View>

// // //         {/* Buttons */}
// // //         <View style={[styles.buttonRow, {gap: wp(4)}]}>
// // //           {item.buttons.includes('Skip') && (
// // //             <TouchableOpacity
// // //               style={[
// // //                 styles.skipButton,
// // //                 {width: wp(40), paddingVertical: hp(1.8), borderRadius: wp(3)},
// // //               ]}
// // //               onPress={handleSkip}>
// // //               <Text style={[styles.skipText, {fontSize: rf(16)}]}>Skip</Text>
// // //             </TouchableOpacity>
// // //           )}

// // //           {item.buttons.includes('Next') && (
// // //             <TouchableOpacity
// // //               style={[
// // //                 styles.nextButton,
// // //                 {width: wp(40), paddingVertical: hp(1.8), borderRadius: wp(3)},
// // //               ]}
// // //               onPress={handleNext}>
// // //               <Text style={[styles.nextText, {fontSize: rf(16)}]}>Next</Text>
// // //             </TouchableOpacity>
// // //           )}

// // //           {item.buttons.includes('Get Started') && (
// // //             <TouchableOpacity
// // //               style={[
// // //                 styles.nextButton,
// // //                 {width: wp(40), paddingVertical: hp(1.8), borderRadius: wp(3)},
// // //               ]}
// // //               onPress={handleNext}>
// // //               <Text style={[styles.nextText, {fontSize: rf(16)}]}>Get Started</Text>
// // //             </TouchableOpacity>
// // //           )}

// // //           {item.buttons.includes('Log in / Sign up') && (
// // //             <TouchableOpacity
// // //               style={[
// // //                 styles.nextButton,
// // //                 {width: wp(80), paddingVertical: hp(2), borderRadius: wp(3)},
// // //               ]}
// // //               onPress={() => navigation.navigate('LoginScreen')}>
// // //               <Text style={[styles.nextText, {fontSize: rf(16)}]}>
// // //                 Log in / Sign up
// // //               </Text>
// // //             </TouchableOpacity>
// // //           )}
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );

// // //   const updateCurrentSlideIndex = e => {
// // //     const index = Math.round(e.nativeEvent.contentOffset.x / width);
// // //     setCurrentSlideIndex(index);
// // //   };

// // //   return (
// // //     <>
// // //       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
// // //       <SafeAreaView style={styles.container}>

// // //         <FlatList
// // //           ref={flatListRef}
// // //           data={slides}
// // //           horizontal
// // //           pagingEnabled
// // //           showsHorizontalScrollIndicator={false}
// // //           renderItem={renderSlide}
// // //           keyExtractor={item => item.id}
// // //           onMomentumScrollEnd={updateCurrentSlideIndex}
// // //           getItemLayout={(_, index) => ({
// // //             length: width,
// // //             offset: width * index,
// // //             index,
// // //           })}
// // //         />

// // //       </SafeAreaView>
// // //     </>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {flex: 1, backgroundColor: '#fff'},
// // //   slide: {flex: 1, alignItems: 'center'},
// // //   textContainer: {},
// // //   title: {fontWeight: 'bold', color: '#1c1c1c'},
// // //   title2: {fontWeight: 'bold', color: '#1c1c1c', marginBottom: 10},
// // //   subtitle: {color: '#444', marginTop: 10, fontWeight: '500'},
// // //   pagination: {flexDirection: 'row', justifyContent: 'center'},
// // //   dot: {borderRadius: 50, marginHorizontal: 5},
// // //   activeDot: {},
// // //   buttonRow: {flexDirection: 'row'},
// // //   skipButton: {borderWidth: 2, borderColor: '#1C9C48'},
// // //   skipText: {textAlign: 'center', color: '#1C9C48', fontWeight: '600'},
// // //   nextButton: {backgroundColor: '#1C9C48'},
// // //   nextText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
// // // });

// // // export default OnboardingScreen;

// // import React, {useRef, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   Image,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   useWindowDimensions,
// //   StatusBar,
// // } from 'react-native';
// // import {useNavigation} from '@react-navigation/native';

// // const slides = [
// //   {
// //     id: '1',
// //     image: require('../../../assets/images/onboarding1.png'),
// //     title: 'Welcome to\nByteback',
// //     subtitle: 'Buy certified pre-owned Tech',
// //     buttons: ['Get Started'],
// //   },
// //   {
// //     id: '2',
// //     image: require('../../../assets/images/onboarding2.png'),
// //     title: 'Every device',
// //     title2: 'Checked & Certified',
// //     subtitle:
// //       '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
// //     buttons: ['Skip', 'Next'],
// //   },
// //   {
// //     id: '3',
// //     image: require('../../../assets/images/onboarding3.png'),
// //     title: 'Happy\nShopping',
// //     subtitle: 'Let’s find the right device for you.',
// //     buttons: ['Log in / Sign up'],
// //   },
// // ];

// // const OnboardingScreen = () => {
// //   const flatListRef = useRef(null);
// //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// //   const navigation = useNavigation();
// //   const {width, height} = useWindowDimensions();

// //   // responsive helpers
// //   const wp = val => (width * val) / 100;
// //   const hp = val => (height * val) / 100;
// //   const rf = val => val * (width / 375);

// //   const handleNext = () => {
// //     if (currentSlideIndex < slides.length - 1) {
// //       flatListRef.current.scrollToIndex({index: currentSlideIndex + 1});
// //     }
// //   };

// //   const handleSkip = () => {
// //     flatListRef.current.scrollToIndex({index: slides.length - 1});
// //   };

// //   const renderSlide = ({item}) => (
// //     <View style={[styles.slide, {width}]}>
// //       {/* IMAGE SECTION */}
// //       <Image
// //         source={item.image}
// //         style={{
// //           width: wp(90),
// //           height: hp(40),
// //           marginTop: hp(6),
// //           marginBottom: hp(2),
// //         }}
// //         resizeMode="contain"
// //       />

// //       {/* TEXT SECTION */}
// //       <View
// //         style={[
// //           styles.textContainer,
// //           {paddingHorizontal: wp(6), marginTop: hp(4)},
// //         ]}>
// //         <Text style={[styles.title, {fontSize: rf(40), lineHeight: rf(48)}]}>
// //           {item.title}
// //         </Text>

// //         {item.id === '2' && (
// //           <Text style={[styles.title2, {fontSize: rf(24)}]}>{item.title2}</Text>
// //         )}

// //         <Text
// //           style={[
// //             styles.subtitle,
// //             {fontSize: rf(16), lineHeight: rf(22), marginVertical: hp(1)},
// //           ]}>
// //           {item.subtitle}
// //         </Text>

// //         {/* Pagination */}
// //         <View
// //           style={[styles.pagination, {marginTop: hp(5), marginBottom: hp(8)}]}>
// //           {slides.map((_, index) => (
// //             <View
// //               key={index}
// //               style={[
// //                 styles.dot,
// //                 {
// //                   width: currentSlideIndex === index ? wp(3) : wp(3),
// //                   height: currentSlideIndex === index ? wp(3) : wp(3),
// //                   backgroundColor:
// //                     currentSlideIndex === index ? '#1C9C48' : '#ccc',
// //                 },
// //               ]}
// //             />
// //           ))}
// //         </View>
// //       </View>

// //       {/* FIXED BOTTOM BUTTON SECTION */}
// //       <View style={styles.bottomButtons}>
// //         {item.buttons.includes('Skip') && (
// //           <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
// //             <Text style={styles.skipText}>Skip</Text>
// //           </TouchableOpacity>
// //         )}

// //         {item.buttons.includes('Next') && (
// //           <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
// //             <Text style={styles.nextText}>Next</Text>
// //           </TouchableOpacity>
// //         )}

// //         {item.buttons.includes('Get Started') && (
// //           <>
// //             <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
// //               <Text style={styles.skipText}>Skip</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
// //               <Text style={styles.nextText}>Get Started</Text>
// //             </TouchableOpacity>
// //           </>
// //         )}

// //         {item.buttons.includes('Log in / Sign up') && (
// //           <TouchableOpacity
// //             style={[styles.nextButton, {width: wp(80)}]}
// //             onPress={() => navigation.navigate('LoginScreen')}>
// //             <Text style={styles.nextText}>Log in / Sign up</Text>
// //           </TouchableOpacity>
// //         )}
// //       </View>
// //     </View>
// //   );

// //   const updateCurrentSlideIndex = e => {
// //     const index = Math.round(e.nativeEvent.contentOffset.x / width);
// //     setCurrentSlideIndex(index);
// //   };

// //   return (
// //     <>
// //       <StatusBar
// //         translucent
// //         backgroundColor="transparent"
// //         barStyle="dark-content"
// //       />
// //       <SafeAreaView style={styles.container}>
// //         <FlatList
// //           ref={flatListRef}
// //           data={slides}
// //           horizontal
// //           pagingEnabled
// //           showsHorizontalScrollIndicator={false}
// //           renderItem={renderSlide}
// //           keyExtractor={item => item.id}
// //           onMomentumScrollEnd={updateCurrentSlideIndex}
// //           getItemLayout={(_, index) => ({
// //             length: width,
// //             offset: width * index,
// //             index,
// //           })}
// //         />
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {flex: 1, backgroundColor: '#fff'},
// //   slide: {flex: 1},
// //   textContainer: {},
// //   title: {fontWeight: 'bold', color: '#1c1c1c'},
// //   title2: {fontWeight: 'bold', color: '#1c1c1c', marginBottom: 10},
// //   subtitle: {color: '#444', marginTop: 10, fontWeight: '500'},

// //   /* Pagination */
// //   pagination: {flexDirection: 'row', justifyContent: 'center'},
// //   dot: {borderRadius: 50, marginHorizontal: 5},

// //   /* Bottom Buttons */
// //   bottomButtons: {
// //     position: 'absolute',
// //     bottom: 40,
// //     width: '100%',
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     gap: 20,
// //     paddingHorizontal: 20,
// //   },
// //   skipButton: {
// //     borderWidth: 2,
// //     borderColor: '#1C9C48',
// //     paddingVertical: 12,
// //     paddingHorizontal: 26,
// //     borderRadius: 10,
// //   },
// //   nextButton: {
// //     backgroundColor: '#1C9C48',
// //     paddingVertical: 12,
// //     paddingHorizontal: 26,
// //     borderRadius: 10,
// //   },
// //   nextText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //     textAlign:'center',
// //   },
// //   skipText: {
// //     color: '#1C9C48',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });

// // export default OnboardingScreen;

// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   useWindowDimensions,
//   StatusBar,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { moderateScale } from 'react-native-size-matters';

// const slides = [
//   {
//     id: '1',
//     image: require('../../../assets/images/onboarding1.png'),
//     title: 'Welcome to\nByteback',
//     subtitle: 'Buy certified pre-owned Tech',
//     buttons: ['Get Started'],
//   },
//   {
//     id: '2',
//     image: require('../../../assets/images/onboarding2.png'),
//     title: 'Every device',
//     title2: 'Checked & Certified',
//     subtitle:
//       '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
//     buttons: ['Skip', 'Next'],
//   },
//   {
//     id: '3',
//     image: require('../../../assets/images/onboarding3.png'),
//     title: 'Happy\nShopping',
//     subtitle: 'Let’s find the right device for you.',
//     buttons: ['Login'],
//   },
// ];

// const OnboardingScreen = () => {
//   const flatListRef = useRef(null);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const navigation = useNavigation();
//   const { width, height } = useWindowDimensions();

//   // responsive
//   const wp = v => (width * v) / 100;
//   const hp = v => (height * v) / 100;
//   const rf = v => v * (width / 375);

//   const handleNext = () => {
//     if (currentSlideIndex < slides.length - 1) {
//       flatListRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
//     }
//   };

//   const handleSkip = () => {
//     flatListRef.current.scrollToIndex({ index: slides.length - 1 });
//   };

//   const updateCurrentSlideIndex = e => {
//     const index = Math.round(e.nativeEvent.contentOffset.x / width);
//     setCurrentSlideIndex(index);
//   };

//   const renderSlide = ({ item }) => (
//     <View style={[styles.slide, { width }]}>
//       <Image
//         source={item.image}
//         style={{
//           width: wp(90),
//           height: hp(42),
//           marginTop: hp(6),
//         }}
//         resizeMode="contain"
//       />

//       {/* TEXT BLOCK */}
//       <View
//         style={{
//           paddingHorizontal: wp(6),
//           marginTop: hp(4),
//         }}
//       >
//         <Text style={[styles.title, { fontSize: rf(38), lineHeight: rf(46) }]}>
//           {item.title}
//         </Text>

//         {item.id === '2' && (
//           <Text style={[styles.title2, { fontSize: rf(24) }]}>
//             {item.title2}
//           </Text>
//         )}

//         <Text
//           style={[
//             styles.subtitle,
//             { fontSize: rf(16), lineHeight: rf(22), marginTop: hp(1) },
//           ]}
//         >
//           {item.subtitle}
//         </Text>

//         {/* Pagination */}
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginTop: hp(5),
//           }}
//         >
//           {slides.map((_, index) => (
//             <View
//               key={index}
//               style={{
//                 width: wp(2.8),
//                 height: wp(2.8),
//                 borderRadius: wp(1.5),
//                 backgroundColor:
//                   currentSlideIndex === index ? '#1C9C48' : '#C9C9C9',
//                 marginHorizontal: 5,
//               }}
//             />
//           ))}
//         </View>
//       </View>
//     </View>
//   );

//   const currentSlide = slides[currentSlideIndex];

//   return (
//     <>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />
//       <SafeAreaView style={styles.container}>
//         {/* SLIDES */}
//         {/* <FlatList
//           ref={flatListRef}
//           data={slides}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           renderItem={renderSlide}
//           keyExtractor={item => item.id}
//           onMomentumScrollEnd={updateCurrentSlideIndex}
//         /> */}

//         <FlatList
//           ref={flatListRef}
//           data={slides}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           renderItem={renderSlide}
//           keyExtractor={item => item.id}
//           onMomentumScrollEnd={updateCurrentSlideIndex}
//           initialNumToRender={1}
//           maxToRenderPerBatch={1}
//           windowSize={2}
//           removeClippedSubviews={false}
//           bounces={false}
//           decelerationRate="fast"
//           scrollEventThrottle={16}
//         />

//         {/* FIXED BOTTOM BUTTONS */}
//         <View style={styles.bottomArea}>
//           {currentSlide.buttons.includes('Skip') && (
//             <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//               <Text style={styles.skipText}>Skip</Text>
//             </TouchableOpacity>
//           )}

//           {currentSlide.buttons.includes('Next') && (
//             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//               <Text style={styles.nextText}>Next</Text>
//             </TouchableOpacity>
//           )}

//           {currentSlide.buttons.includes('Get Started') && (
//             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//               <Text style={styles.nextText}>Get Started</Text>
//             </TouchableOpacity>
//           )}

//           {currentSlide.buttons.includes('Login') && (
//             <TouchableOpacity
//               style={[styles.nextButton]}
//               onPress={() => navigation.navigate('LoginScreen')}
//             >
//               <Text style={styles.nextText}>Log in / Sign up</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   slide: { flex: 1, alignItems: 'center' },

//   title: { fontWeight: 'bold', color: '#1c1c1c' },
//   title2: { fontWeight: 'bold', color: '#1c1c1c', marginTop: -10 },

//   subtitle: { color: '#444', fontWeight: '500' },

//   bottomArea: {
//     width: '90%',
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     marginBottom: '15%',
//     gap: moderateScale(20),
//   },

//   skipButton: {
//     borderWidth: moderateScale(2),
//     borderColor: '#1C9C48',
//     paddingVertical: moderateScale(12),
//     paddingHorizontal: moderateScale(30),
//     borderRadius: moderateScale(10),
//   },

//   nextButton: {
//     backgroundColor: '#1C9C48',
//     paddingVertical: moderateScale(12),
//     paddingHorizontal: moderateScale(30),
//     borderRadius: moderateScale(10),
//   },

//   skipText: { color: '#1C9C48', fontWeight: '600', fontSize: 16 },
//   nextText: { color: '#fff', fontWeight: '600', fontSize: 16 },
// });

// export default OnboardingScreen;

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Welcome to\nByteback',
    subtitle: 'Buy certified pre-owned Tech',
    buttons: ['Get Started'],
  },
  {
    id: '2',
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Every device',
    title2: 'Checked & Certified',
    subtitle:
      '• 6 months warranty\n• 52 point quality checks\n• Best prices guaranteed',
    buttons: ['Skip', 'Next'],
  },
  {
    id: '3',
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Happy\nShopping',
    subtitle: 'Let’s find the right device for you.',
    buttons: ['Login'],
  },
];

const OnboardingScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const wp = v => (width * v) / 100;
  const hp = v => (height * v) / 100;
  const rf = v => v * (width / 375);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    flatListRef.current.scrollToIndex({ index: slides.length - 1 });
  };

  const onScrollEnd = e => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={{
          width: wp(90),
          height: hp(42),
          marginTop: hp(6),
        }}
      />

      <View style={{ paddingHorizontal: wp(6), marginTop: hp(4) }}>
        <Text style={[styles.title, { fontSize: rf(38), lineHeight: rf(46) }]}>
          {item.title}
        </Text>

        {item.title2 && (
          <Text style={[styles.title2, { fontSize: rf(24) }]}>
            {item.title2}
          </Text>
        )}

        <Text
          style={[
            styles.subtitle,
            { fontSize: rf(16), lineHeight: rf(22), marginTop: hp(1) },
          ]}
        >
          {item.subtitle}
        </Text>
      </View>
    </View>
  );

  const currentSlide = slides[currentIndex];

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        {/* SLIDES ONLY */}
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderSlide}
          keyExtractor={item => item.id}
          onMomentumScrollEnd={onScrollEnd}
          bounces={false}
          initialNumToRender={1}
          windowSize={2}
        />

        {/* STATIC DOTS */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* STATIC FOOTER */}
        {/* <View style={styles.bottomArea}>
          {currentSlide.buttons.includes('Skip') && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {currentSlide.buttons.includes('Next') && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          )}

          {currentSlide.buttons.includes('Get Started') && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Get Started</Text>
            </TouchableOpacity>
          )}

          {currentSlide.buttons.includes('Login') && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.nextText}>Log in / Sign up</Text>
            </TouchableOpacity>
          )}
        </View> */}

        <View style={styles.bottomArea}>
          {/* LEFT : SKIP */}
          <TouchableOpacity
            style={[
              styles.skipButton,
              !currentSlide.buttons.includes('Skip') && styles.hiddenButton,
            ]}
            disabled={!currentSlide.buttons.includes('Skip')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* RIGHT : ACTION */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentSlide.buttons.includes('Next')) handleNext();
              else if (currentSlide.buttons.includes('Get Started'))
                handleNext();
              else navigation.navigate('LoginScreen');
            }}
          >
            <Text style={styles.nextText}>
              {currentSlide.buttons.includes('Next')
                ? 'Next'
                : currentSlide.buttons.includes('Get Started')
                ? 'Get Started'
                : 'Log in / Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  slide: { flex: 1, alignItems: 'center' },

  title: {
    fontWeight: '800',
    color: '#1c1c1c',
  },

  title2: {
    fontWeight: '800',
    color: '#1c1c1c',
    marginTop: -8,
  },

  subtitle: {
    color: '#444',
    fontWeight: '500',
  },

  dotsContainer: {
    position: 'absolute',
    bottom: '22%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C9C9C9',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#1C9C48',
  },

  bottomArea: {
    position: 'absolute',
    bottom: moderateScale(50),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  skipButton: {
    width: '45%',
    borderWidth: 2,
    borderColor: '#1C9C48',
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  nextButton: {
    width: '45%',
    backgroundColor: '#1C9C48',
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  hiddenButton: {
    opacity: 0,
    pointerEvents: 'none',
  },

  skipText: {
    color: '#1C9C48',
    fontWeight: '600',
    fontSize: 16,
  },

  nextText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
