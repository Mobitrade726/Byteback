// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView, SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DeviceInfo from 'react-native-device-info';
// import {useSelector, useDispatch} from 'react-redux';
// import {fetchProfile} from '../../../redux/slices/profileSlice';
// import Toast from 'react-native-toast-message';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Header from '../../../constants/Header';

// const ProfileScreen = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {data, error} = useSelector(state => state.profile);
//   const [appVersion, setAppVersion] = React.useState('');
//   const [kycData] = useState({
//     status:
//       data?.vendordocuments?.proof_of_identity === null
//         ? 'Pending'
//         : 'Approved',
//   });

//   useEffect(() => {
//     const getVersion = async () => {
//       const version = await DeviceInfo.getVersion();
//       setAppVersion(version);
//     };
//     getVersion();
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       Toast.show({type: 'error', text2: error});
//     }
//   }, [error]);

//   const options = [
//     {
//       label: 'My Orders',
//       image: require('../../../../assets/images/OrdersIcon.png'),
//       screen: 'Myorder',
//     },
//     {
//       label: 'KYC Status',
//       image: require('../../../../assets/images/kycstatus.png'),
//       screen: 'KYCStatus',
//       kycStatus: kycData?.status,
//     },
//     {
//       label: 'Wishlist',
//       image: require('../../../../assets/images/WishlistIcon.png'),
//       screen: 'WatchList',
//     },
//     {
//       label: 'My Wallet',
//       image: require('../../../../assets/images/wallet.png'),
//       screen: 'Wallet',
//     },
//     {
//       label: 'Saved Addresses',
//       image: require('../../../../assets/images/AddressIcon.png'),
//       screen: 'Addresses',
//     },
//     {
//       label: 'Help Centre',
//       image: require('../../../../assets/images/HelpIcon.png'),
//       subtext: 'FAQs',
//       screen: 'HelpSupport',
//     },
//     {
//       label: 'About',
//       image: require('../../../../assets/images/about.png'),
//       subtext: `App Version: v${appVersion}`,
//       screen: 'AboutMobiTrade',
//     },
//     {
//       label: 'Settings',
//       image: require('../../../../assets/images/setting.png'),
//       screen: 'Settings',
//     },
//   ];

//   const handleNavigation = screen => {
//     if (screen) {
//       navigation.navigate(screen, {
//         cat: data?.vendor_category || '',
//         profileEdit: data,
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//       <Header title="Profile info" navigation={navigation} showBack={true} />

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.profileContainer}>
//           <Text style={styles.name}>{data?.customer_name || ''}</Text>
//           <Text style={styles.email}>{data?.email || ''}</Text>
//         </View>

//         {options.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleNavigation(item.screen)}
//             style={styles.optionRow}>
//             <Image source={item.image} style={styles.optionImage} />
//             <View style={styles.optionTextContainer}>
//               <Text style={styles.optionLabel}>{item.label}</Text>
//               {item.subtext && (
//                 <Text style={styles.optionSubtext}>{item.subtext}</Text>
//               )}
//             </View>
//             {item.label === 'KYC Status' ? (
//               <Text
//                 style={{
//                   marginRight: 10,
//                   color: 'green',
//                   fontWeight: 'bold',
//                 }}>
//                 {item.kycStatus}
//               </Text>
//             ) : (
//               <Text
//                 style={{
//                   marginRight: 10,
//                   color: 'red',
//                   fontWeight: 'bold',
//                 }}>
//                 {item.kycStatus}
//               </Text>
//             )}

//             <Icon name="chevron-forward" size={wp('5%')} color="#999" />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     marginHorizontal: wp('3%'),
//     flexGrow: 1,
//     paddingBottom: hp('2%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     justifyContent: 'space-between',
//     marginHorizontal: wp('3%'),
//   },
//   backButton: {
//     backgroundColor: '#cf',
//     borderRadius: wp('6%'),
//     padding: wp('2%'),
//   },
//   headerTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   name: {
//     fontSize: wp('5%'),
//     fontWeight: '700',
//     marginTop: hp('1%'),
//     color: '#333',
//   },
//   email: {
//     fontSize: wp('3.5%'),
//     color: '#999',
//     marginBottom: hp('1%'),
//   },
//   optionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('2%'),
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     borderRadius: wp('2%'),
//   },
//   optionImage: {
//     width: wp('7%'),
//     height: wp('7%'),
//     marginRight: wp('3%'),
//     resizeMode: 'contain',
//   },
//   optionTextContainer: {
//     flex: 1,
//   },
//   optionLabel: {
//     fontSize: wp('4%'),
//     fontWeight: '600',
//     color: '#222',
//   },
//   optionSubtext: {
//     fontSize: wp('3%'),
//     color: '#888',
//     marginTop: hp('0.5%'),
//   },
//   logoutBtn: {
//     backgroundColor: '#000',
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: wp('4%'),
//     paddingVertical: hp('2%'),
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: wp('4%'),
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../../../redux/slices/profileSlice';
import Toast from 'react-native-toast-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../../constants/Header';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.profile);
  const [appVersion, setAppVersion] = useState('');
  // const [kycData] = useState({
  //   status:
  //     data?.vendordocuments == null
  //       ? 'Pending' // or 'Pending', whatever default you want
  //       : data?.vendordocuments?.proof_of_identity === null
  //       ? 'Pending'
  //       : 'Approved',
  // });

  const getKycStatus = () => {
    if (
      data?.vendordocuments == null ||
      data?.vendordocuments?.proof_of_identity === null
    ) {
      return {
        status: 'Pending',
        color: 'red',
      };
    } else {
      return {
        status: 'Approved',
        color: '#4CAF50',
      };
    }
  };

  const [kycData, setKycData] = useState(getKycStatus());

  useEffect(() => {
    setKycData(getKycStatus());
  }, [data]);

  useEffect(() => {
    const getVersion = async () => {
      const version = await DeviceInfo.getVersion();
      setAppVersion(version);
    };
    getVersion();
    dispatch(fetchProfile());
  }, [dispatch]);

  // const options = [
  //   {
  //     label: 'My Orders',
  //     image: require('../../../../assets/images/OrdersIcon.png'),
  //     screen: 'Myorder',
  //   },
  //   {
  //     label: 'KYC Status',
  //     image: require('../../../../assets/images/kycstatus.png'),
  //     screen: 'KYCStatus',
  //     kycStatus: kycData?.status,
  //   },
  //   {
  //     label: 'Wishlist',
  //     image: require('../../../../assets/images/WishlistIcon.png'),
  //     screen: 'WatchList',
  //   },
  //   {
  //     label: 'My Wallet',
  //     image: require('../../../../assets/images/wallet.png'),
  //     screen: 'Wallet',
  //   },
  //   {
  //     label: 'Saved Addresses',
  //     image: require('../../../../assets/images/AddressIcon.png'),
  //     screen: 'Addresses',
  //   },
  //   {
  //     label: 'Help Centre',
  //     image: require('../../../../assets/images/HelpIcon.png'),
  //     subtext: 'FAQs',
  //     screen: 'HelpSupport',
  //   },
  //   {
  //     label: 'About',
  //     image: require('../../../../assets/images/about.png'),
  //     subtext: `App Version: v${appVersion}`,
  //     screen: 'AboutMobiTrade',
  //   },
  //   {
  //     label: 'Settings',
  //     image: require('../../../../assets/images/setting.png'),
  //     screen: 'Settings',
  //   },
  // ];

  const options = [
    {
      label: 'My Orders',
      icon: 'bag-handle-outline',
      screen: 'Myorder',
    },
    {
      label: 'KYC Status',
      icon: 'document-text-outline',
      screen: 'KYCStatus',
      kycStatus: kycData?.status,
    },
    {
      label: 'Wishlist',
      icon: 'heart-outline',
      screen: 'WatchList',
    },
    {
      label: 'My Wallet',
      icon: 'wallet-outline',
      screen: 'Wallet',
    },
    {
      label: 'Saved Addresses',
      icon: 'location-outline',
      screen: 'Addresses',
    },
    {
      label: 'Help Centre',
      icon: 'help-circle-outline',
      subtext: 'FAQs',
      screen: 'HelpSupport',
    },
    {
      label: 'About',
      icon: 'information-circle-outline',
      subtext: `App Version: v${appVersion}`,
      screen: 'AboutMobiTrade',
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      screen: 'Settings',
    },
  ];

  const handleNavigation = screen => {
    if (screen) {
      navigation.navigate(screen, {
        cat: data?.vendor_category || '',
        profileEdit: data,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Profile info" navigation={navigation} showBack={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.name}>{data?.customer_name || ''}</Text>
          <Text style={styles.email}>{data?.email || ''}</Text>
        </View>

        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigation(item.screen)}
            style={styles.optionRow}
          >
            {/* <Image source={item.image} style={styles.optionImage} /> */}
            <View style={styles.iconWrapper}>
              <Icon name={item.icon} size={wp('6%')} color="#333" />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              {item.subtext && (
                <Text style={styles.optionSubtext}>{item.subtext}</Text>
              )}
            </View>
            {/* {item.label === 'KYC Status' && (
              <Text
                style={{
                  color: kycData.color,
                  backgroundColor: kycData.background,
                  fontWeight: 'bold',
                }}
              >
                {item.kycStatus === 'Approved' ? 'Approved' : 'Pending'}
              </Text>
            )} */}
            {item.label === 'KYC Status' && (
              <View
                style={[
                  styles.kycBadge,
                  {
                    backgroundColor:
                      kycData.status === 'Approved' ? '#E8F5E9' : '#FDECEA',
                  },
                ]}
              >
                <Text style={{ color: kycData.color, fontWeight: '700' }}>
                  {kycData.status}
                </Text>
              </View>
            )}

            <Icon name="chevron-forward" size={wp('5%')} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: wp('3%'),
    flexGrow: 1,
    paddingBottom: hp('2%'),
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  name: {
    fontSize: wp('5.5%'),
    fontWeight: '700',
    marginTop: hp('1%'),
    color: '#333',
  },
  email: {
    fontSize: wp('3.8%'),
    color: '#999',
    marginBottom: hp('1%'),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: wp('2%'),
  },
  optionImage: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('3%'),
    resizeMode: 'contain',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: wp('4.2%'),
    fontWeight: '600',
    color: '#222',
  },
  optionSubtext: {
    fontSize: wp('3%'),
    color: '#888',
    marginTop: hp('0.5%'),
  },
  kycStatus: {
    marginRight: wp('2%'),
    color: '#00A9E0',
    fontWeight: 'bold',
    fontSize: wp('3.8%'),
  },

  iconWrapper: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },

  kycBadge: {
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
});
