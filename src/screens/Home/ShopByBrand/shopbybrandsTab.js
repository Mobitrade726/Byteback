// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useSelector} from 'react-redux';
// import ShopByBrand from './shopbybrand';
// import Header from '../../../constants/Header';
// // import CatPage from './CatPage';

// const Tab = createMaterialTopTabNavigator();

// const shopbybrandsTab = ({navigation, route}) => {
//   const {initialTab} = route.params || {};
//   const {osList} = useSelector(state => state.home);

//   // Component for each tab
//   const DynamicTabComponent = ({route}) => {
//     const {tabId, os_name} = route.params;

//     return (
//       <View style={styles.tabContent}>
//         <ShopByBrand tabId={tabId} osName={os_name} />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}

//       <Header title="Shop by brands" navigation={navigation} showBack={true} />

//       <Tab.Navigator
//         initialRouteName={initialTab || osList[0]?.os_name || 'Default'}
//         screenOptions={{
//           tabBarLabelStyle: {fontSize: 12, fontWeight: '500'},
//           tabBarActiveTintColor: '#2E8BFF',
//           tabBarInactiveTintColor: '#aaa',
//           tabBarIndicatorStyle: {
//             backgroundColor: '#2E8BFF',
//             height: 2,
//           },
//           lazy: true,
//         }}>
//         {osList.map(tab => (
//           <Tab.Screen
//             key={tab.id}
//             name={tab.os_name}
//             component={DynamicTabComponent}
//             initialParams={{tabId: tab.id, os_name: tab.os_name}}
//           />
//         ))}
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   backButton: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     padding: 6,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
//   tabContent: {flex: 1},
//   tabText: {fontSize: 16, color: '#333'},
// });

// export default shopbybrandsTab;

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import ShopByBrand from './Shopbybrand';
import Header from '../../../constants/Header';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import responsive from '../../../constants/responsive';

const Tab = createMaterialTopTabNavigator();

const ShopbybrandsTab = ({ navigation, route }) => {
  const { initialTab } = route.params || {};
  const { catList } = useSelector(state => state.home);

  const DynamicTabComponent = ({ route }) => {
    const { tabId, catName, catId } = route.params; // <-- match initialParams

    return (
      <View style={styles.tabContent}>
        <ShopByBrand tabId={tabId} catName={catName} catId={catId} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Shop by brands"
        navigation={navigation}
        showSearch
        showBack={true}
      />

      <Tab.Navigator
        initialRouteName={initialTab || catList[0]?.category_name || 'Default'}
        screenOptions={{
          tabBarScrollEnabled: true,

          tabBarItemStyle: {
            width: responsiveWidth(25),
            paddingHorizontal: responsiveWidth(2), // 👈 width control
          },

          tabBarLabelStyle: {
            fontSize: responsive.fontSize(14),
            fontWeight: 'bold',
            paddingHorizontal: 0, // 👈 extra padding remove
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#478F4E',
            height: responsiveHeight(0.3),
          },

          tabBarStyle: {
            height: responsiveHeight(6.5),
          },
        }}
      >
        {catList.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.category_name}
            component={DynamicTabComponent}
            initialParams={{
              tabId: tab.id,
              catName: tab.category_name, // camelCase
              catId: tab.id,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingBottom: verticalScale(5),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },

  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(20),
    padding: scale(6),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#000',
  },

  tabContent: {
    flex: 1,
    // paddingHorizontal: scale(10),
    // paddingTop: verticalScale(5),
  },

  tabText: {
    fontSize: responsiveFontSize(1.8),
    color: '#333',
  },
});

export default ShopbybrandsTab;
