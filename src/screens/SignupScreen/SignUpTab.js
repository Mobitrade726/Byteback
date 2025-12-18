// import React from 'react';
// import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Signup from './Signup';
// import Signup_Address from './Signup_Address';
// import {useRoute} from '@react-navigation/native';
// import Header from '../../constants/Header';

// const Tab = createMaterialTopTabNavigator();

// const SignUpTab = ({navigation}) => {
//   const route = useRoute();
//   const accountType = route?.params?.accountType;
//   const catEdit = route?.params?.cat;
//   const profileData = route?.params?.profileEdit;

//   const derivedAccountType = accountType
//     ? accountType
//     : catEdit === 'vendor_customer'
//     ? 'individual'
//     : catEdit
//     ? 'business'
//     : '';

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}

//       <Header
//         title={
//           accountType ? (
//             <Text style={styles.title}>Register as {accountType}</Text>
//           ) : catEdit ? (
//             <Text style={styles.title}>
//               Edit Profile
//               {/* {catEdit === 'vendor_customer' ? 'individual' : 'business'} */}
//             </Text>
//           ) : null
//         }
//         navigation={navigation}
//         showBack={true}
//         showSearch={false}
//       />

//       {/* Top Tabs */}
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color}) => {
//             let iconName;
//             if (route.name === 'Signup') {
//               iconName =
//                 accountType === 'individual' || catEdit === 'vendor_customer'
//                   ? focused
//                     ? 'person'
//                     : 'person-outline'
//                   : focused
//                   ? 'cube'
//                   : 'cube-outline';
//             } else if (route.name === 'Signup_Address') {
//               iconName = focused ? 'location' : 'location-outline';
//             }
//             return <Ionicons name={iconName} size={16} color={color} />;
//           },
//           tabBarLabel: ({focused}) => {
//             let label =
//               route.name === 'Signup'
//                 ? accountType === 'individual' || catEdit === 'vendor_customer'
//                   ? 'Basic Details'
//                   : 'Business Details'
//                 : 'Address';
//             return (
//               <Text style={{color: focused ? '#2E8BFF' : '#aaa', fontSize: 12}}>
//                 {label}
//               </Text>
//             );
//           },
//           tabBarIndicatorStyle: {
//             backgroundColor: '#2E8BFF',
//             height: 2,
//           },
//           tabBarActiveTintColor: '#2E8BFF',
//           tabBarInactiveTintColor: '#aaa',
//           tabBarShowIcon: true,
//         })}>
//         <Tab.Screen
//           name="Signup"
//           component={Signup}
//           initialParams={{
//             accountType: derivedAccountType,
//             profileEdit: profileData,
//           }} // ✅ Use computed one
//         />

//         <Tab.Screen
//           name="Signup_Address"
//           component={Signup_Address}
//           listeners={{
//             tabPress: e => {
//               // BLOCK tab switch to Address tab
//               e.preventDefault();
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     justifyContent: 'space-between',
//   },
//   backIcon: {
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     padding: 5,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 17,
//     fontWeight: 'semibold',
//     color: '#111',
//   },
// });

// export default SignUpTab;


import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Signup from './Signup';
import Signup_Address from './Signup_Address';
import {useRoute} from '@react-navigation/native';
import Header from '../../constants/Header';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const Tab = createMaterialTopTabNavigator();

const SignUpTab = ({navigation}) => {
  const route = useRoute();
  const accountType = route?.params?.accountType;
  const catEdit = route?.params?.cat;
  const profileData = route?.params?.profileEdit;

  const derivedAccountType = accountType
    ? accountType
    : catEdit === 'vendor_customer'
    ? 'individual'
    : catEdit
    ? 'business'
    : '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title={
          accountType ? (
            <Text style={styles.title}>Register as {accountType}</Text>
          ) : catEdit ? (
            <Text style={styles.title}>Edit Profile</Text>
          ) : null
        }
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />

      {/* Top Tabs */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Signup') {
              iconName =
                accountType === 'individual' || catEdit === 'vendor_customer'
                  ? focused
                    ? 'person'
                    : 'person-outline'
                  : focused
                  ? 'cube'
                  : 'cube-outline';
            } else if (route.name === 'Signup_Address') {
              iconName = focused ? 'location' : 'location-outline';
            }
            return <Ionicons name={iconName} size={moderateScale(18)} color={color} />;
          },
          tabBarLabel: ({focused}) => {
            let label =
              route.name === 'Signup'
                ? accountType === 'individual' || catEdit === 'vendor_customer'
                  ? 'Basic Details'
                  : 'Business Details'
                : 'Address';
            return (
              <Text
                style={{
                  color: focused ? '#478F4E' : '#aaa',
                  fontSize: responsiveFontSize(1.6), // ~12
                }}>
                {label}
              </Text>
            );
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#478F4E',
            height: verticalScale(2),
          },
          tabBarActiveTintColor: '#478F4E',
          tabBarInactiveTintColor: '#aaa',
          tabBarShowIcon: true,
          tabBarStyle: {
            paddingVertical: verticalScale(5),
          },
        })}>
        <Tab.Screen
          name="Signup"
          component={Signup}
          initialParams={{
            accountType: derivedAccountType,
            profileEdit: profileData,
          }}
        />

        <Tab.Screen
          name="Signup_Address"
          component={Signup_Address}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // Block default tab switch
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(2.1), // ~17
    fontWeight: '600',
    color: '#111',
  },
});

export default SignUpTab;
