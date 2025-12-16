// // // import {useNavigation} from '@react-navigation/native';
// // // import React, {useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   Image,
// // //   SafeAreaView,
// // //   StatusBar,
// // // } from 'react-native';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import styles from './styles';
// // // import Header from '../../constants/Header';

// // // const LandingPage = () => {
// // //   const navigation = useNavigation();
// // //   const [selectedOption, setSelectedOption] = useState('individual');

// // //   const options = [
// // //     {
// // //       id: 'individual',
// // //       label: 'As Individual account',
// // //       icon: require('../../../assets/images/indivisual.png'),
// // //     },
// // //     {
// // //       id: 'business',
// // //       label: 'As a Business account',
// // //       icon: require('../../../assets/images/business.png'),
// // //     },
// // //   ];

// // //   return (
// // //     <>
// // //       <StatusBar
// // //         backgroundColor="transparent"
// // //         translucent={true}
// // //         barStyle="dark-content"
// // //       />
// // //       <SafeAreaView style={styles.container}>
// // //         <View style={{marginHorizontal: 10}}>
// // //           <Header
// // //             title="Login or Sign Up as"
// // //             navigation={navigation}
// // //             showBack={true}
// // //           />

// // //           {/* Options */}
// // //           {options.map(option => (
// // //             <TouchableOpacity
// // //               key={option.id}
// // //               style={styles.optionContainer}
// // //               onPress={() => setSelectedOption(option.id)}>
// // //               <Image source={option.icon} style={styles.icon} />
// // //               <Text style={styles.optionText}>{option.label}</Text>
// // //               <View style={styles.radioCircle}>
// // //                 {selectedOption === option.id && (
// // //                   <View style={styles.selectedDot} />
// // //                 )}
// // //               </View>
// // //             </TouchableOpacity>
// // //           ))}

// // //           {/* Button */}
// // //           <TouchableOpacity
// // //             onPress={() =>
// // //               navigation.navigate('SignUpTab', {accountType: selectedOption})
// // //             }
// // //             style={styles.button}>
// // //             <Text style={styles.buttonText}>Continue</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </SafeAreaView>
// // //     </>
// // //   );
// // // };

// // // export default LandingPage;

// // import {useNavigation} from '@react-navigation/native';
// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   Image,
// //   SafeAreaView,
// //   StatusBar,
// // } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import styles from './styles';
// // import Header from '../../constants/Header';

// // const LandingPage = () => {
// //   const navigation = useNavigation();
// //   const [selectedOption, setSelectedOption] = useState('individual');

// //   const options = [
// //     {
// //       id: 'individual',
// //       label: 'As Individual account',
// //       icon: require('../../../assets/images/indivisual.png'),
// //     },
// //     {
// //       id: 'business',
// //       label: 'As a Business account',
// //       icon: require('../../../assets/images/business.png'),
// //     },
// //   ];

// //   return (
// //     <>
// //       <StatusBar
// //         backgroundColor="transparent"
// //         translucent={true}
// //         barStyle="dark-content"
// //       />
// //       <SafeAreaView style={styles.container}>
// //         <View style={styles.innerWrapper}>

// //           <Header
// //             title="Login or Sign Up as"
// //             navigation={navigation}
// //             showBack={true}
// //           />

// //           {/* Options */}
// //           {options.map(option => (
// //             <TouchableOpacity
// //               key={option.id}
// //               style={styles.optionContainer}
// //               onPress={() => setSelectedOption(option.id)}>

// //               <Image source={option.icon} style={styles.icon} />

// //               <Text style={styles.optionText}>{option.label}</Text>

// //               <View style={styles.radioCircle}>
// //                 {selectedOption === option.id && (
// //                   <View style={styles.selectedDot} />
// //                 )}
// //               </View>
// //             </TouchableOpacity>
// //           ))}

// //           {/* Continue Button */}
// //           <TouchableOpacity
// //             onPress={() =>
// //               navigation.navigate('SignUpTab', {accountType: selectedOption})
// //             }
// //             style={styles.button}>
// //             <Text style={styles.buttonText}>Continue</Text>
// //           </TouchableOpacity>

// //         </View>
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // export default LandingPage;

// import {useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
// import Header from '../../constants/Header';

// const LandingPage = () => {
//   const navigation = useNavigation();
//   const [selectedOption, setSelectedOption] = useState('individual');

//   const options = [
//     {
//       id: 'individual',
//       label: 'As Individual account',
//       icon: require('../../../assets/images/indivisual.png'),
//     },
//     {
//       id: 'business',
//       label: 'As a Business account',
//       icon: require('../../../assets/images/business.png'),
//     },
//   ];

//   return (
//     <>
//       <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle="dark-content"
//       />
//       <SafeAreaView style={styles.container}>
//         <Header
//           title="Login or Sign Up as"
//           navigation={navigation}
//           showBack={true}
//           showSearch={false}
//         />
//         <ScrollView style={styles.innerWrapper}>
//           {/* Options */}
//           {options.map(option => (
//             <TouchableOpacity
//               key={option.id}
//               style={styles.optionContainer}
//               onPress={() => setSelectedOption(option.id)}>
//               <Image source={option.icon} style={styles.icon} />

//               <Text style={styles.optionText}>{option.label}</Text>

//               <View style={styles.radioCircle}>
//                 {selectedOption === option.id && (
//                   <View style={styles.selectedDot} />
//                 )}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//         {/* Continue Button */}
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate('SignUpTab', {accountType: selectedOption})
//           }
//           style={styles.button}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </>
//   );
// };

// export default LandingPage;

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Header from '../../constants/Header';

const LandingPage = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('individual');

  const options = [
    {
      id: 'individual',
      label: 'As Individual account',
      icon: require('../../../assets/images/indivisual.png'),
    },
    {
      id: 'business',
      label: 'As a Business account',
      icon: require('../../../assets/images/business.png'),
    },
  ];

  return (
    <>
      <Header
        title="Login or Sign Up as"
        navigation={navigation}
        showBack={true}
        showSearch={false}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionContainer}
              onPress={() => setSelectedOption(option.id)}>
              <Image source={option.icon} style={styles.icon} />
              <Text style={styles.optionText}>{option.label}</Text>

              <View style={styles.radioCircle}>
                {selectedOption === option.id && (
                  <View style={styles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignUpTab', {accountType: selectedOption})
          }
          style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default LandingPage;
