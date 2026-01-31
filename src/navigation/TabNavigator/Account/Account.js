// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView, View
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
//     <View style={{flex: 1, backgroundColor: '#fff'}}>
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
//     </View>
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
import responsive from '../../../constants/responsive';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.profile);
  const [appVersion, setAppVersion] = useState('');

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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Profile info" navigation={navigation} showBack={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {data?.profile_image ? (
              <Image
                source={{ uri: data.profile_image }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.initialAvatar}>
                <Text style={styles.initialText}>
                  {data?.customer_name
                    ? data.customer_name.charAt(0).toUpperCase()
                    : 'U'}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.profileName}>
            {data?.customer_name || 'User Name'}
          </Text>

          <Text style={styles.profileEmail}>
            {data?.email || 'example@email.com'}
          </Text>
        </View>

        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigation(item.screen)}
            style={styles.optionRow}
          >
            {/* <Image source={item.image} style={styles.optionImage} /> */}
            <View style={styles.iconWrapper}>
              <Icon
                name={item.icon}
                size={responsive.fontSize(24)}
                color="#11A5D7"
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              {item.subtext && (
                <Text style={styles.optionSubtext}>{item.subtext}</Text>
              )}
            </View>
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
                <Text
                  style={{
                    color: kycData.color,
                    fontWeight: '700',
                    fontSize: responsive.fontSize(10),
                  }}
                >
                  {kycData.status}
                </Text>
              </View>
            )}

            <Icon name="chevron-forward" size={wp('4%')} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  profileCard: {
    alignItems: 'center',
    // marginBottom: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
  },

  avatarWrapper: {
    marginBottom: hp('0.1%'),
  },

  avatar: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('12%'),
    resizeMode: 'cover',
  },

  initialAvatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('20%'),
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialText: {
    fontSize: responsive.fontSize(20),
    fontWeight: '700',
    color: '#1976D2',
  },

  profileName: {
    fontSize: responsive.fontSize(25),
    fontWeight: '700',
    color: '#222',
  },

  profileEmail: {
    fontSize: responsive.fontSize(15),
    color: '#777',
    marginTop: hp('0.4%'),
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
    fontSize: responsive.fontSize(17),
    fontWeight: '600',
    color: '#171D1C',
  },
  optionSubtext: {
    fontSize: wp('3%'),
    color: '#888',
    marginTop: hp('0.5%'),
  },
  kycStatus: {
    marginRight: wp('2%'),
    color: '#00A9E0',
    fontWeight: '500',
    fontSize: wp('3.8%'),
  },

  iconWrapper: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('0%'),
  },

  kycBadge: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
});
