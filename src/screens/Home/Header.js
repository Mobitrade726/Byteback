// // // import React, {useEffect, useState} from 'react';
// // // import {
// // //   Text,
// // //   TouchableOpacity,
// // //   View,
// // //   Image,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // // import EvilIcons from 'react-native-vector-icons/EvilIcons';
// // // import { API_BASE_URL } from '../../utils/utils';

// // // const Header = ({navigation}) => {
// // //   const [logoUrl, setLogoUrl] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchLogo = async () => {
// // //       try {
// // //         const response = await fetch(`${API_BASE_URL}/logo`);
// // //         const json = await response.json();
// // //         if (json.success && json.data.length > 0) {
// // //           setLogoUrl(json.data[0].logo);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching logo:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchLogo();
// // //   }, []);

// // //   return (
// // //     <View
// // //       style={{
// // //         backgroundColor: '#1ca147',
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         paddingHorizontal: 10,
// // //         paddingVertical: 16,
// // //         justifyContent: 'space-between',
// // //       }}>
// // //       {/* Logo or fallback text */}
// // //       {loading ? (
// // //         <ActivityIndicator size="small" color="#fff" />
// // //       ) : logoUrl ? (
// // //         <Image
// // //           source={{uri: logoUrl}}
// // //           style={{width: 120, height: 40, resizeMode: 'contain'}}
// // //         />
// // //       ) : (
// // //         <Text
// // //           style={{
// // //             color: 'white',
// // //             fontSize: 20,
// // //             fontWeight: 'bold',
// // //             letterSpacing: 1,
// // //           }}>
// // //           MOBI TRADE
// // //         </Text>
// // //       )}

// // //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
// // //         <TouchableOpacity
// // //           style={{
// // //             backgroundColor: '#fff',
// // //             borderRadius: 20,
// // //             paddingHorizontal: 16,
// // //             paddingVertical: 10,
// // //             flexDirection: 'row',
// // //             alignItems: 'center',
// // //             marginRight: 12,
// // //             shadowColor: '#000',
// // //             shadowOffset: {width: 0, height: 1},
// // //             shadowOpacity: 0.2,
// // //             shadowRadius: 2,
// // //             elevation: 2,
// // //           }}>
// // //           <MaterialCommunityIcons name="cube-outline" size={24} color="#555" />
// // //           <Text
// // //             style={{
// // //               fontSize: 16,
// // //               marginLeft: 8,
// // //               color: '#333',
// // //               fontWeight: '500',
// // //             }}>
// // //             Bulk Deals
// // //           </Text>
// // //         </TouchableOpacity>

// // //         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// // //           <EvilIcons name="search" size={45} color="#fff" />
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // export default Header;

// // import React, {useEffect, useState} from 'react';
// // import {
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Image,
// //   ActivityIndicator,
// // } from 'react-native';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import EvilIcons from 'react-native-vector-icons/EvilIcons';
// // import { API_BASE_URL } from '../../utils/utils';
// // import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// // const Header = ({navigation}) => {
// //   const [logoUrl, setLogoUrl] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLogo = async () => {
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/logo`);
// //         const json = await response.json();
// //         if (json.success && json.data.length > 0) {
// //           setLogoUrl(json.data[0].logo);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching logo:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLogo();
// //   }, []);

// //   return (
// //     <View
// //       style={{
// //         backgroundColor: '#1ca147',
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         paddingHorizontal: wp('3%'),
// //         paddingVertical: hp('3%'),
// //         justifyContent: 'space-between',
// //       }}>
// //       {/* Logo or fallback text */}
// //       {loading ? (
// //         <ActivityIndicator size="small" color="#fff" />
// //       ) : logoUrl ? (
// //         <Image
// //           source={{uri: logoUrl}}
// //           style={{
// //             width: wp('30%'), // responsive width
// //             height: hp('5%'), // responsive height
// //             resizeMode: 'contain',
// //           }}
// //         />
// //       ) : (
// //         <Text
// //           style={{
// //             color: 'white',
// //             fontSize: wp('5%'), // responsive font size
// //             fontWeight: 'bold',
// //             letterSpacing: 1,
// //           }}>
// //           MOBI TRADE
// //         </Text>
// //       )}

// //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
// //         <TouchableOpacity
// //           style={{
// //             backgroundColor: '#fff',
// //             borderRadius: wp('4%'),
// //             paddingHorizontal: wp('3%'),
// //             paddingVertical: hp('0.8%'),
// //             flexDirection: 'row',
// //             alignItems: 'center',
// //             marginRight: wp('3%'),
// //             shadowColor: '#000',
// //             shadowOffset: {width: 0, height: 1},
// //             shadowOpacity: 0.2,
// //             shadowRadius: 2,
// //             elevation: 2,
// //           }}>
// //           <MaterialCommunityIcons
// //             name="cube-outline"
// //             size={wp('6%')} // responsive icon
// //             color="#555"
// //           />
// //           <Text
// //             style={{
// //               fontSize: wp('3.5%'),
// //               marginLeft: wp('2%'),
// //               color: '#333',
// //               fontWeight: '500',
// //             }}>
// //             Bulk Deals
// //           </Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// //           <EvilIcons name="search" size={wp('12%')} color="#fff" />
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default Header;

// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   ActivityIndicator,
//   SafeAreaView,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import {API_BASE_URL} from '../../utils/utils';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const Header = ({navigation}) => {
//   const [logoUrl, setLogoUrl] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLogo = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/logo`);
//         const json = await response.json();
//         if (json.success && json.data.length > 0) {
//           setLogoUrl(json.data[0].logo);
//         }
//       } catch (error) {
//         console.error('Error fetching logo:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogo();
//   }, []);

//   return (
//       <View
//         style={{
//           backgroundColor: '#1ca147',
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: wp('2%'),
//           paddingVertical: hp('1.5%'),
//           justifyContent: 'space-between',
//           // height:hp('10%')
//         }}>
//         {/* LEFT - Logo */}
//         {loading ? (
//           <ActivityIndicator size="small" color="#fff" />
//         ) : logoUrl ? (
//           <Image
//             source={{uri: logoUrl}}
//             style={{
//               width: wp('28%'),
//               height: hp('4%'),
//               resizeMode: 'contain',

//             }}
//           />
//         ) : (
//           <Text
//             style={{
//               color: 'white',
//               fontSize: wp('5%'),
//               fontWeight: 'bold',
//               letterSpacing: 0.5,
//             }}>
//             Byteback
//           </Text>
//         )}

//         {/* RIGHT BUTTONS */}
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           {/* Bulk Deals Button */}
//           <TouchableOpacity
//             style={{
//               flexDirection: 'row',
//               backgroundColor: '#fff',
//               paddingHorizontal: wp('3.5%'),
//               paddingVertical: hp('0.8%'),
//               borderRadius: wp('5%'),
//               alignItems: 'center',
//               marginRight: wp('3%'),
//               elevation: 3,

//             }}>
//             <MaterialCommunityIcons
//               name="cube-outline"
//               size={wp('5.5%')}
//               color="#555"
//             />
//             <Text
//               style={{
//                 fontSize: wp('3.8%'),
//                 marginLeft: wp('2%'),
//                 color: '#333',
//                 fontWeight: '500',
//               }}>
//               Bulk Deals
//             </Text>
//           </TouchableOpacity>

//           {/* Search Icon */}
//           <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//             <EvilIcons name="search" size={wp('10.5%')} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//   );
// };

// export default Header;

import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {API_BASE_URL} from '../../utils/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Header = ({navigation}) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/logo`);
        const json = await response.json();
        if (json.success && json.data.length > 0) {
          setLogoUrl(json.data[0].logo);
        }
      } catch (error) {
        console.log('Error fetching logo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#1ca147',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        // paddingVertical: hp('1.5%'),
        justifyContent: 'space-between',
        height: hp('8%'),
      }}>
      
      {/* LEFT - Logo */}
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : logoUrl ? (
        <Image
          source={{uri: logoUrl}}
          style={{
            width: wp('25%'),
            height: hp('3.5%'),
            resizeMode: 'contain',
          }}
        />
      ) : (
        <Text
          style={{
            color: 'white',
            fontSize: wp('5%'),
            fontWeight: '700',
          }}>
          Byteback
        </Text>
      )}

      {/* RIGHT BUTTONS */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        
        {/* Bulk Deals Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingHorizontal: wp('3%'),
            paddingVertical: hp('0.8%'),
            borderRadius: wp('6%'),
            alignItems: 'center',
            marginRight: wp('3%'),
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}>
          <MaterialCommunityIcons
            name="cube-outline"
            size={wp('5.5%')}
            color="#555"
          />
          <Text
            style={{
              fontSize: wp('4%'),
              marginLeft: wp('1.5%'),
              color: '#333',
              fontWeight: '600',
            }}>
            Bulk Deals
          </Text>
        </TouchableOpacity>

        {/* Search Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <EvilIcons name="search" size={wp('10%')} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Header;
