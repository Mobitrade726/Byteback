// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Home from '../../screens/Home/Home';
// import Account from './Account/Account';
// import Discover from './Discover/Discover';
// import {Image} from 'react-native';
// import WatchList from '../TabNavigator/Account/Watchlist/WatchList';
// import Cart from './Cart/Cart';
// import Categories from '../../screens/Home/Categories/Categories';

// const Tab = createBottomTabNavigator();

// const BottomNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           if (route.name === 'Category') {
//             return (
//               <Image
//                 source={require('../../../assets/images/cat.png')} // Update path to your image
//                 style={{width: size, height: size, tintColor: color}}
//               />
//             );
//           } else if (route.name === 'Home') {
//             return <Ionicons name="home-outline" size={size} color={color} />;
//           } else if (route.name === 'Account') {
//             return <AntDesign name="user" size={size} color={color} />;
//           } else if (route.name === 'Wishlist') {
//             return <AntDesign name="hearto" size={size} color={color} />;
//           } else if (route.name === 'Cart') {
//             return <AntDesign name="shoppingcart" size={size} color={color} />;
//           }
//         },
//         tabBarActiveTintColor: '#00b894',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Category" component={Categories} />
//       <Tab.Screen name="Wishlist" component={WatchList} />
//       <Tab.Screen name="Cart" component={Cart} />
//       <Tab.Screen name="Account" component={Account} />
//     </Tab.Navigator>
//   );
// };

// export default BottomNavigator;



// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Home from '../../screens/Home/Home';
// import Account from './Account/Account';
// import {Image} from 'react-native';
// import WatchList from '../TabNavigator/Account/Watchlist/WatchList';
// import Cart from './Cart/Cart';
// import Categories from '../../screens/Home/Categories/Categories';

// import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// const Tab = createBottomTabNavigator();

// const BottomNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color}) => {
//           const iconSize = moderateScale(20);  // RESPONSIVE ICON SIZE

//           if (route.name === 'Category') {
//             return (
//               <Image
//                 source={require('../../../assets/images/cat.png')}
//                 style={{
//                   width: moderateScale(20),
//                   height: moderateScale(20),
//                   tintColor: color,
//                 }}
//               />
//             );
//           } else if (route.name === 'Home') {
//             return <Ionicons name="home-outline" size={iconSize} color={color} />;
//           } else if (route.name === 'Account') {
//             return <AntDesign name="user" size={iconSize} color={color} />;
//           } else if (route.name === 'Wishlist') {
//             return <AntDesign name="hearto" size={iconSize} color={color} />;
//           } else if (route.name === 'Cart') {
//             return (
//               <AntDesign name="shoppingcart" size={iconSize} color={color} />
//             );
//           }
//         },

//         tabBarLabelStyle: {
//           fontSize: moderateScale(12),
//         },

//         tabBarStyle: {
//           height: verticalScale(50), // responsive tab height
//           paddingBottom: verticalScale(6),
//           paddingTop: verticalScale(2),
//         },

//         tabBarActiveTintColor: '#00b894',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Category" component={Categories} />
//       <Tab.Screen name="Wishlist" component={WatchList} />
//       <Tab.Screen name="Cart" component={Cart} />
//       <Tab.Screen name="Account" component={Account} />
//     </Tab.Navigator>
//   );
// };

// export default BottomNavigator;


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../../screens/Home/Home';
import Account from './Account/Account';
import WatchList from '../TabNavigator/Account/Watchlist/WatchList';
import Cart from './Cart/Cart';
import Categories from '../../screens/Home/Categories/Categories';
import { Image, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const insets = useSafeAreaInsets(); // ✅ Safe area support

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconSize = moderateScale(22);

          switch (route.name) {
            case 'Home':
              return <Ionicons name="home-outline" size={iconSize} color={color} />;
            case 'Category':
              return (
                <Image
                  source={require('../../../assets/images/cat.png')}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: color,
                    resizeMode: 'contain',
                  }}
                />
              );
            case 'Wishlist':
              return <AntDesign name="hearto" size={iconSize} color={color} />;
            case 'Cart':
              return <AntDesign name="shoppingcart" size={iconSize} color={color} />;
            case 'Account':
              return <AntDesign name="user" size={iconSize} color={color} />;
            default:
              return null;
          }
        },

        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          marginBottom: verticalScale(2),
        },

        tabBarStyle: {
          height: verticalScale(55) + insets.bottom, // ✅ Add safe area padding
          paddingBottom: insets.bottom > 0 ? insets.bottom : verticalScale(5),
          paddingTop: verticalScale(5),
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },

        tabBarActiveTintColor: '#478F4E',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Categories} />
      <Tab.Screen name="Wishlist" component={WatchList} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
