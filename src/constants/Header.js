// // // // // src/components/Header.js
// // // // import React from 'react';
// // // // import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // // const Header = ({
// // // //   title,
// // // //   navigation,
// // // //   showSearch = false,
// // // //   onSearchPress,
// // // //   showBack = true,
// // // // }) => {
// // // //   return (
// // // //     <View style={[styles.header]}>
// // // //       {showBack ? (
// // // //         <TouchableOpacity
// // // //           onPress={() => navigation.goBack()}
// // // //           style={styles.backButton}>
// // // //           <Ionicons name="chevron-back" size={22} color="#000" />
// // // //         </TouchableOpacity>
// // // //       ) : (
// // // //         <View style={{width: 40}} />
// // // //       )}

// // // //       <Text style={styles.headerTitle}>{title}</Text>

// // // //       {showSearch ? (
// // // //         <TouchableOpacity onPress={onSearchPress}>
// // // //           <Ionicons name="search" size={24} color="#000" />
// // // //         </TouchableOpacity>
// // // //       ) : (
// // // //         <View style={{width: 40}} />
// // // //       )}
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// header: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   paddingVertical: 10,
//   marginTop:12,
//   paddingHorizontal: 10,
//   backgroundColor: '#fff',
// },
// headerTitle: {
//   fontSize: 18,
//   fontWeight: '600',
//   color: '#000',
// },
// backButton: {
//   padding: 5,
//   backgroundColor: '#f5f5f5',
//   borderRadius: 20,
// },
// // // // });

// // // // export default Header;

// // // // import React from 'react';
// // // // import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// // // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // // const Header = ({title, navigation, showSearch = true}) => {
// // // //   return (
// // // //     <View style={styles.header}>
// // // //       {/* Back Button */}
// // // //       <TouchableOpacity
// // // //         onPress={() => navigation.goBack()}
// // // //         style={styles.backButton}>
// // // //         <Ionicons name="chevron-back" size={22} color="#000" />
// // // //       </TouchableOpacity>

// // // //       {/* Title */}
// // // //       <Text style={styles.headerTitle}>{title}</Text>

// // // //       {/* Search Button (only if showSearch = true) */}
// // // //       {showSearch ? (
// // // //         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// // // //           <Ionicons name="search" size={24} color="#333" />
// // // //         </TouchableOpacity>
// // // //       ) : (
// // // //         <View style={{width: 24}} /> // Placeholder to keep layout balanced
// // // //       )}
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   header: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'space-between',
// // // //     paddingVertical: 10,
// // // //     marginTop: 12,
// // // //     paddingHorizontal: 10,
// // // //     backgroundColor: '#fff',
// // // //   },
// // // //   backButton: {
// // // //     padding: 5,
// // // //     backgroundColor: '#f5f5f5',
// // // //     borderRadius: 20,
// // // //   },
// // // //   headerTitle: {
// // // //     fontSize: 18,
// // // //     fontWeight: '600',
// // // //     color: '#000',
// // // //   },
// // // // });

// // // // export default Header;

// // // import React from 'react';
// // // import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // const Header = ({title, navigation, showSearch = true}) => {
// // //   return (
// // //     <View style={styles.container}>
// // //       {/* LEFT ICON (Back button) */}
// // //       <TouchableOpacity
// // //         onPress={() => navigation.goBack()}
// // //         style={styles.leftIconBox}>
// // //         <Ionicons name="chevron-back" size={22} color="#000" />
// // //       </TouchableOpacity>

// // //       {/* CENTER TITLE */}
// // //       <View style={styles.centerBox}>
// // //         <Text style={styles.title}>{title}</Text>
// // //       </View>

// // //       {/* RIGHT ICON (Search or empty placeholder) */}
// // //       {showSearch ? (
// // //         <TouchableOpacity
// // //           onPress={() => navigation.navigate('Search')}
// // //           style={styles.rightIconBox}>
// // //           <Ionicons name="search" size={22} color="#000" />
// // //         </TouchableOpacity>
// // //       ) : (
// // //         <View style={styles.rightIconBox} />
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     height: 60,
// // //     backgroundColor: '#fff',
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 10,
// // //     elevation: 3,
// // //   },

// // //   leftIconBox: {
// // //     width: 40,          // fixed width to keep balance
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: '#f5f5f5',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   centerBox: {
// // //     flex: 1,
// // //     alignItems: 'center',
// // //   },

// // //   rightIconBox: {
// // //     width: 40,          // same width as left → title always centered
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: '#f5f5f5',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   title: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     color: '#000',
// // //   },
// // // });

// // // export default Header;

// // // import React from 'react';
// // // import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';

// // // const { width, height } = Dimensions.get('window');

// // // // Function to scale font size based on screen width
// // // const scaleFont = (size) => (size * width) / 375;

// // // const Header = ({ title, navigation, showSearch = true }) => {
// // //   return (
// // //     <View style={[styles.container, { height: height * 0.08, paddingHorizontal: width * 0.03 }]}>

// // //       {/* LEFT ICON (Back button) */}
// // //       <TouchableOpacity
// // //         onPress={() => navigation.goBack()}
// // //         style={[styles.leftIconBox, { width: width * 0.1, height: width * 0.1, borderRadius: (width * 0.1) / 2 }]}
// // //       >
// // //         <Ionicons name="chevron-back" size={scaleFont(22)} color="#000" />
// // //       </TouchableOpacity>

// // //       {/* CENTER TITLE */}
// // //       <View style={styles.centerBox}>
// // //         <Text style={[styles.title, { fontSize: scaleFont(18) }]}>{title}</Text>
// // //       </View>

// // //       {/* RIGHT ICON (Search or empty placeholder) */}
// // //       {showSearch ? (
// // //         <TouchableOpacity
// // //           onPress={() => navigation.navigate('Search')}
// // //           style={[styles.rightIconBox, { width: width * 0.1, height: width * 0.1, borderRadius: (width * 0.1) / 2 }]}
// // //         >
// // //           <Ionicons name="search" size={scaleFont(22)} color="#000" />
// // //         </TouchableOpacity>
// // //       ) : (
// // //         <View style={[styles.rightIconBox, { width: width * 0.1, height: width * 0.1, borderRadius: (width * 0.1) / 2 }]} />
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     backgroundColor: '#fff',
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     elevation: 3,
// // //   },

// // //   leftIconBox: {
// // //     backgroundColor: '#f5f5f5',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   centerBox: {
// // //     flex: 1,
// // //     alignItems: 'center',
// // //   },

// // //   rightIconBox: {
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   title: {
// // //     fontWeight: '600',
// // //     color: '#000',
// // //   },
// // // });

// // // export default Header;

// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// // const { width, height } = Dimensions.get('window');

// // // Scale font size based on screen width
// // const scaleFont = (size) => (size * width) / 375;

// // const Header = ({ title, navigation, showSearch = true }) => {
// //   const iconSize = width * 0.06; // responsive icon size
// //   const iconBoxSize = width * 0.10; // responsive icon container

// //   return (
// //     <View style={[styles.container, { height: height * 0.08, paddingHorizontal: width * 0.03 }]}>

// //       {/* LEFT ICON (Back button) */}
// //       <TouchableOpacity
// //         onPress={() => navigation.goBack()}
// //         style={[styles.iconBox, { width: iconBoxSize, height: iconBoxSize, borderRadius: iconBoxSize / 2 }]}
// //       >
// //         <Ionicons name="chevron-back" size={iconSize} color="#000" />
// //       </TouchableOpacity>

// //       {/* CENTER TITLE */}
// //       <View style={styles.centerBox}>
// //         <Text style={[styles.title, { fontSize: scaleFont(18) }]}>{title}</Text>
// //       </View>

// //       {/* RIGHT ICON (Search or placeholder) */}
// //       {showSearch ? (
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('Search')}
// //           style={[styles.iconBox, { width: iconBoxSize, height: iconBoxSize, borderRadius: iconBoxSize / 2 }]}
// //         >
// //           <Ionicons name="search" size={iconSize} color="#000" />
// //         </TouchableOpacity>
// //       ) : (
// //         <View style={[styles.iconBox, { width: iconBoxSize, height: iconBoxSize, borderRadius: iconBoxSize / 2 }]} />
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: moderateScale(0),
// //     backgroundColor:"#fff"
// //   },

// //   iconBox: {
// //     // backgroundColor: '#f5f5f5',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   centerBox: {
// //     flex: 1,
// //     alignItems: 'center',
// //   },

// //   title: {
// //     fontWeight: '600',
// //     color: '#000',
// //   },
// // });

// // export default Header;

// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Dimensions,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // const { width, height } = Dimensions.get('window');

// // // Scale font size based on screen width
// // const scaleFont = size => (size * width) / 375;

// // const Header = ({
// //   title,
// //   navigation,
// //   showSearch = true,
// //   onBackPress,
// //   showBack,
// // }) => {
// //   const insets = useSafeAreaInsets(); // ✅ Safe area top padding
// //   const iconSize = width * 0.06;
// //   const iconBoxSize = width * 0.1;

// //   return (
// //     <View
// //       style={[
// //         styles.container,
// //         {
// //           paddingTop: insets.top + verticalScale(5), // 🔹 safe top padding
// //           height: height * 0.05 + insets.top, // include safe area in height
// //           paddingHorizontal: width * 0.03,
// //         },
// //       ]}
// //     >
// //       {/* LEFT ICON */}
// //       {/* <TouchableOpacity
// //         onPress={() => navigation.goBack()}
// //         style={[
// //           styles.iconBox,
// //           { width: iconBoxSize, height: iconBoxSize, borderRadius: iconBoxSize / 2 },
// //         ]}
// //       >
// //         <Ionicons name="chevron-back" size={iconSize} color="#000" />
// //       </TouchableOpacity> */}
// //       {showBack && (
// //         <TouchableOpacity
// //           onPress={onBackPress ? onBackPress : () => navigation.goBack()}
// //           style={styles.backBtn}
// //         >
// //           <Ionicons name="arrow-back" size={24} color="#000" />
// //         </TouchableOpacity>
// //       )}

// //       {/* CENTER TITLE */}
// //       <View style={styles.centerBox}>
// //         <Text style={[styles.title, { fontSize: scaleFont(18) }]}>{title}</Text>
// //       </View>

// //       {/* RIGHT ICON */}
// //       {showSearch ? (
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('Search')}
// //           style={[
// //             styles.iconBox,
// //             {
// //               width: iconBoxSize,
// //               height: iconBoxSize,
// //               borderRadius: iconBoxSize / 2,
// //             },
// //           ]}
// //         >
// //           <Ionicons name="search" size={iconSize} color="#000" />
// //         </TouchableOpacity>
// //       ) : (
// //         <View
// //           style={[
// //             styles.iconBox,
// //             {
// //               width: iconBoxSize,
// //               height: iconBoxSize,
// //               borderRadius: iconBoxSize / 2,
// //             },
// //           ]}
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },

// //   iconBox: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   centerBox: {
// //     flex: 1,
// //     alignItems: 'center',
// //   },

// //   title: {
// //     fontWeight: '600',
// //     color: '#000',
// //   },
// // });

// // export default Header;

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   useWindowDimensions,
//   SafeAreaViewBase,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { moderateScale } from 'react-native-size-matters';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Header = ({
//   title,
//   navigation,
//   showSearch = true,
//   onBackPress,
//   showBack = true,
// }) => {
//   const { width } = useWindowDimensions(); // ✅ dynamic width

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
//       <View style={[styles.container, {}]}>
//         {/* LEFT */}
//         <View style={{ alignItems: 'flex-start' }}>
//           {showBack && (
//             <TouchableOpacity
//               onPress={onBackPress || navigation.goBack}
//               style={styles.iconTouch}
//             >
//               <Ionicons name="arrow-back" size={18} color="#000" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* CENTER */}
//         <View style={styles.centerBox}>
//           <Text numberOfLines={1} style={[styles.title, { fontSize: 18 }]}>
//             {title}
//           </Text>
//         </View>

//         {/* RIGHT */}
//         <View style={{ alignItems: 'flex-end' }}>
//           {showSearch ? (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Search')}
//               style={styles.iconTouch}
//             >
//               <Ionicons name="search" size={18} color="#000" />
//             </TouchableOpacity>
//           ) : (
//             <View style={{}} />
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFBFA',
//   },

//   iconBox: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   centerBox: {
//     flex: 1,
//     alignItems: 'center',
//   },

//   title: {
//     fontWeight: '600',
//     color: '#000',
//   },
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import responsive from './responsive';
import { moderateScale } from 'react-native-size-matters';

const Header = ({
  title,
  navigation,
  showSearch = true,
  onBackPress,
  showBack = true,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        {/* LEFT */}
        <View style={styles.header}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress || navigation.goBack}>
              <Ionicons
                name="chevron-back"
                size={moderateScale(16)}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* CENTER */}
        <View style={styles.center}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {title}
          </Text>
        </View>

        {/* RIGHT */}
        <View style={styles.side}>
          {showSearch && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={styles.iconTouch}
            >
              <Ionicons name="search" size={moderateScale(24)} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#FFFFFF',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.paddingHorizontal(12),
    paddingBottom: responsive.paddingBottom(5),
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    // elevation: 2,
    padding: responsive.padding(8),
    borderRadius: responsive.borderRadius(100),

    // ✅ Android shadow
    elevation: Platform.OS === 'android' ? 5 : 0,

    // ✅ iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  // backButton: {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: responsive.borderRadius(200),
  //   height: responsive.height(35),
  //   width: responsive.width(35),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 2,
  // },
  headerTitle: {
    fontSize: responsive.fontSize(16),
    fontWeight: '600',
    color: '#171D1C',
  },

  center: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: responsive.fontSize(16),
    fontWeight: '600',
    color: '#171D1C',
  },

  iconTouch: {
    padding: 6,
  },
});
