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
// import Recentlyadd from './Recentlyadd';
// import Header from '../../../constants/Header';
// // import CatPage from './CatPage';

// const Tab = createMaterialTopTabNavigator();

// const RecentlyAddedTab = ({navigation, route}) => {
//   const {initialTab} = route.params || {};
//   const {osList} = useSelector(state => state.home);

//   // Component for each tab
//   const DynamicTabComponent = ({route}) => {
//     const {tabId, os_name} = route.params;

//     return (
//       <View style={styles.tabContent}>
//         <Recentlyadd tabId={tabId} osName={os_name} />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Recently added" navigation={navigation} showBack={true} />
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

// export default RecentlyAddedTab;

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Recentlyadd from './Recentlyadd';
import Header from '../../../constants/Header';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  responsiveFontSize as RF,
  responsiveHeight as RH,
  responsiveWidth as RW,
} from 'react-native-responsive-dimensions';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Tab = createMaterialTopTabNavigator();

const RecentlyAddedTab = ({ navigation, route }) => {
  const { initialTab } = route.params || {};
  const { osList, catList } = useSelector(state => state.home);

  const DynamicTabComponent = ({ route }) => {
    const { tabId, catName, catId } = route.params; // <-- match initialParams

    return (
      <View style={styles.tabContent}>
        <Recentlyadd tabId={tabId} catName={catName} catId={catId} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Recently added"
        navigation={navigation}
        showBack={true}
        showSearch
      />

      <Tab.Navigator
        // initialRouteName={initialTab || osList[0]?.os_name || 'Default'}
        initialRouteName={initialTab || catList[0]?.category_name || 'Default'}
        screenOptions={{
          tabBarScrollEnabled: true,

          tabBarItemStyle: {
            width: responsiveWidth(25),
            paddingHorizontal: responsiveWidth(2), // 👈 width control
          },

          tabBarLabelStyle: {
            fontSize: responsiveFontSize(1.5),
            paddingHorizontal: 0, // 👈 extra padding remove
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#478F4E',
            height: responsiveHeight(0.3),
          },

          tabBarStyle: {
            height: responsiveHeight(4.8),
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
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: verticalScale(6),
    justifyContent: 'space-between',
    // marginHorizontal: RW(3),
  },

  backButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    padding: scale(6),
  },

  headerTitle: {
    fontSize: RF(2.2), // 16 responsive
    fontWeight: '500',
    color: '#000',
  },

  tabContent: {
    flex: 1,
    paddingHorizontal: RW(2),
  },

  tabText: {
    fontSize: RF(2),
    color: '#333',
  },
});

export default RecentlyAddedTab;
