// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomeStack from './HomeStack'
// import CartStack from './CartStack';
// import AccountStack from './AccountStack';

// const Tab = createBottomTabNavigator();

// export default function BottomNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => {
//           let icon;

//           if (route.name === 'Home') icon = 'home';
//           if (route.name === 'Cart') icon = 'cart';
//           if (route.name === 'Account') icon = 'person';

//           return <Ionicons name={icon} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Cart" component={CartStack} />
//       <Tab.Screen name="Account" component={AccountStack} />
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import AccountStack from './AccountStack';
import CategoriesStack from './CategoriesStack';
import WishlistStack from './WishlistStack';
import responsive from '../constants/responsive';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconSize = moderateScale(18);

          switch (route.name) {
            case 'Home':
              return (
                <Ionicons name="home-outline" size={iconSize} color={color} />
              );
            case 'Category':
              return (
                <Image
                  source={require('../../assets/images/cat.png')}
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
              return (
                <AntDesign name="shoppingcart" size={iconSize} color={color} />
              );
            case 'Account':
              return <AntDesign name="user" size={iconSize} color={color} />;
            default:
              return null;
          }
        },

        tabBarLabelStyle: {
          fontSize: responsive.fontSize(10),
        },

        tabBarStyle: {
          height: responsive.height(60),
          backgroundColor: '#FFFBFA',
        },

        tabBarActiveTintColor: '#478F4E',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Category" component={CategoriesStack} />
      <Tab.Screen name="Wishlist" component={WishlistStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
