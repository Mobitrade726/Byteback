// // import React from 'react';
// // import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// // import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import {SafeAreaView} from 'react-native-safe-area-context';
// // import {useRoute} from '@react-navigation/native';
// // import Android from './Android/Android';
// // import iOS from './iOS/iOS';
// // import WindowsOS from './WindowsOS/WindowsOS';
// // import MacOS from './MacOS/MacOS';

// // const Tab = createMaterialTopTabNavigator();

// // const CategoriesSmartphones = ({navigation, route}) => {
// //     const { initialTab } = route.params || {}; // Get passed param

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           onPress={() => navigation.goBack()}
// //           style={styles.backButton}>
// //           <Ionicons name="chevron-back" size={22} color="#000" />
// //         </TouchableOpacity>
// //         <View>
// //           <Text style={styles.headerTitle}></Text>
// //         </View>
// //         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
// //           <Ionicons name="search" size={24} color="#333" />
// //         </TouchableOpacity>
// //       </View>

// //       {/* Top Tabs */}
// //       <Tab.Navigator
// //         initialRouteName={initialTab} // 👈 this activates correct tab
// //         screenOptions={{
// //           tabBarLabelStyle: {fontSize: 12},
// //           tabBarActiveTintColor: '#2E8BFF',
// //           tabBarInactiveTintColor: '#aaa',
// //           tabBarIndicatorStyle: {
// //             backgroundColor: '#2E8BFF',
// //             height: 2,
// //           },
// //         }}>
// //         <Tab.Screen name="Android" component={Android} />
// //         <Tab.Screen name="iOS" component={iOS} />
// //         <Tab.Screen name="WindowsOS" component={WindowsOS} />
// //         <Tab.Screen name="MacOS" component={MacOS} />
// //       </Tab.Navigator>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 5,
// //     justifyContent: 'space-between',
// //     marginHorizontal: 10,
// //   },
// //   backButton: {
// //     backgroundColor: '#f5f5f5',
// //     borderRadius: 20,
// //     padding: 6,
// //     left: 0,
// //   },
// //   headerTitle: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#000',
// //     textAlign: 'center',
// //   },
// // });

// // export default CategoriesSmartphones;

// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useSelector} from 'react-redux';
// import CatPage from './CatPage';
// import Header from '../../../constants/Header';

// const Tab = createMaterialTopTabNavigator();

// const CategoriesTab = ({navigation, route}) => {
//   const {initialTab} = route.params || {};
//   const {osList} = useSelector(state => state.home);
//   // Component for each tab
//   const DynamicTabComponent = ({route}) => {
//     const {tabId, os_name} = route.params;

//     return (
//       <View style={styles.tabContent}>
//         <CatPage tabId={tabId} osName={os_name} />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <Header title="Categories" navigation={navigation} showBack={true} />

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
//     </SafeAreaView>
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

// export default CategoriesTab;




import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import CatPage from './CatPage';
import Header from '../../../constants/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale} from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const CategoriesTab = ({navigation, route}) => {
  const {initialTab} = route.params || {};
  const {catList} = useSelector(state => state.home);

  // Component for each tab
  const DynamicTabComponent = ({route}) => {
    const {tabId, cat_name,catId} = route.params;
    return (
      <View style={styles.tabContent}>
        <CatPage tabId={tabId} catName={cat_name} catId={catId} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Categories" navigation={navigation} showBack={true} showSearch={true} />

      <Tab.Navigator
        initialRouteName={initialTab || catList[0]?.category_name || 'Default'}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: responsiveFontSize(1.8),
            fontWeight: '500',
          },
          tabBarActiveTintColor: '#478F4E',
          tabBarInactiveTintColor: '#aaa',
          tabBarIndicatorStyle: {
            backgroundColor: '#478F4E',
            height: responsiveHeight(0.5),
          },
          tabBarStyle: {
            height: responsiveHeight(6),
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarScrollEnabled: true, // For many tabs
          lazy: true,
        }}>
        {catList.map(tab => (
          <Tab.Screen
            key={tab.id}
            name={tab.category_name}
            component={DynamicTabComponent}
            initialParams={{tabId: tab.id, cat_name: tab.category_name, catId: tab.id}}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  tabContent: {flex: 1},
  headerTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: '#000',
  },
});

export default CategoriesTab;
